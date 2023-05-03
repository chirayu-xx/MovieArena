import React from 'react'

type Props = {}

const Skeleton = (props: Props) => {
  return (
    
          <div
            role="status"
            className="max-w-sm p-4 rounded shadow animate-pulse md:p-6 "
          >
            <div className="flex items-center justify-center h-48 md:h-52 mb-4 bg-[#0a2955] rounded dark:bg-[#0a2955]"></div>
    
            <div className="flex items-center mt-4 space-x-3">
              <div>
                <div className="h-2.5 bg-[#0a2955] rounded-full dark:bg-[#0a2955] w-40 mb-2"></div>
                <div className="w-24 h-2 bg-[#0a2955] rounded-full dark:bg-[#0a2955]"></div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
  )
}

export default Skeleton