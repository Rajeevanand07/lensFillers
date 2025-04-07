import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPannel.css";

const EditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({
    couple: "",
    cardDescription: "",
    detailedDescription: "",
    coupleImage: "",
    landscapeImage: "",
    weddingImages: [],
    videoThumbnail: "",
    videoDescription: "",
    weddingVideoLink: "",
    date: "",
    venue: "",
  });
  const [coupleImageFile, setCoupleImageFile] = useState(null);
  const [landscapeImageFile, setLandscapeImageFile] = useState(null);
  const [weddingImagesFiles, setWeddingImagesFiles] = useState([]);
  const [videoThumbnailFile, setVideoThumbnailFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://lens-fillers.vercel.app/api/albums/${id}`
        );
        setAlbum(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album:", error);
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (album.couple) formData.append("couple", album.couple);
    if (album.cardDescription)
      formData.append("cardDescription", album.cardDescription);
    if (album.detailedDescription)
      formData.append("detailedDescription", album.detailedDescription);
    if (coupleImageFile) formData.append("coupleImage", coupleImageFile);
    if (landscapeImageFile)
      formData.append("landscapeImage", landscapeImageFile);
    weddingImagesFiles.forEach((file) => {
      formData.append("weddingImages", file);
    });
    if (videoThumbnailFile)
      formData.append("videoThumbnail", videoThumbnailFile);
    if (album.videoDescription)
      formData.append("videoDescription", album.videoDescription);
    if (album.weddingVideoLink)
      formData.append("weddingVideoLink", album.weddingVideoLink);
    if (album.date) formData.append("date", album.date);
    if (album.venue) formData.append("venue", album.venue);

    try {
      await axios.patch(`https://lens-fillers.vercel.app/api/albums/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Album updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating album:", error);
      alert(error.response?.data?.message || "Failed to update album");
    }
  };

  return (
    <div className="edit-album-container">
      <h2 className="edit-album-title">Edit Album</h2>
      <form onSubmit={handleUpdate} className="edit-form">
        <div className="form-group">
          <div className="form-field">
            <label>Couple Name:</label>
            <input
              type="text"
              value={album.couple}
              onChange={(e) => setAlbum({ ...album, couple: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label>Card Description:</label>
            <textarea
              value={album.cardDescription}
              onChange={(e) =>
                setAlbum({ ...album, cardDescription: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>Detailed Description:</label>
            <textarea
              value={album.detailedDescription}
              onChange={(e) =>
                setAlbum({ ...album, detailedDescription: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="form-field">
            <label>New Couple Image:</label>
            <input
              type="file"
              onChange={(e) => setCoupleImageFile(e.target.files[0])}
            />
          </div>
          <div className="form-field">
            <label>New Landscape Image:</label>
            <input
              type="file"
              onChange={(e) => setLandscapeImageFile(e.target.files[0])}
            />
          </div>
        </div>

        <label>New Wedding Images (Multiple Allowed):</label>
        <input
          type="file"
          multiple
          onChange={(e) => setWeddingImagesFiles([...e.target.files])}
        />
        <div className="form-field">
          <label>VideoThumbnail:</label>
          <input
            type="file"
            onChange={(e) => setVideoThumbnailFile(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <div className="form-field">
            <label>VideoDescription:</label>
            <textarea
              value={album.videoDescription}
              onChange={(e) =>
                setAlbum({ ...album, videoDescription: e.target.value })
              }
            ></textarea>
          </div>
          <div className="form-field">
            <label>Video Link:</label>
            <input
              type="text"
              value={album.weddingVideoLink}
              onChange={(e) =>
                setAlbum({ ...album, weddingVideoLink: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-field">
          <label>Date:</label>
          <input
            type="text"
            value={album.date}
            onChange={(e) => setAlbum({ ...album, date: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label>Venue:</label>
          <input
            type="text"
            value={album.venue}
            onChange={(e) => setAlbum({ ...album, venue: e.target.value })}
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Updating..." : "Update Album"}
        </button>
      </form>
    </div>
  );
};

export default EditAlbum;
