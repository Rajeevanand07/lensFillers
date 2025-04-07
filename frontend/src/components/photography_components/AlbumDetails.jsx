import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../style/photography_style/AlbumDetails.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const galleryRef = useRef(null);
  const [popupImageIndex, setPopupImageIndex] = useState(null);

  // Fetch album data using the albumId
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/albums/${albumId}`
        );
        setAlbum(response.data);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };
    fetchAlbum();
  }, [albumId]);

  // Manage popup scroll behavior
  useEffect(() => {
    document.body.style.overflow = popupImageIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popupImageIndex]);

  const openPopup = (index) => setPopupImageIndex(index);
  const closePopup = () => setPopupImageIndex(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (popupImageIndex !== null) {
        if (event.key === "ArrowRight") nextImage();
        else if (event.key === "ArrowLeft") prevImage();
        else if (event.key === "Escape") closePopup();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [popupImageIndex]);

  const nextImage = () => {
    setPopupImageIndex(
      (prevIndex) => (prevIndex + 1) % album.weddingImages.length
    );
  };

  const prevImage = () => {
    setPopupImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + album.weddingImages.length) %
        album.weddingImages.length
    );
  };

  if (!album) {
    return <div className="not-found-albumDetail">Album not found!</div>;
  }

  return (
    <div className="album-wrapper-albumDetail">
      <div className="album-details-container-albumDetail">
        <h1 className="couple-name-albumDetail">{album.couple}</h1>
        <p className="wedding-memories-description">{album.description}</p>
        <p className="wedding-detail-description">
          {album.detailedDescription}
        </p>
        <div className="hero-section-albumDetail">
          <img
            src={album.landscapeImage}
            alt={album.couple}
            className="hero-image-albumDetail"
          />
        </div>

        <div className="album-gallery-albumDetail">
          <div className="gallery-container-albumDetail" ref={galleryRef}>
            <div className="gallery-column">
              {album.weddingImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Gallery Image"
                  className="gallery-image-albumDetail"
                  onClick={() => openPopup(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {popupImageIndex !== null && (
        <div className="image-popup-albumDetail" onClick={closePopup}>
          <div>
            <button className="prev-btn-albumDetail" onClick={prevImage}>
              <FaArrowLeft size={24} />
            </button>
            <div
              className="popup-content-albumDetail"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={album.weddingImages[popupImageIndex]}
                alt="Enlarged"
                className="popup-image-albumDetail"
              />
            </div>
            <button className="next-btn-albumDetail" onClick={nextImage}>
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;
