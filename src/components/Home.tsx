'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchDataFromApi } from "@/src/utils/api";
import { getApiConfiguration } from "../redux/features/homeSlice";
import { RootState } from "../redux/store";
import {Url} from '../../typing'
import Carousel from "./List/List";

type Props = {};
export default function Home({}: Props) {
  const dispatch = useDispatch();
  const url:any= useSelector((state:RootState ) => state.home.url)
  const fetch = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  return(
    <div className="w-full p-10 m-2 overflow-x-hidden">
      <div className="h-[200px]"></div>
      <Carousel title="Trending" tabs={["Day", "Week"]} endpoint="/trending/all"/>
    </div>
  )
}
