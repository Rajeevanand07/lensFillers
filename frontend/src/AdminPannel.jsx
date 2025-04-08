import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./AdminPannel.css";

const AdminPanel = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef([]);

  const fetchAlbums = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get("https://lensfillers.onrender.com/api/albums");
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id) => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      try {
        const response = await axios.delete(
          `https://lensfillers.onrender.com/api/albums/${id}`
        );
        alert(response.data.message);
        setAlbums((prev) => prev.filter((album) => album._id !== id));
        setMenuOpen(null); // Close menu after deletion
      } catch (error) {
        console.error("Error deleting album:", error);
        alert(error.response?.data?.message || "Failed to delete album");
      }
    }
  };

  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleClickOutside = (e) => {
    if (
      menuOpen !== null &&
      menuRef.current[menuOpen] &&
      !menuRef.current[menuOpen].contains(e.target)
    ) {
      setMenuOpen(null);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://lensfillers.onrender.com/api/auth/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully');
      localStorage.removeItem('token');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  useEffect(() => {
    // Check for token in localStorage on component mount
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch albums after verifying token
    fetchAlbums();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) return <p>Loading albums...</p>;

  return (
    <div className="admin-panel">
      <div className="header">
        <h2>Admin Panel - Manage Albums</h2>
        <div className="header-buttons">
          <button className="upload-btn" onClick={() => navigate("/upload")}>
            <span>Upload</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="album-grid-a">
        {albums.length === 0 ? (
          <p>No albums found</p>
        ) : (
         albums && albums?.map((album, index) => (
            <div key={album._id} className="album-card_container-a">
              <div className="album-card-frame">
                <img
                  src={album.coupleImage}
                  alt={album.couple}
                  className="album-card-image"
                  onClick={() => navigate(`/album/${album._id}`)}
                />
                <div
                  className="menu-container"
                  ref={(el) => (menuRef.current[index] = el)}
                >
                  <button
                    className="menu-button"
                    onClick={() => handleMenuToggle(index)}
                  >
                    ⋮
                  </button>
                  {menuOpen === index && (
                    <div className="menu-dropdown">
                      <button
                        onClick={() => {
                          navigate(`/edit/${album._id}`);
                          setMenuOpen(null); // Close menu after navigation
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteAlbum(album._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="album-card-info">
                <h3 className="album-card-couple">{album.couple}</h3>
                <p className="album-card-description">
                  {album.cardDescription}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
