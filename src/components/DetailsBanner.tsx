//@ts-nocheck
"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "@/src/redux/store";
import Genres from "./List/Genres";
import CircleRating from "./List/CircleRating";
import { BsPlay } from "react-icons/bs";
import VideoPopup from "./VideoPopup";
import { Img } from "./LazyLoadImage";
import useFetch from "@/hooks/useFetch";

type Props = {
  video: string;
  crew: string;
};

const DetailsBanner = ({ video, crew }: Props) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const url: any = useSelector((state: RootState) => state.home.url);
  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes: any) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const PosterFallback =
    "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";

  const skItem = () => {
    return (
      <div
        role="status"
        className="max-w-sm p-4 rounded shadow animate-pulse md:p-6 "
      >
        <div className="flex items-center justify-center h-56 md:h-64  mb-4 bg-[#0a2955] rounded dark:bg-[#0a2955]"></div>

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
    <div className="w-full bg-black pt-[200px] mb-[50px]">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="w-full h-full absolute top-0 left-0 opacity-[0.1] overflow-hidden">
                <Img
                  className="w-full h-full object-cover object-center"
                  src={url.backdrop + data.backdrop_path}
                />
              </div>
              {/* opacity-layer */}

              <div className="w-full h-[250px] bg-gradient-to-b from-white/0 via-black to-black absolute bottom-0 left-0"></div>
              {/* contentwrapper */}
              <div className="w-full max-w-[1200px] mx-auto px-10 md:px-20">
                <div className="flex relative flex-col md:flex-row gap-[25px]">
                  {/* left */}
                  <div className="shrink-0">
                    {data.poster_path ? (
                      <Img
                        className="w-96 block rounded-xl"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img
                        className="w-full block rounded-xl"
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  {/* right */}
                  <div className="text-white">
                    <div className="leading-[40px] text-[28px]">
                      {`${data.name || data.title}(${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="text-[16px] leading-[24px] mb-[15px] opacity-[0.5] italic">
                      {data.tagline}
                    </div>
                    <div className="mb-4 flex-wrap">
                      <Genres id={_genres} />
                    </div>
                    {/* row */}
                    <div className="flex items-center gap-[25px] w-full mb-[25px]">
                      <div className="w-36">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                      </div>
                      <div
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                        className="flex items-center  justify-center"
                      >
                        <BsPlay
                          className="flex items-center  cursor-pointer"
                          size={"55px"}
                        />
                        <span className="text-basemd:text-2xl">
                          Watch Trailer
                        </span>
                      </div>
                    </div>

                    {/* overview */}
                    <div className="mb-[25px]">
                      <div className="text-[24px] mb-[10px]">Overview</div>
                      <div className="leading-[24px]">{data.overview}</div>
                    </div>

                    {/* info */}
                    <div className="border-b-2 border-white/10 p-[15px] flex">
                      {data.status && (
                        <div className="mr-[10px] flex-col md:flex-row flex">
                          <span className="mr-[10px] leading-[24px] font-bold">
                            Status:{" "}
                          </span>
                          <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                            {data.status}
                          </span>
                        </div>
                      )}
                      {data.release_date && (
                        <div>
                          <span className="mr-[10px]  leading-[24px] font-bold">
                            Release Date:{" "}
                          </span>
                          <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div>
                          <span className="mr-[10px] leading-[24px] font-bold">
                            Runtime:{" "}
                          </span>
                          <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="border-b-2 border-white/10 p-[15px] flex">
                        <span className="mr-[10px] leading-[24px] font-bold">
                          Director:{" "}
                        </span>
                        <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="border-b-2 border-white/10 p-[15px] flex">
                        <span className="mr-[10px] leading-[24px] font-bold">
                          Writer:{" "}
                        </span>
                        <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div>
                        <span className="mr-[10px] leading-[24px] font-bold">
                          Creator:{" "}
                        </span>
                        <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex relative flex-col gap-[25px]">
            {/* left */}
            <div className="shrink-0 w-full block rounded-xl aspect-[1/1.5]"></div>
            {/* right */}
            <div className="w-full">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsBanner;
