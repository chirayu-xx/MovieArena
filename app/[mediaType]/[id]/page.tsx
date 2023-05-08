//@ts-nocheck
"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import DetailsBanner from "@/src/components/DetailComponents/DetailsBanner";
import Cast from "@/src/components/DetailComponents/Cast";
import VideosSection from "@/src/components/DetailComponents/VideosSection";
import Similar from "@/src/components/DetailComponents/Similar";
import Recommendation from "@/src/components/DetailComponents/Recommendation";
import useFetch from "@/hooks/useFetch";
import { fetchImageUrl } from "@/src/utils/urlFetch";
import { getApiConfiguration } from "@/src/redux/features/homeSlice";
import { useDispatch } from "react-redux";
import {motion} from 'framer-motion'
import SeasonList from "@/src/components/SeasonList/SeasonList";

type Props = {};

const DetailPage = (props: Props) => {
  const dispatch = useDispatch();
  const { mediaType, id } = useParams();
  const { data:mediaData , loading:dataLoading } = useFetch(`/${mediaType}/${id}`);
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  var index = data?.results.findIndex((element: Element) =>
    element.name.includes("Official Trailer")
  );
  if (index === -1) {
    index = data?.results.findIndex(
      (element: Element) => element.type === "Trailer"
    );
  }
  

  useEffect(() => {
    const fetchImageData = async () => {
      const url = await fetchImageUrl();
      dispatch(getApiConfiguration(url));
    };
    fetchImageData();
  }, []);
  return (
    <motion.div
    initial={{opacity:0 , y:20}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0 , y:20}}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 15,
      duration: 1,
      delay: 1
    }}
    >
      <DetailsBanner data={mediaData} loading={dataLoading} video={data?.results?.[index]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {
        mediaType === "tv" && <SeasonList id={id} data={mediaData?.seasons} loading={dataLoading} />
      }
      {
        data?.results.length && 
        <VideosSection data={data} loading={loading} />
      }
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </motion.div>
  );
};

export default DetailPage;
