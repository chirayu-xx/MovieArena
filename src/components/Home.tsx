'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchDataFromApi } from "@/src/utils/api";
import { getApiConfiguration, getGenres } from "../redux/features/homeSlice";
import { RootState } from "../redux/store";
import {Url} from '../../typing'
import Carousel from "./List/List";
import List from "./List/List";

type Props = {};
export default function Home({}: Props) {
  const dispatch = useDispatch();
  const url:any= useSelector((state:RootState ) => state.home.url)
  const fetch = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async() => {
    let promises: Array<Object> = []
    let endpoints = ['tv', 'movie']
    let allGenres:any= {}
    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    //@ts-ignore
    data.map(({genres}) => {
      return genres.map((item: any) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres));
  }
  useEffect(() => {
    fetch();
    genresCall();
  }, []);

  return(
    <div className="w-full p-10 md:p-32 m-2 overflow-x-hidden flex flex-col gap-20">
        {/* home banner session */}
      <div className="h-[200px]">
         <div>
            <div>
              <span>Welcome.</span>
              <span>Millions of movies, TV shows and people to discover. Explore now.</span>
              <div></div>
            </div>
         </div>
      </div>
    <List title="Trending" tabs={["Day", "Week"]} endpoint="/trending/all"/>
      <List title="Now Playing" tabs={["Movie"]} endpoint="/now_playing"/>
      <List title="What's Popular" tabs={["Movie", "Tv"]} endpoint="/popular"/>
      <List title="Top Rated" tabs={["Movie", "Tv"]} endpoint="/top_rated"/>
    </div>
  )
}
