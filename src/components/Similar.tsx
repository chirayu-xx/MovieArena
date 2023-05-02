import React from 'react'
import Carousel from './List/Carousel'
import useFetch from '@/hooks/useFetch'

type Props = {
  mediaType: string
  id: string
}

const Similar = ({mediaType, id}: Props) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <div className='flex flex-col gap-10 px-20 p-10 m-2'>
      <h1 className='text-xl md:text-2xl text-white'>{title}</h1>
      {
        data ? (<Carousel data={data?.results}
          loading={loading}
          endpoint={mediaType}/>) : (<h1 className='text-lg md:text-xl text-white'>Sorry...No data found</h1>)
      }
      
    </div>
  )
}

export default Similar