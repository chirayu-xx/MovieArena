'use client'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchDataFromApi } from "@/src/utils/api";
import { getApiConfiguration, getGenres } from "../redux/features/homeSlice";
import { RootState } from "../redux/store";
import { Url } from '../../typing'
import Carousel from "./List/List";
import List from "./List/List";
import { useRouter } from 'next/navigation';
import useFetch from "@/hooks/useFetch";
import { Img } from "./LazyLoadImage";
import Loader from "./Loader";
import { fetchGenres, fetchImageUrl } from "../utils/urlFetch";



type Props = {};
export default function Home({ }: Props) {
  const dispatch = useDispatch();
  const [background, setBackground] = useState("");
  

  const [initialDataLoading, setInitialDataLoading] = useState(true)

  const { data, loading } = useFetch("/movie/popular");

  
  const url: any = useSelector((state: RootState) => state.home.url)
  const [bannerData, setBannerData] = useState(null);
  
  useEffect(() => {
    //@ts-ignore
    

  }, [data])

  useEffect(() => {
    const fetchImageData = async () => {
      const url = await fetchImageUrl();
      dispatch(getApiConfiguration(url));
    }
    const genresCall = async() => {
      const data = await fetchGenres();
      dispatch(getGenres(data))
    }
    fetchImageData();
    genresCall();
    const banner = data?.results[Math.floor(Math.random() * 20)]
    setBannerData(banner)
    setBackground(url.backdrop + bannerData?.backdrop_path)
  }, [])

  console.log(bannerData)



  setTimeout(() => {
    setInitialDataLoading(false)
  }, 700);

  return (
    <div className="w-full p-10 lg:p-32 m-2 overflow-x-hidden flex flex-col gap-0 lg:gap-28">
      {/* home banner session */}
      {!initialDataLoading ? (<>
        <div className="w-full h-[450px] bg-black flex">
          {!loading &&
            <div className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
              <Img className="w-full h-full object-cover object-center" src={background} />
            </div>
          }

          {/* opacity-layer */}
          <div className="w-full h-[150px] lg:h-[200px] bg-gradient-to-b from-white/0 via-black hidden lg:block to-black absolute  md:bottom-[-30px] left-0"></div>

          {/* contentwrapper */}
          <div className="flex flex-col items-center text-center text-white relative max-w-[800px] m-auto">
            <span className="text-3xl md:text-6xl lg:text-8xl font-bold mt-[450px]">{bannerData?.original_title}</span>
          </div>
        </div>
        <div className="flex flex-col gap-10 z-10">
          <List title="Trending" tabs={["Day", "Week"]} endpoint="/trending/all" />
          <List title="Now Playing" tabs={["Movie"]} endpoint="/now_playing" />
          <List title="What's Popular" tabs={["Movie", "Tv"]} endpoint="/popular" />
          <List title="Top Rated" tabs={["Movie", "Tv"]} endpoint="/top_rated" />
        </div>
      </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      )}
    </div>
  )
}
