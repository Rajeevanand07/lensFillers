import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/photography_style/WeddingAlbums.css";
import AlbumCard from "./AlbumCard";

const WeddingAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("https://lens-fillers.vercel.app/api/albums");
        setAlbums(response.data.albums);
        console.log(response.data.albums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className="wedding-event-albums-container">
      <h1 className="wedding-title">Wedding Albums</h1>
      <div className="wedding-album-grid">
        {albums.map((album) => (
          <AlbumCard key={`wedding-${album._id}`} album={album} />
        ))}
      </div>
    </div>
  );
};

export default WeddingAlbums;
