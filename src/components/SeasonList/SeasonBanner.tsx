"use client";
import useFetch from '@/hooks/useFetch';
import { useParams } from 'next/navigation';
import React from 'react'
import { Img } from '../LazyLoadImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CircleRating from '../List/CircleRating';
import Genres from '../List/Genres';
import dayjs from 'dayjs';
import DetailSkeleton from '../Skeleton';

type Props = {
    data: any,
    loading: Boolean
}

const SeasonBanner = ({ data, loading }: Props) => {
    const url: any = useSelector((state: RootState) => state.home.url);
    const PosterFallback =
        "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";

    return (
        <div className="w-full bg-black pt-[200px] mb-[50px]">
            <>
                {!!data ? (
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
                                            data?.air_date
                                        ).format("YYYY")})`}
                                    </div>

                                    {/* overview */}
                                    <div className="my-[20px] lg:my-[25px]">
                                        <div className="text-[24px] mb-[10px]">Overview</div>
                                        <div className="leading-[24px]">{data.overview}</div>
                                    </div>

                                    <div className='border-b-2 border-white/10 p-[15px] flex'>
                                        {data.air_date && (
                                            <div>
                                                <span className="mr-[10px]  leading-[24px] font-bold">
                                                    Release Date:{" "}
                                                </span>
                                                <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                    {dayjs(data.air_date).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        )}
                                        {data.episodes.length && (
                                            <div>
                                                <span className="mr-[10px]  leading-[24px] font-bold">
                                                    Total Episodes:{" "}
                                                </span>
                                                <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                    {data.episodes.length}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ): <div className="max-w-5xl flex justify-center"><DetailSkeleton/></div>}
            </>
        </div>
    )
}
export default SeasonBanner;