"use client";

import React from "react";
import SwitchTab from "./SwitchTab";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Carousel from "./Carousel";

type Props = {
  title: string;
  tabs: Array<string>;
  endpoint: string;
};

const List = ({ title, tabs, endpoint }: Props) => {
  const [category, setCategory] = useState(tabs[0].toLowerCase());

  console.log(endpoint)

  let fetchUrl = `${endpoint}/${category}`;
  if (endpoint === "/popular" || endpoint === '/top_rated' || endpoint === '/now_playing'  ) {
    fetchUrl = `${category}/${endpoint}`;
  }
  
  const { data, loading } : any = useFetch(fetchUrl);
  const onTabChange = (tab: string) => {
    setCategory(tab.toLowerCase());
  };
  return (
    <div>
      <div className="flex justify-center w-full py-2">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-xl md:text-3xl text-white font-semibold bg-transparent">
            {title}
          </h1>
          <SwitchTab tabs={tabs} onTabChange={onTabChange} />
        </div>
      </div>
      <Carousel endpoint = {category.toLowerCase()} loading={loading} data = {data?.results} />
    </div>
  );
};

export default List;
