'use client'
import { Movie } from "@/typing";
import React, { useRef, useEffect } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { Img } from "../LazyLoadImage";
import { RootState } from "@/src/redux/store";
import Link from "next/link";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  data: Movie | any;
  loading: Boolean;
  endpoint: string
};

const ListSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#23351F" highlightColor="#3A6130">
      <Skeleton height={300} width={200}/>
    </SkeletonTheme>
  )
}

function Carousel({ data, loading, endpoint }: Props) {
  const carouselContainer = useRef();
  const { url }: any = useSelector((state: RootState) => state.home);
  const navigation = (dir: string) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        //@ts-ignore
        ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    //@ts-ignore
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  

  return (
    <div className="relative">
      <div>
        <BsFillArrowLeftCircleFill
          onClick={() => navigation("left")}
          className="left-[-10px] hidden md:block w-8 md:h-10 h-8 md:w-10  absolute top-1/3 cursor-pointer  text-black-light z-10"
        />
        <BsFillArrowRightCircleFill
          onClick={() => navigation("right")}
          className="right-[-10px] hidden md:block w-8 md:h-10 h-8 md:w-10 absolute top-1/3 cursor-pointer  text-black-light z-10"
        />
        {!loading ? (
          //@ts-ignore
          <div ref={carouselContainer} className="flex gap-32 overflow-y-hidden m-0 p-0">
            {data?.map((item: any) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";
              return (

                <Link key={item.id}
                  className="w-[125px] cursor-pointer shrink-0" href={`/${item.media_type || endpoint}/${item.id
                    }`}>
                  {/* posterblock  */}
                  <div className="rounded-md flex flex-col  relative aspect-auto">
                    <div className="w-40 md:w-52 min-h-[300px]">
                      <Img src={posterUrl} className="h-full object-cover object-center rounded-md" />
                    </div>
                    <div className="w-14 top-0 right-[-70px] md:right-[-100px] absolute">
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                    </div>
                    <div className="absolute bottom-0 left-0">
                      <Genres id={item.genre_ids.slice(0, 2)} />
                    </div>
                  </div>
                  {/* textblock  */}
                  <div className="flex flex-col gap-2">
                    <span className="w-full text-base text-white">{item.title || item.name}</span>
                    <span className="text-gray text-sm">
                      {dayjs(item.release_Date || item.release_date || item.first_air_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-[10px] overflow-y-hidden mr-[-20px] ml-[-20px] md:mr-0 md:ml-0 px-[20px]">
            <ListSkeleton/>
            <ListSkeleton/>
            <ListSkeleton/>
            <ListSkeleton/>
            <ListSkeleton/>
            <ListSkeleton/>
            <ListSkeleton/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;
