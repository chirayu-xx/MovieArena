"use client";

import { useSelector } from "react-redux";
import { Img } from "../LazyLoadImage";
import { RootState } from "@/src/redux/store";
import dayjs from "dayjs";
import CircleRating from "../List/CircleRating";

type Props = {
    episode: any
}

const EpisodeCard = ({ episode }: Props) => {
    const url: any = useSelector((state: RootState) => state.home.url);
    const PosterFallback =
        "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";

    const toHoursAndMinutes = (totalMinutes: any) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    return (
        <div className="flex flex-col md:flex-row gap-3 items-start justify-start">
            <div className='max-w-sm lg:min-w-[300px] relative'>
                <span className="absolute text-center z-10 text-white text-base md:text-lg top-[-10px] left-[-10px] rounded-full bg-gradient-to-r from-black-lighter via-black-light to-black px-4 py-[7px] md:py-[6px]">{episode.episode_number}</span>
                <Img src={url.backdrop + episode.still_path} className="z-0 object-cover h-full rounded-md w-full object-center" />
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex text-white justify-between w-full">
                    <h1 className='text-white'>{episode.name}</h1>
                    {dayjs(
                        episode?.air_date
                    ).format("MMM D, YYYY")}
                </div>

                <div className="flex gap-2 items-center">
                    <div className="w-12">
                        <CircleRating rating={episode.vote_average.toFixed(1)} />
                    </div>
                    <span className='text-white'>({episode.vote_count})</span>
                </div>
                <span className='text-white'>{episode.overview}</span>
                {episode.runtime && (
                    <div>
                        <span className="mr-[10px] text-gray leading-[24px] font-bold">
                            Runtime:{" "}
                        </span>
                        <span className="mr-[10px] text-white  leading-[24px]">
                            {toHoursAndMinutes(episode.runtime)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
export default EpisodeCard;