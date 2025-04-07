import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import "../style/Video.css";
import videoFile from "../assets/video.mp4";

export default function Video() {
  const videoRef = useRef(null);
  const mainVideoSectionRef = useRef(null);
  const videoCursorRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const overlayRef = useRef(null);
  const videoContRef = useRef(null);

  useGSAP(() => {}, []);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
    
  //   // Initial setup - scale down the container only
  //   gsap.set(videoContRef.current, {
  //     scale: 0.7,
  //     transformOrigin: "center center"
  //   });

  //   // Scale up the container on scroll
  //   gsap.to(videoContRef.current, {
  //     scale: 1,
  //     scrollTrigger: {
  //       trigger: videoContRef.current,
  //       start: "top 100%",
  //       end: "center center",
  //       scrub: true,
  //       // markers: true, // Remove this in production
  //     },
  //   });

  //   // Scale the video to match
  //   gsap.set(videoRef.current, {
  //     scale: 1.5,
  //     transformOrigin: "center center"
  //   });

  //   gsap.to(videoRef.current, {
  //     scale: 1,
  //     scrollTrigger: {
  //       trigger: videoContRef.current,
  //       start: "top 100%",
  //       end: "bottom center",
  //       scrub: true,
  //     },
  //   });
  // }, []);

  // const handleMouseEnter = () => {
  //   gsap.to(videoCursorRef.current, {
  //     opacity: 1,
  //     duration: 0.4,
  //     scale: 1,
  //     ease: "power3.inOut",
  //   });
  // };

  // const handleMouseLeave = () => {
  //   gsap.to(videoCursorRef.current, {
  //     opacity: 0,
  //     duration: 0.4,
  //     scale: 0.2,
  //     ease: "power3.inOut",
  //   });
  // };

  // const handleMouseMove = (event) => {
  //   console.log(event);
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;

  //   gsap.to(videoCursorRef.current, {
  //     left: x,
  //     top: y,
  //     duration: 0.1,
  //     ease: "power3.out",
  //   });
  // };

  // const handleVideoClick = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //     if (isCursorVisible) {
  //       setIsCursorVisible(false);
  //     } else {
  //       setIsCursorVisible(true);
  //     }
  //   }
  // };

  return (
    <>
      <div className="main_video_section" ref={mainVideoSectionRef}>
        <div className="vid_cont_v" ref={videoContRef}>
          <video ref={videoRef} className="video_main" autoPlay muted loop>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            ref={overlayRef}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            // onMouseMove={handleMouseMove}
            className="overlay"
            // onClick={handleVideoClick}
            role="button"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div className="video_cursor" ref={videoCursorRef}>
              <div
                className={`cursor-icon ${
                  isPlaying ? "pause-icon" : "play-icon"
                }`}
              ></div>
              <span className="cursor-text">
                {isPlaying ? "PAUSE" : "PLAY"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
