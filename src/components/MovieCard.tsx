import React from "react";
import { Img } from "./LazyLoadImage";
import CircleRating from "./List/CircleRating";
import Genres from "./List/Genres";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";
import dayjs from "dayjs";

type Props = {
  item: any;
  fromSearch: boolean;
  mediaType: string;
};

const MovieCard = ({ item, fromSearch, mediaType }: Props) => {
  const url: any = useSelector((state: RootState) => state.home.url);
  const posterUrl = item.poster_path ? url.poster + item.poster_path : "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";
  return (
    <Link
      key={item.id}
      className="w-[125px] cursor-pointer shrink-0"
      href={`/${item.media_type || mediaType}/${item.id}`}
    >
      {/* posterblock  */}
      <div className="rounded-md flex flex-col  relative aspect-auto">
        <div className="w-28 md:w-52 h-auto md:min-h-[280px]">
          <Img
            src={posterUrl}
            className="h-full object-cover object-center rounded-md"
          />
        </div>
        {!fromSearch && (
          <>
            <div className="w-12 top-0 right-0 md:right-[-100px] absolute">
              <CircleRating rating={item.vote_average.toFixed(1)} />
            </div>
            <div className="absolute bottom-0 left-0">
              <Genres id={item.genre_ids.slice(0, 2)} />
            </div>
          </>
        )}
      </div>
      {/* textblock  */}
      <div className="flex flex-col gap-2">
        <span className="w-full text-base text-white">
          {item.title || item.name}
        </span>
        <span className="text-gray text-sm">
          {dayjs(item.first_air_date || item.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
