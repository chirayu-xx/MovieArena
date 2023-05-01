import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Img } from "./LazyLoadImage";
import Image from 'next/image';

type Props = {
    data: any,
    loading: Boolean,
}

const Cast = ({data, loading}: Props) => {
    const url: any = useSelector((state: RootState) => state.home.url);

  return (
    <div className='relative mb-[50px]'>
        {/* contentwrapper */}
        <div className="w-full mx-auto px-10 md:px-20">
            <div className='text-white text-[24px] mb-[25px]'>Top Cast</div>
            {!loading ? (
                <div className='flex gap-5 overflow-y-hidden'>
                    {data?.map((item: any) => {
                        let imgUrl = item.profile_path
                        ? url.profile + item.profile_path
                        : "https://github.com/ShariqAnsari88/movix/blob/main/src/assets/avatar.png?raw=true";
                        return (
                            <div className='w-full text-center text-white' key={item.id}>
                                <div className='w-[175px] h-[175px] rounded-md overflow-hidden mb-[15px]'>
                                    <Img className='w-full h-full' src={imgUrl} />
                                </div>
                                <div className='text-[14px] leading-[20px] font-semibold'>{item.name}</div>
                                <div className='text-[16px] opacity-[0.5] leading-[20px]'>{item.character}</div>
                            </div>
                        )
                    })}
                </div>
            )  : (
                // sk
                <div>
            
                </div>
            )}
        </div>
    </div>
  )
}

export default Cast