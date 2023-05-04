'use client'
import React from 'react'
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {}

const DetailSkeleton = (props: Props) => {
  return (
    
    <SkeletonTheme baseColor="#0a2955" highlightColor="#04152d">
    <div className="flex flex-col md:flex-row gap-10 max-w-xl">
      <Skeleton width={390} height={500} className="h-full w-full" />
      <div className="flex gap-3 flex-col">
        <Skeleton width={200} height={20} />
        <Skeleton width={50} height={20} />
        <div className="flex gap-3 items-center">
          <Skeleton width={100} height={100} circle />
          <Skeleton width={50} height={20} />
        </div>
        <Skeleton width={500} height={20} className="m-2 max-w-xs md:w-full" count={6} />
        <div className="mt-5">
      <Skeleton width={400} height={20} className="mt-2"  count={3} />
        </div>
      </div>
    </div>
  </SkeletonTheme>
  )
}

export default DetailSkeleton