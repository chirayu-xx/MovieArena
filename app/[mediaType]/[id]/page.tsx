'use client'
import React from 'react' 
import useFetch from "@/hooks/useFetch";
import {useParams} from 'next/navigation'
import DetailsBanner from '@/src/components/DetailsBanner';


type Props = {}

const DetailPage = (props: Props) => {

  // const {mediaType, id}= useParams();
  // const {data, loading} = useFetch(`/${mediaType}/${id}`);

  return (
    <div>
      <DetailsBanner  />
    </div>
  )
}
 
export default DetailPage