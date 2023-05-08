//@ts-nocheck
import { RootState } from '@/src/redux/store'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useRef } from 'react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Img } from '../LazyLoadImage'

type Props = {
    data: any,
    loading: Boolean
    id: number
}

function SeasonList({id, data, loading }: Props) {
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

    console.log(data)
    return (
        <div className='relative'>
            {!loading? (<div className='flex flex-col gap-5 lg:gap-10 px-5 p-2 lg:px-20 lg:p-10'>
                <h1 className='text-xl md:text-2xl text-white'>Seasons</h1>
                <div ref={carouselContainer} className="flex gap-32 overflow-y-hidden m-0 p-0">
                    <BsFillArrowLeftCircleFill
                        onClick={() => navigation("left")}
                        className="left-12 hidden md:block w-8 md:h-10 h-8 md:w-10  absolute top-1/2 cursor-pointer  text-black-light z-10"
                    />
                    <BsFillArrowRightCircleFill
                        onClick={() => navigation("right")}
                        className="right-12 hidden md:block w-8 md:h-10 h-8 md:w-10 absolute top-1/2 cursor-pointer  text-black-light z-10"
                    />
                    {data?.map((item: any) => {
                        const posterUrl = item.poster_path
                            ? url.poster + item.poster_path
                            : "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/no-poster.png?raw=true";
                        return (

                            <Link key={item.id}
                                className="w-[125px] cursor-pointer shrink-0" href={`/tv/${id}/season/${item.season_number}`}>
                                {/* posterblock  */}
                                <div className="rounded-md flex flex-col  relative aspect-auto">
                                    <div className="w-40 md:w-52 min-h-[300px]">
                                        <Img src={posterUrl} className="h-full object-cover object-center rounded-md" />
                                    </div>
                                </div>
                                {/* textblock  */}
                                <div className="flex flex-col gap-2">
                                    <span className="w-full text-base text-white">{item.title || item.name}</span>
                                    <span className="text-gray text-sm">
                                        {dayjs(item.air_date).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>) : (
            <>
            {/* Skeleton  */}
            </>
            ) 
}  
        </div>
    )
}

export default SeasonList