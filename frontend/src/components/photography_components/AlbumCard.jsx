import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../style/photography_style/AlbumCard.css";

const AlbumCard = React.memo(({ album }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageURL, setImageURL] = useState(album.coupleImage);
  const ref = useRef(null);

  useEffect(() => {
    console.log("Image URL:", album.coupleImage);
    setImageURL(album.coupleImage);
  }, [album.coupleImage]);

  const handleError = (event) => {
    console.error("Image load error:", event);
    setError(true);
    setLoading(false);
  };

  const handleLoad = (event) => {
    console.log("Image loaded successfully:", event);
    setLoading(false);
  };

  return (
    <motion.div ref={ref} className="album-card-container">
      <Link to={`/album/${album._id}`} className="album-card-link">
        <div className="album-card-frame">
          {error ? (
            <div className="error-message">Image failed to load</div>
          ) : (
            <img
              src={imageURL}
              alt={album.couple}
              className="album-card-image"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
        <div className="album-card-info">
          <h2 className="album-card-couple">{album.couple}</h2>
          <p className="album-card-description">{album.cardDescription}</p>
        </div>
      </Link>
    </motion.div>
  );
});

AlbumCard.propTypes = {
  album: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    couple: PropTypes.string.isRequired,
    coupleImage: PropTypes.string.isRequired,
    cardDescription: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
