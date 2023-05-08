//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Img } from "./LazyLoadImage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchDataFromApi } from "../utils/api";
import ReactPlayer from "react-player/youtube";
import Link from "next/link";
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs";
import { motion } from "framer-motion";

type Props = {};

const HomeBanner = (props: Props) => {
  const { data, loading } = useFetch("/movie/now_playing");
  const [bannerData, setBannerData] = useState(null);
  const [mute, setMute] = useState(true);
  const [videoId, setVideoId] = useState(null);
  useEffect(() => {
    const videoIdFetch = async (data: any) => {
      const id = data?.id;
      const trailerData = await fetchDataFromApi(`/movie/${id}/videos`);
      var index = trailerData?.results?.findIndex((element: Element) =>
        element.name.includes("Official Trailer")
      );
      if (index === -1) {
        index = trailerData?.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
      }
      setVideoId(trailerData?.results?.[index]?.key);
    };
    if (data) {
      const banner = data?.results?.[Math.floor(Math.random() * 20)];
      setBannerData(banner);
      videoIdFetch(banner);
    }
  }, [data]);
  console.log(bannerData);

  return (
    <div className="w-full flex-col h-screen flex relative">
      {!loading && (
        <>
          <div className="relative  w-full h-full flex justify-start items-end overflow-hidden text-center">
            {videoId && (
              <div className="absolute scale-150 w-full h-full flex items-center justify-center">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoId}?autoplay=1`}
                  width={"100%"}
                  height={"100%"}
                  playing
                  muted={mute}
                  loop
                />
              </div>
            )}
            <motion.div
            
              className="absolute flex mix-blend-multiply w-full h-full bg-[#000000]">
              <motion.h1
               drag
               dragConstraints={{
                 top: -10,
                 left: -10,
                 right: 10,
                 bottom: 10,
               }} 
                initial={{
                  opacity: 0,
                  y: 200
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  duration: 1,
                  delay: 1
                }}
                className="text-left absolute top-1/3 lg:top-20 lg:left-20 max-w-5xl p-3 md:p-10 text-white text-[75px] md:text-[150px] overflow-hidden"
                style={{ fontWeight: "900" }}
              >
                {bannerData?.title.split(":")}
              </motion.h1>
            </motion.div>
            <div className="leading-[24px] pb-10 lg:pb-20 z-20 p-2 md:p-5 lg:p-10 lg:px-20 text-base text-white text-left flex justify-between gap-2 w-full items-end ">
              <motion.div
                initial={{
                  opacity:0,
                  y: 100,
                }}
                animate={{
                  opacity:1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                  duration: 1,
                  delay: 1
                }}
                className="hidden md:flex lg:max-w-2xl flex-col">
                <span className="text-xl">Overview :</span>
                <span className="opacity-50">{bannerData?.overview}</span>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  x: 200,
                  
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                  duration: 1,
                  delay: 1
                }}
                className="flex justify-end items-center">
                <Link href={`/movie/${bannerData?.id}`}>
                  <button className="md:mx-20 mx-4 border-black-light hover:bg-black-light p-2 border-2 rounded-full">Watch Now</button>
                </Link>
                <button className="modalButton" onClick={() => setMute(!mute)}>
                  {mute ? (
                    <BsVolumeMute className="h-12 w-12 border-2 border-black-light rounded-full p-2 hover:bg-black-light" />
                  ) : (
                    <BsVolumeUp className="h-12  w-12 border-2 border-black-light rounded-full p-2 hover:bg-black-light" />
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </>
      )}
      <div className="w-full h-[100px] absolute bottom-0 left-0 bg-gradient-to-b from-black/0 to-black"></div>
    </div>
  );
};

export default HomeBanner;
