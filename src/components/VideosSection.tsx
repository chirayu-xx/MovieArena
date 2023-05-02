import React, { useState } from "react";
import { Img } from "./LazyLoadImage";
import Playbtn from "./Playbtn";
import VideoPopup from "./VideoPopup";
import { BsPlay } from "react-icons/bs";

type Props = {
  data: any;
  loading: Boolean;
};

const VideosSection = ({ data, loading }: Props) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // skeleton

  return (
    <div className="mb-[50px] relative">
      {/* contentwrapper */}
      <div className="flex flex-col gap-5 lg:gap-10 px-5 p-2 lg:px-20 lg:p-10">
        <div className="text-xl lg:text-2xl text-white mb-[25px] md:text-2xl">Official Videos</div>
        {!loading ? (
          <div className="flex flex-nowrap gap-10 overflow-x-auto md:gap-20 m-0 p-0">
            {data?.results?.map((video: any) => (
              <div
                key={video.id}
                className="w-full md:w-[320px] shrink-0 cursor-pointer"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="">
                  <Img className="w-full block rounded-xl"
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                </div>
                <div className="text-xl md:text-base text-white">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          // skeleton
          <div className="">
            
          </div>
        )}
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
