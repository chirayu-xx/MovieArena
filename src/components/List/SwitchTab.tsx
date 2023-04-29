'use client'

import React from 'react'
import {useState} from 'react'
type Props = {
    tabs: Array<string>;
    onTabChange: any
}

function SwitchTab({tabs, onTabChange}: Props) {
    const [selectedTab, setSelectedTab] = useState(0)

    const [left, setLeft] = useState(0)
    const activeTab = (tab:string, index: number) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab,index)
    }
  return (
    <div className='h-8  md:h-12 bg-white rounded-xl p-1'>
        <div className='flex items-center relative h-6 md:h-10'>
            {tabs.map((tab,index) =>(
                <span key={index}
                onClick={() => activeTab(tab,index)} 
                className={`h-full flex items-center justify-center w-[100px] text-black text-base relative z-10 cursor-pointer
                rounded-xl
                ${selectedTab === index? 'text-white bg-orange-500' : ''}`}>
                    {tab}
                </span>
            ))}
            <span className='h-12 w-[100px] rounded-xl absolute left-0' style={{left}}></span>
        </div>
    </div>
  )
}

export default SwitchTab