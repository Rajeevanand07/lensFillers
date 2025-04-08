import main_video from "../../assets/film-assets/main_video.mp4";
import "../../style/film_style/VideoAlbums.css";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useEffect, useState } from "react";
export default function VideoAlbums() {
  const [videoAlbums, setVideoAlbums] = useState([]);

  useEffect(() => {
    const fetchVideoAlbums = async () => {
      try {
        const response = await axios.get("https://lensfillers.onrender.com/api/albums");
        setVideoAlbums(response.data);
        console.log(response.data);
        console.log(response.data.albums);
        
      } catch (error) {
        console.error("Error fetching video albums:", error);
      }
    };
    fetchVideoAlbums();
  }, []);
  return (
    <section className="video_albums_section">
      <div className="video_albums_container">
        <div className="main_video_outer">
          <video className="video_main_top" autoPlay muted loop>
            <source src={main_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video_quote">
          <h1>forever</h1>
          <h1>starts</h1>
          <h1>here</h1>
        </div>
        <div className="video_sec_lower">
          <div className="video_sec_inner_lower">
          <div className="all_vid_heading">
            <h1>Forever in motion :</h1>
          </div>
          <div className="videos_section">
            {videoAlbums.map((video) => (
              <VideoCard key={`video-${video._id}`} video={video} />
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
