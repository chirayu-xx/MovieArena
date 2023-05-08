//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchDataFromApi } from "@/src/utils/searchApi";
import MovieCard from "@/src/components/MovieCard";
import {motion} from 'framer-motion'
import { fetchImageUrl } from "@/src/utils/urlFetch";
import { getApiConfiguration } from "@/src/redux/features/homeSlice";
import { useDispatch } from "react-redux";
import Loader from "@/src/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

type Props = {};

const SearchPage = (props: Props) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch()
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const fetchInitialData = () => {
    setLoading(true);
    searchDataFromApi(
      `/search/multi?api_key=${apiKey}&query=${query}&page=${pageNum}`
    ).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    setLoading(false);
    console.log("fetching next data")
    searchDataFromApi(
      `/search/multi?api_key=${apiKey}&query=${query}&page=${pageNum}`
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

  useEffect(() => {
    const fetchImageData = async () => {
      const url = await fetchImageUrl();
      dispatch(getApiConfiguration(url));
    };
    fetchImageData();
  }, [])

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  

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
    className="min-h-screen flex flex-col gap-10">
      {loading && <div className="min-h-screen w-full flex items-center justify-center"><Loader/></div>}
      {!loading && (
        <>
          {data?.results?.length > 0 ? (
            <>
              <div className="text-white m-2 px-10 text-3xl pt-20">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${decodeURI(query)}'`}
              </div>
              <InfiniteScroll
                className="flex w-full p-10 row-auto flex-wrap gap-10 md:gap-32 mb-[50px]"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Loader/>}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} item={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="pt-20 text-white m-2 text-3xl">Sorry, Result not Found</span>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SearchPage;
