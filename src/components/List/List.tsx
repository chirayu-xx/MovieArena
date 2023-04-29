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
  const { data, loading } : any = useFetch(`${endpoint}/${category}`);
  const onTabChange = (tab: string) => {
    setCategory(tab.toLowerCase());
  };
  return (
    <div>
      <div className="flex justify-center w-full py-2">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-xl md:text-3xl text-white font-bold bg-transparent">
            {title}
          </h1>
          <SwitchTab tabs={tabs} onTabChange={onTabChange} />
        </div>
      </div>
      <Carousel endpoint = {endpoint} loading={loading} data = {data?.results} />
    </div>
  );
};

export default List;
