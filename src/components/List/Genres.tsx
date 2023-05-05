'use client'
import { RootState } from '@/src/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {
    id:Array<number>
}

const Genres = ({id}: Props) => {
    const genres:any= useSelector((state:RootState ) => state.home.genres)

    return (
    <div className='flex gap-1'>
        {id?.map((g) => {
            if(!genres[g]?.name) return
            return(
                <div className='bg-pink py-1 px-1 text-xs rounded-md text-black3
                 whitespace-nowrap' key={g}>
                    {genres[g]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres