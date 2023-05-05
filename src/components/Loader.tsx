import React from 'react'
import { Triangle } from "react-loader-spinner";

type Props = {}

function Loader({}: Props) {
  return (
          <div className="flex w-full items-center justify-center">
            <Triangle
              height="100"
              width="100"
              color="#3A6130"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </div>
  )
}

export default Loader