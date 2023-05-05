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
  return (
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
        <span className="text-3xl md:text-6xl lg:text-4xl font-bold mt-[450px]">{bannerData?.original_title}</span>
      </div>
    </div>
  )
}

export default HomeBanner