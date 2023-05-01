import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
    show: boolean,
    setShow: (open: boolean) => void,
    videoId: string,
    setVideoId: (open: string) => void,
}

const VideoPopup = ({show, setShow, videoId, setVideoId}: Props) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId("");
    };

  return (
    <div className={`flex justify-center items-center w-full h-full fixed top-0 left-0 opacity-0 invisible z-10 ${show ? "opacity-100" : "hidden"} transition-all duration-300 before:scale-0 after:scale-100`}>
        <div className={`absolute top-0 left-0 w-full h-full bg-opacity-25 backdrop-filter backdrop-blur-md -webkit-backdrop-filter opacity-0 ${show && "opacity-100"} transition-opacity duration-[400ms]`}
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
                // playing={true}
            />
        </div>
    </div>
  )
}

export default VideoPopup