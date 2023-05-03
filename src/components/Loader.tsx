import React from 'react'
import { Triangle } from "react-loader-spinner";

type Props = {}

function Loader({}: Props) {
  return (
          <div className="flex w-full items-center justify-center">
            <Triangle
              height="100"
              width="100"
              color="#2D75DA"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
  )
}

export default Loader