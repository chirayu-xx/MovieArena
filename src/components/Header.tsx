import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='fixed w-full h-[60px] z-1 flex items-center transition all-ease duration-0.5 z-2 translate-y-0'>
        <div className='flex items-center justify-space-between'>
            <img className='cursor-pointer h-[50px]' src='https://raw.githubusercontent.com/ShariqAnsari88/movix/08be5dfede849e402b234aacdef044da750bed3c/src/assets/movix-logo.svg' alt='' />
            <menu className='items-center flex gap-20 justify-between'>
              <div className='h-[60px] flex items-center text-white font-medium relative'>Movies</div>
              <div className='h-60 flex items-center  text-white font-medium relative'>TV Shows</div>
              <div className='h-60 flex items-center text-white font-medium relative'>search</div>
            </menu>
        </div>
    </header>
  )
}

export default Header