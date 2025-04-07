import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/blog_style/Sidebar.css";
import authorImg from "../../assets/blog-assets/author.png";
import newsletterImg from "../../assets/blog-assets/h3.jpg";
import blogData from "./BlogData";

const SideBar = ({ tags = [] }) => {
  const navigate = useNavigate();

  // Get the three most recent posts
  const latestPosts = [...blogData].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <aside className="sidebar">
      {/* About Author */}
      <div className="sidebar-section author">
        <img src={authorImg} alt="Author" className="author-img" />
        <h4>About Author</h4>
        <p>
          Welcome to the blog. This is where we share the latest weddings,
          engagement sessions, and planning tips. Enjoy browsing!
        </p>
      </div>

      {/* Latest Posts */}
      <div className="sidebar-section">
        <h3>Latest Posts</h3>
        {latestPosts.map((post) => (
          <div
            className="latest-post"
            key={post.id}
            onClick={() => navigate(`/blog/${post.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={post.image} alt={post.title} />
            <div className="latest-post-content">
              <p>{post.title}</p>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Follow Section */}
      <div className="sidebar-section">
        <h3>FOLLOW</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      {/* Tags Section */}
      <div className="sidebar-section tags-section">
        <h4>Tags:</h4>
        {tags.length > 0 ? (
          <div className="tags-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="no-tags">No tags available</p>
        )}
      </div>

      {/* Newsletter */}
      <div className="sidebar-section newsletter">
        <img src={newsletterImg} alt="Newsletter" />
        <p>Subscribe to our newsletter</p>
        <input type="email" placeholder="Your email..." />
        <button>Subscribe</button>
      </div>
    </aside>
  );
};

export default SideBar;