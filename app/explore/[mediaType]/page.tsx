//@ts-nocheck
"use client";
import { searchDataFromApi } from "@/src/utils/searchApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "@/src/components/MovieCard";
import useFetch from "@/hooks/useFetch";
import { getApiConfiguration, getGenres } from "@/src/redux/features/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { fetchGenres, fetchImageUrl } from "@/src/utils/urlFetch";
import {motion} from 'framer-motion'

type Props = {};

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = (props: Props) => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const url: any = useSelector((state: RootState) => state.home.url)

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchImageData = async () => {
      const url = await fetchImageUrl();
      dispatch(getApiConfiguration(url));
    };
    const genresCall = async() => {
      const data = await fetchGenres();
      dispatch(getGenres(data))
    }
    fetchImageData();
    genresCall();
  }, [])
  const fetchInitialData = () => {
    setLoading(false);
    searchDataFromApi(`/discover/${mediaType}?api_key=${apiKey}`, filters).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    searchDataFromApi(
      `/discover/${mediaType}?api_key=${apiKey}&page=${pageNum}`,
      filters
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };
  const Loader = () => {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <Triangle
          height="100"
          width="100"
          color="#3A6130"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems: any, action: any) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };


  return (
    <motion.div 
    initial={{opacity:0 , y:20}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0 , y:20}}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 15,
      duration: 1,
      delay: 1
    }}
    className="min-[700px] py-[100px]">
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex w-full justify-between mb-10 px-10 flex-col md:flex-row">
          <div className="text-2xl md:text-3xl text-white">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="flex gap-3 flex-col md:flex-row">
            <Select
               isMulti
               name="genres"
               value={genre}
               closeMenuOnSelect={false}
               options={genresData?.genres}
               getOptionLabel={(option) => option.name}
               getOptionValue={(option) => option.id}
               onChange={onChange}
               placeholder="Select genres"
               className="w-full max-w-[500px] min-w-[250px]"
               classNames={{
                control:(state) => "bg-[#173D77] rounded-full border-[#173D77]"
            }} 
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="w-full max-w-[500px] min-w-[250px]"
              classNames={{
                control:(state) => "bg-[#173D77] rounded-full border-[#173D77]"
            }} 
            />
          </div>
        </div>
        {/* {loading && <Loader/>} */}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="grid grid-cols-2 md:grid-cols-3 lg:flex p-10 overflow-hidden w-full row-auto flex-wrap gap-10 lg:gap-32 md:gap-10 mb-[50px]"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Loader />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    
                    <MovieCard key={index} item={item} mediaType={mediaType} fromSearch={false} />

                  );
                })}
              </InfiniteScroll>
            ) : (
             <div className="w-full h-full"><Loader/></div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Explore;
