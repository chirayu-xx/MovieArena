'use client'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "../redux/features/homeSlice";
import List from "./List/List";
import Loader from "./Loader";
import { fetchGenres, fetchImageUrl } from "../utils/urlFetch";
import HomeBanner from "./HomeBanner";

type Props = {};
export default function Home({ }: Props) {
  const dispatch = useDispatch();

  const [initialDataLoading, setInitialDataLoading] = useState(true)

  useEffect(() => {
    const fetchImageData = async () => {
      const urlState = await fetchImageUrl();
      dispatch(getApiConfiguration(urlState));
    }
    const genresCall = async () => {
      const data = await fetchGenres();
      dispatch(getGenres(data))
    }
    fetchImageData();
    genresCall();
  }, [])

  setTimeout(() => {
    setInitialDataLoading(false)
  }, 700);

  return (
    <div
    
    className="w-full  overflow-x-hidden flex flex-col gap-0">
      {/* home banner session */}
      {!initialDataLoading ? (<>
        <HomeBanner />
        <div className="px-10 relative lg:px-32 mx-2 z-10">
        <div className="flex flex-col gap-10 z-10">
          {/* <List title="Now" tabs={["Day", "Week"]} endpoint="/trending/all" /> */}
          <List title="Upcoming" tabs={["Movie"]} endpoint="/upcoming" />
          <List title="What's Popular" tabs={["Movie", "Tv"]} endpoint="/popular" />
          <List title="Top Rated" tabs={["Movie", "Tv"]} endpoint="/top_rated" />
        </div>
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
