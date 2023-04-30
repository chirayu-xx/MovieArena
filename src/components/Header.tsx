'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";


type Props = {}

const Header = (props: Props) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(" ");
  const [query, setQuery] = useState("");

  const navigationHandler = (type:any) => {
    if (type === "movie") {
        router.push("/explore/movie");
    } else {
      router.push("/explore/tv");
    }
};

const searchQueryHandler = (event:any) => {
  if (event.key === "Enter" && query.length > 0) {
    router.push(`/search/${query}`);
  }
};

const openSearch = () => {
  setShowSearch(true);
};

  return (
    <header className='fixed w-full h-[60px] bg-[black] bg-opacity-25 backdrop-filter z-10 px-10 md:px-12'>
      <div className='flex items-center justify-between'>
        <img className='cursor-pointer h-[50px]' onClick={() => router.push("/")} src='https://raw.githubusercontent.com/ShariqAnsari88/movix/08be5dfede849e402b234aacdef044da750bed3c/src/assets/movix-logo.svg' alt='' />
          <div className='flex text-white font-medium cursor-pointer'>
            <a className='px-8' onClick={() => navigationHandler("movie")}>Movies</a>
            <a className='px-8' onClick={() => navigationHandler("tv")}>TV Shows</a>
            <HiOutlineSearch onClick={openSearch} />
          </div>
      </div>

      {showSearch && (
        <div className=' w-full h-[60px] bg-white top-60'>
          <div className='w-full flex items-center h-[40px] mt-[10px]'>
            <input className='w-full h-16 bg-white outline-none border-0 rounded-l-lg pl-4 pr-15 text-base' type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose className='cursor-pointer text-base flex-shrink-0 ml-4' onClick={() => setShowSearch(false)} />
          </div>
        </div>
      )}

    </header>
  )
}

export default Header