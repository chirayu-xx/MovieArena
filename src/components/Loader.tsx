import React from "react";
import { BiPlay } from "react-icons/bi";
type Props = {};

function Loader({}: Props) {
  return (
    <div className="flex flex-col items-center justify-evenly h-[100vh] bg-black">
      <div className= "bg-black-light relative">
        <div className="relative w-40 h-32 z-[0] before:content-[''] before:absolute before:h-[120%] before:border-l-[12px] before:border-l-black after:border-l-black before:left-2 after:right-2 before:border-dashed after:content-[''] after:absolute after:h-[120%] after:border-l-[12px] after:border-dashed animate-loading">
        </div>
        <BiPlay className="absolute top-4 left-8 z-10 text-black" size={'100px'}/>
      </div>
    </div>
  );
}

export default Loader;
