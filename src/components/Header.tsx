'use client'
import { useRouter, usePathname } from 'next/navigation';
import React, { useRef } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";
import Link from 'next/link';
import Logo  from '../../logo/png/logo.png'
import Image from 'next/image';

type Props = {}

const Header = (props: Props) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const [showheader, setHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);




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
      setQuery("");
    }
  };

  const openSearch = () => {
    const inputElement = inputRef.current;
    if(inputElement && !showSearch){
      inputElement.focus();
    }
    setShowSearch(!showSearch);
  };



  return (
    <header className={`fixed  flex items-center  w-full h-[60px] justify-between ${showheader ?"top-0" : "top-[-200px]"} transition-all duration-600 bg-[black]/25  backdrop-filter z-50 px-3 md:px-12`}>
      <div className='flex items-center  justify-between'>
        <Link href={"/"}>
          <Image className='cursor-pointer' width={200} src={Logo} alt='' />
        </Link>
          
        <div className={`flex z-20 md:hidden bg-black2 p-3 py-7 justify-center items-end flex-col absolute right-0 gap-4 ${showMenu ? 'top-14' : 'top-[-200px]'} transition-all duration-500 ease-in-out md:relative md:flex-row text-white font-medium cursor-pointer`}>
          <Link href={'/explore/movie'} className='px-8'>Movies</Link>
          <Link href={'/explore/tv'} className='px-8'>TV Shows</Link>
          <HiOutlineSearch className='hidden md:block' onClick={openSearch} />
        </div>

      </div>
      <div className='md:flex  hidden text-white font-medium cursor-pointer'>
            <Link href={'/explore/movie'} className='hover:text-black-lighter px-8'>Movies</Link>
            <Link href={'/explore/tv'} className='px-8 hover:text-black-lighter'>TV Shows</Link>
            <HiOutlineSearch onClick={openSearch} />
          </div>

      <div className='flex  cursor-pointer gap-2 md:hidden items-center justify-center'>
        {
          showMenu ?
            <VscChromeClose onClick={() => setShowMenu(!showMenu)} className='text-white' /> :
            <SlMenu onClick={() => setShowMenu(!showMenu)} className="text-white" />
        }

        <HiOutlineSearch color='white' className='block p-2 hover:text-black-light md:hidden' onClick={openSearch} />
      </div>

      
        <div className={`absolute ${showSearch ? 'right-0' : 'right-[-1000px]'} transition-all ease-out duration-500 m-2 top-14 h-[60px] flex items-center`}>
          <div className='flex items-center rounded-md  p-4 bg-black-light'>
            <input autoFocus= {showSearch} className='rounded-md  bg-black-light outline-none border-0 rounded-l-lg pl-4 pr-15 text-base text-white' type="text"
              placeholder="Enter a movie or tv show...."
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose className='cursor-pointer text-base flex-shrink-0 ml-4 text-white' onClick={() => setShowSearch(false)} />
          </div>
        </div>

    </header>
  )
}

export default Header