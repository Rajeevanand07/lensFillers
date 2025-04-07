import React, { useState, useEffect } from "react";
import "../../style/film_style/VideoDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function VideoDetail() {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/albums/${videoId}`
        );
        setVideo(response.data);
        console.log(response.data.weddingVideo);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [videoId]);
  return (
    <div className="main_video_detail">
      <div className="mv_couple_name">
        <h1>{video.couple}</h1>
      </div>
      <div className="couple_video_outer">
      <iframe
        width="560"
        height="100%"
        src={video.weddingVideoLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      </div>
      <div className="mv_couple_dets">
        <div className="mv_couple_dets_left">
          <h2>{video.couple}</h2>
          <h3>{video.date}</h3>
          <h3>{video.venue}</h3>
        </div>
        <div className="mv_couple_dets_right">
          <Link to={`/album/${video._id}`}>
            <button>view wedding</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
