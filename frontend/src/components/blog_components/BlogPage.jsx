import React, { useEffect, useState } from "react";
import blog_main_img from "../../assets/blog-assets/h2.webp"
import { Link } from "react-router-dom";
import "../../style/blog_style/BlogPage.css";
import Lenis from "@studio-freight/lenis";
import BlogData from "./BlogData"; 
import { HelmetProvider } from "react-helmet-async";

const POSTS_PER_PAGE = 9;

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(BlogData.length / POSTS_PER_PAGE);

  const currentBlogs = BlogData.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <>
      <HelmetProvider>
        <title>Wedding Photography Blogs | Tips & Inspiration</title>
        <meta name="description" content="Explore wedding photography tips, trends, and inspiration." />
        <meta property="og:title" content="Wedding Photography Blogs | Tips & Inspiration" />
        <meta property="og:image" content={BlogData[0]?.image} />
        <meta property="og:url" content="https://lensfillers.com/blogs" />
      </HelmetProvider>

      <div className="topBlogSection">
        <div className="tb_img_outer">
          <img src={blog_main_img} alt="" />
          <div className="tb_content">
            <h1>Blog</h1>
            <h4>Secrets to perfect vows</h4>
          </div>
        </div>
      </div>
      
      <div className="blogImages">
        {currentBlogs.map((item) => (
          <div className="blog-item" key={item.id}>
            <picture>
              <source srcSet={item.image} type="image/webp" />
              <img
                src={item.image}
                alt={item.title || "Blog Image"}
                loading="lazy"
                style={{ width: "90%" }}
              />
            </picture>

            <Link to={`/blog/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h3 className="image-title">{item.title}</h3>
            </Link>

            <p className="image-excerpt">{item.excerpt}</p>

            <Link to={`/blog/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>              Read More
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="blog_pagination">
        {currentPage > 1 && (
          <button className="arrow-button" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            ←
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className="arrow-button" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
            →
          </button>
        )}
      </div>

    </>
  );
};

export default BlogPage;