//@ts-nocheck
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

type Props = {
  rating: number
}

const CircleRating = ({rating}: Props) => {
  return (
    <div className="bg-black rounded-full p-1">
            <CircularProgressbar value={rating} maxValue={10} text={`${rating}`} 
            className='text-center fill-black-light'
            styles={buildStyles({
              rotation: 0.25,
              pathColor:
                  rating < 5 ? "red" : rating < 7 ? "orange" : "green",
              textSize:'25px',
              pathTransitionDuration: 1,
              textColor:rating < 5 ? "red" : rating < 7 ? "orange" : "#3A6130",
          })}
            />
        </div>
  )
}

export default CircleRating