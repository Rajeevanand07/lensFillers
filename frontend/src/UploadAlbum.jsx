import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadAlbum.css";

const UploadAlbum = () => {
  const navigate = useNavigate();

  const [couple, setCouple] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [coupleImage, setCoupleImage] = useState(null);
  const [landscapeImage, setLandscapeImage] = useState(null);
  const [weddingImages, setWeddingImages] = useState([]);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [videoDescription, setVideoDescription] = useState("");
  const [weddingVideoLink, setWeddingVideoLink] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coupleImage || !landscapeImage || weddingImages.length === 0) {
      alert("Please upload all required images.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("couple", couple);
    formData.append("cardDescription", cardDescription);
    formData.append("detailedDescription", detailedDescription);
    formData.append("coupleImage", coupleImage);
    formData.append("landscapeImage", landscapeImage);
    weddingImages.forEach((image) => formData.append("weddingImages", image));
    formData.append("videoThumbnail", videoThumbnail);
    formData.append("videoDescription", videoDescription);
    formData.append("weddingVideoLink", weddingVideoLink);
    formData.append("date", date);
    formData.append("venue", venue);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/albums",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      alert(response.data.message);

      setCouple("");
      setCardDescription("");
      setDetailedDescription("");
      setCoupleImage(null);
      setLandscapeImage(null);
      setWeddingImages([]);
      setVideoThumbnail(null);
      setVideoDescription("");
      setWeddingVideoLink("");
      setDate("");
      setVenue("");
      e.target.reset();
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-album-container">
      <h2 className="upload-album-heading">Upload Album</h2>
      <form onSubmit={handleSubmit} className="upload-album-form">
        <div className="form-group">
          <label className="form-label">Couple's Name:</label>
          <input
            type="text"
            placeholder="Enter couple's name"
            value={couple}
            onChange={(e) => setCouple(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Card Description:</label>
          <textarea
            placeholder="Enter card description"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Detailed Description:</label>
          <textarea
            placeholder="Enter detailed description"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Couple's Image (Card Display):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoupleImage(e.target.files[0])}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Landscape Image (Album Top Display):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLandscapeImage(e.target.files[0])}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Wedding Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setWeddingImages(Array.from(e.target.files))}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Video Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setVideoThumbnail(e.target.files[0])}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Video Description:</label>
          <input
            type="text"
            placeholder="Enter video description"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Video Link:</label>
          <input
            type="text"
            placeholder="Enter video link"
            value={weddingVideoLink}
            onChange={(e) => setWeddingVideoLink(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date:</label>
          <input
            type="date"
            placeholder="Enter date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Venue:</label>
          <input
            type="text"
            placeholder="Enter venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Uploading..." : "Upload Album"}
        </button>
      </form>
    </div>
  );
};

export default UploadAlbum;
