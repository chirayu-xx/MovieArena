import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
    show: Boolean,
    setShow: (open: Boolean) => void,
    videoId: string,
    setVideoId: (open: string) => void,
}

const VideoPopup = ({show, setShow, videoId, setVideoId}: Props) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId("");
    };

  return (
    <div className={`flex ${show ? 'opacity-100' : 'hidden'} justify-center backdrop-blur-lg items-center fixed top-1/4 left-1/4 z-50 `}>
        <div className={`absolute top-0 left-0 backdrop-blur-xl w-full h-full`}
 onClick={hidePopup}></div>
        <div className='relative w-[800px] aspect-video bg-white transform scale-20 transition-transform duration-[250ms]'>
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