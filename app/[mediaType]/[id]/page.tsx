"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import DetailsBanner from "@/src/components/DetailsBanner";
import Cast from "@/src/components/Cast";
import VideosSection from "@/src/components/VideosSection";
import Similar from "@/src/components/Similar";
import Recommendation from "@/src/components/Recommendation";
import useFetch from "@/hooks/useFetch";
import { fetchImageUrl } from "@/src/utils/urlFetch";
import { getApiConfiguration } from "@/src/redux/features/homeSlice";
import { useDispatch } from "react-redux";

type Props = {};

const DetailPage = (props: Props) => {
  const dispatch = useDispatch();
  const { mediaType, id } = useParams();
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
    <div>
      <DetailsBanner video={data?.results?.[index]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default DetailPage;
