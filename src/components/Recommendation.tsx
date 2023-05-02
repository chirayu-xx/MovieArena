import useFetch from '@/hooks/useFetch'
import React from 'react'
import Carousel from './List/Carousel'

type Props = {
  mediaType: string
  id:string
}

const Recommendation = ({ mediaType, id }: Props) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
);
  return (
    <div className='flex flex-col gap-5 lg:gap-10 px-5 p-2 lg:px-20 lg:p-10 m-2'>
      <h1 className='text-xl md:text-2xl text-white'>Recommendations</h1>
      {
        data ? (<Carousel data={data?.results}
          loading={loading}
          endpoint={mediaType}/>) : (<h1 className='text-lg md:text-xl text-white'>Sorry...No data found</h1>)
      }
    </div>
  ) 
}

export default Recommendation