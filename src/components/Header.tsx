'use client'
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";
import Link from 'next/link';


type Props = {}

const Header = (props: Props) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const [showheader, setHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  const controlNavbar =() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
          setHeader(false);
      } else {
          setHeader(true);
      }
  } else {
      setHeader(true);
  }
  setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
        window.removeEventListener("scroll", controlNavbar);
    };
}, [lastScrollY]);


  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSearch(false);
    setShowMenu(false);
  }, [pathname ])

  const searchQueryHandler = (event: any) => {
    if (event.key === "Enter" && query.length > 0) {
      router.push(`/search/${query}`);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
  };



  return (
    <header className={`fixed  flex items-center  w-full h-[60px] justify-between ${showheader ?"top-0" : "top-[-200px]"} transition-all duration-600 bg-[black]/25  backdrop-filter z-50 px-3 md:px-12`}>
      <div className='flex items-center  justify-between'>
        <Link href={"/"}>
          <img className='cursor-pointer h-[50px]' src='https://raw.githubusercontent.com/ShariqAnsari88/movix/08be5dfede849e402b234aacdef044da750bed3c/src/assets/movix-logo.svg' alt='' />
        </Link>
          
        <div className={`flex z-20 md:hidden bg-black2 p-3 py-7 justify-center items-end flex-col absolute right-0 gap-4 ${showMenu ? 'top-14' : 'top-[-200px]'} transition-all duration-500 ease-in-out md:relative md:flex-row text-white font-medium cursor-pointer`}>
          <Link href={'/explore/movie'} className='px-8'>Movies</Link>
          <Link href={'/explore/tv'} className='px-8'>TV Shows</Link>
          <HiOutlineSearch className='hidden md:block' onClick={openSearch} />
        </div>

      </div>
      <div className='md:flex  hidden text-white font-medium cursor-pointer'>
            <Link href={'/explore/movie'} className='px-8'>Movies</Link>
            <Link href={'/explore/tv'} className='px-8'>TV Shows</Link>
            <HiOutlineSearch onClick={openSearch} />
          </div>

      <div className='flex  cursor-pointer gap-2 md:hidden items-center justify-center'>
        {
          showMenu ?
            <VscChromeClose onClick={() => setShowMenu(!showMenu)} className='text-white' /> :
            <SlMenu onClick={() => setShowMenu(!showMenu)} className="text-white" />
        }

        <HiOutlineSearch className='text-white block md:hidden' onClick={openSearch} />
      </div>

      {showSearch && (
        <div className='absolute left-0 m-0 w-full top-20 h-[60px] flex items-center'>
          <div className='w-full flex items-center rounded-md p-4 bg-white'>
            <input className='w-full rounded-md  bg-white outline-none border-0 rounded-l-lg pl-4 pr-15 text-base' type="text"
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