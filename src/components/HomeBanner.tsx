//@ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import useFetch from "@/hooks/useFetch";
import { Img } from "./LazyLoadImage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {}

const HomeBanner = (props: Props) => {
  const { data, loading } = useFetch("/movie/popular");
  const [bannerData, setBannerData] = useState(null);
  const [background, setBackground] = useState("");
  const url: any = useSelector((state: RootState) => state.home.url)
  
  useEffect(() => {
    const banner = data?.results[Math.floor(Math.random() * 20)]
    setBannerData(banner)
    setBackground(url.backdrop + banner?.backdrop_path)
  }, [data])
  if(bannerData){
    const {data : videodata, loading: videoloading} = useFetch(`/movie/${bannerData?.id}/videos`)
    console.log(videodata)
  }

  return (
    <div className="w-full h-[450px] bg-black flex relative">
      {!loading &&
        <>
              <div className="relative w-full h-full shadow-2xl overflow-hidden text-center">
                <img src={background} className='w-full h-full'/>
                <h1 className='w-full h-full font-extrabold absolute top-0 left-0 flex justify-center items-center text-white text-7xl bg-[#000] mix-blend-multiply'>{bannerData?.title}</h1>
                </div>
                {/* <p  className="text-lg">More text here</p> */}
        </>
      }
      {/* opacity-layer */}
    </div>
  )
}


export default HomeBanner