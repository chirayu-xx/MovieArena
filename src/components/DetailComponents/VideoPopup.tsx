import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
    show: boolean,
    setShow: (open: boolean) => void,
    videoId: any,
    setVideoId: any
}

const VideoPopup = ({show, setShow, videoId, setVideoId}: Props) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId("");
    };

  return (
    <div className={`flex ${show ? 'opacity-100 scale-100' : ' scale-0'} justify-center transition-all ease-out duration-3x 00  w-full h-full backdrop-blur-lg items-center fixed top-0 left-0 z-50 `}>
        <div className={`absolute z-20 top-0 left-0 backdrop-blur-xl w-full h-full`}
 onClick={hidePopup}></div>
        <div className='relative w-full sm:w-[640px] md:w-[800px] aspect-w-16 aspect-video bg-white transform scale-20 transition-transform z-30  duration-250'>
            <span className='absolute right-0 text-white cursor-pointer top-[-20px]' onClick={hidePopup}>
                Close
            </span>
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="100%"
                height="100%"
                playing={true}
            />
        </div>
    </div>
  )
}

export default VideoPopup