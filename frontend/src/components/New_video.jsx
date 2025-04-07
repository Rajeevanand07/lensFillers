import { useRef } from "react";
import "../style/New_video.css";
import ampersand from "../assets/ampersand.png";

export default function Video() {
  const videoRef = useRef(null);
  const mainVideoSectionRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <>
      <div className="main_video_section" ref={mainVideoSectionRef}>
        <div className="cinema_heading">
            <h2>cinema<span><img src={ampersand} alt="" /></span> rituals</h2>
        </div>
        <div ref={videoRef} className="vid_cont_v">
          <video className="video_main" autoPlay muted loop>
            <source src="https://res.cloudinary.com/dmkjbp3cm/video/upload/v1743744005/lensfiller/lensFillersImages/videoFile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div ref={contentRef} className="cinema_description">
            <p>the art of <span>story telling</span> and its timeless <span>rituals</span>.</p>
            <span className="nv_span">view films</span>
        </div>
      </div>
    </>
  );
}
