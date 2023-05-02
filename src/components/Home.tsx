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



type Props = {};
export default function Home({ }: Props) {
  const dispatch = useDispatch();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    //@ts-ignore
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data])


  const url: any = useSelector((state: RootState) => state.home.url)
  const fetch = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async () => {
    let promises: Array<Object> = []
    let endpoints = ['tv', 'movie']
    let allGenres: any = {}
    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    //@ts-ignore
    data.map(({ genres }) => {
      return genres.map((item: any) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres));
  }
  useEffect(() => {
    fetch();
    genresCall();
  }, []);

  const searchQueryHandler = (event: any) => {
    if (event.key === "Enter" && query.length > 0) {
      router.push(`/search/${query}`)
    }
  }

  return (
    <div className="w-full p-10 lg:p-32 m-2 overflow-x-hidden flex flex-col gap-0 lg:gap-28">
      {/* home banner session */}
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
          <span className="text-3xl md:text-6xl lg:text-8xl font-bold mb-[10px]">Welcome</span>
          <span className="text-lg font-medium mb-[40px]">Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className="flex items-center w-full">
            <input type="text" className="w-[calc(100%-100px)] p-2  text-black bg-white outline-none border-0 rounded-l-3xl px-[15px] text-sm lg:text-base"
              placeholder="Search for a movie or tv show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button className="w-[100px]  bg-gradient-to-r p-2 from-black-lighter duration-300 transition via-black-light to-black text-white outline-0 border-0 rounded-e-3xl text-sm lg:text-base">Search</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 z-10">
      <List title="Trending" tabs={["Day", "Week"]} endpoint="/trending/all" />
      <List title="Now Playing" tabs={["Movie"]} endpoint="/now_playing" />
      <List title="What's Popular" tabs={["Movie", "Tv"]} endpoint="/popular" />
      <List title="Top Rated" tabs={["Movie", "Tv"]} endpoint="/top_rated" />
      </div>
    </div>
  )
}
