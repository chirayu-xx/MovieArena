import Link from 'next/link'
import React from 'react'
import { BsGithub } from 'react-icons/bs'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='w-full flex flex-col gap-5   justify-center items-center bg-black-light p-10 min-h-[50px]'>
      <h1 className='text-white'>Made with ❤️ by Chirayu and Renesh</h1>
      <div className='flex items-center justify-center gap-10'>
        <Link className='flex text-center gap-2' href={'https://github.com/chirayu-xx/'} target='_blank'>
        <BsGithub/>
        chirayu_xx
        </Link>
        <Link className='flex text-center gap-2' href={'https://github.com/renesh22'} target='_blank'>
        <BsGithub/>
        renesh22
        </Link>
      </div>
    </div>
  )
}

export default Footer