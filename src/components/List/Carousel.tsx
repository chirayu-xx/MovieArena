//@ts-nocheck
import { Movie } from "@/typing";
import React, { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { Img } from "../LazyLoadImage";
import { RootState } from "@/src/redux/store";
import Link from "next/link";

type Props = {
  data: Movie | any;
  loading: boolean;
  endpoint: string
};

function Carousel({ data, loading, endpoint }: Props) {
  const carouselContainer = useRef();
  const { url }: any = useSelector((state: RootState) => state.home);
  const [wait, setWait] = useState(true);
  const navigation = (dir : string) => {
    const container = carouselContainer.current;
    const scrollAmount =
        dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
};
  const skItem = () => {
    return (
      <div
        role="status"
        className="max-w-sm p-4 rounded shadow animate-pulse md:p-6 "
      >
        <div className="flex items-center justify-center h-52 mb-4 bg-[#0a2955] rounded dark:bg-[#0a2955]"></div>

        <div className="flex items-center mt-4 space-x-3">
          <div>
            <div className="h-2.5 bg-[#0a2955] rounded-full dark:bg-[#0a2955] w-44 mb-2"></div>
            <div className="w-24 h-2 bg-[#0a2955] rounded-full dark:bg-[#0a2955]"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  return (
    <div className="relative">
      {!loading ? 
        <div>
        <BsFillArrowLeftCircleFill
          onClick={() => navigation("left")}
          className="left-[-10px] hidden md:block w-8 md:h-10 h-8 md:w-10  absolute top-1/3 cursor-pointer  text-orange-500 z-10"
        />
        <BsFillArrowRightCircleFill
          onClick={() => navigation("right")}
          className="right-[-10px] hidden md:block w-8 md:h-10 h-8 md:w-10 absolute top-1/3 cursor-pointer  text-orange-500 z-10"
          />
        {!loading ? (
          <div ref={carouselContainer} className="flex gap-10 overflow-y-hidden m-0 p-0">
            {data?.map((item: any) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : "";
              return (
                <div
                key={item.id}
                className="w-28 md:w-48 cursor-pointer shrink-0"
                >
                  <Link href={`/${item.media_type}/${
                            item.id
                        }`}>
                  <div className="relative w-full bg-cover bg-center rounded-md flex items-end justify-between p-1 mb-3">
                    <Img src={posterUrl} className="rounded-lg w-52" />
                  </div>
                  <div className="text-white font-semibold text-base md:text-lg">
                    {item.title || item.name}
                  </div>
                  <div className="text-gray-400 font-semibold text-sm md:text-base">
                    {dayjs(item.release_date).format("MMM D, YYYY")}
                  </div>
                </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>: 
      <div className="flex gap-[10px]overflow-y-hidden mr-[-20px] ml-[-20px] px-[20px] py-0">
      {skItem()}
      {skItem()}
      {skItem()}
      {skItem()}
      {skItem()}
      {skItem()}
      {skItem()}
      {skItem()}
    </div>
    }
    </div>
  );
}

export default Carousel;
