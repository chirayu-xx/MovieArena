"use client";

import EpisodeCard from "./EpisodeCard";

type Props = {
    episodes: any
}

const Episodes = ({ episodes }: Props) => {
    return (
        <div className="flex flex-col gap-5 lg:gap-10 px-5 p-2 lg:px-20 lg:p-10">
              <h1 className='text-xl md:text-2xl text-white'>Episdoes</h1>
            <div className="w-full flex flex-col gap-10 max-w-[1200px] mx-auto px-10 md:px-20">
                {episodes?.map((episode: any,index: number) => {
                    return (
                        <EpisodeCard  episode={episode} key={index}/>
                    )
                })}
            </div>
        </div>
    )
}
export default Episodes;