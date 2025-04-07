import React from 'react'
import "../../style/film_style/VideoCard.css"
import { IoPlaySharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  return (
    <div className="main_video_card">
        <Link to={`/video/${video._id}`} className="video_outer_out">
            <div className="play_icon">
                <IoPlaySharp />
            </div>
            <img src={video.videoThumbnail} alt={video.couple} />
        </Link>
        <div className="video_couple_name">
            <h1>{video.couple}</h1>
        </div>
        <div className="v_description">
            <p>{video.videoDescription}</p>
        </div>
    </div>
  )
}
