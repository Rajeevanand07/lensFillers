import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // SEO Enhancement
import blogData from "./BlogData";
import "../../style/blog_style/BlogDetail.css";
import { format } from "date-fns";
import SideBar from "./SideBar";

const BlogDetail = () => {
  const { id } = useParams();
  const currentIndex = blogData.findIndex((post) => post.id === parseInt(id));

  if (currentIndex === -1) {
    return <h2>Blog post not found</h2>;
  }

  const blogPost = blogData[currentIndex];
  const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isVertical, setIsVertical] = useState(false);

  // Image aspect ratio detection
  useEffect(() => {
    const img = new Image();
    img.src = blogPost.image;
    img.onload = () => {
      setIsVertical(img.height > img.width);
    };
  }, [blogPost.image]);

  // Comment Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim() || !email.trim()) {
      alert("Please fill in required fields.");
      return;
    }

    const newComment = { name, email, website, comment };
    setComments([...comments, newComment]);

    setComment("");
    setName("");
    setEmail("");
    setWebsite("");
  };

  // Structured Data for SEO (Google Rich Results)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "image": blogPost.image,
    "datePublished": blogPost.date,
    "author": {
      "@type": "Person",
      "name": "XYZ",
    },
    "publisher": {
      "@type": "Organization",
      "name": "lensfillers",
    },
  };

  return (
    <div className="blog-detail-container">
      {/* SEO Meta Tags */}
      <HelmetProvider>
  <title>{blogPost.title} | lensfillers</title>
  <meta name="description" content={blogPost.description || blogPost.content.substring(0, 150) + "..."} />
  <meta name="keywords" content={blogPost.tags?.join(", ")} />

  {/* Open Graph for social sharing */}
  <meta property="og:title" content={blogPost.title} />
  <meta property="og:description" content={blogPost.description || blogPost.content.substring(0, 150) + "..."} />
  <meta property="og:image" content={blogPost.image} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`${window.location.origin}/blog/${blogPost.id}`} />

  {/* Canonical Tag for SEO */}
  <link rel="canonical" href={`${window.location.origin}/blog/${blogPost.id}`} />

  {/* Structured Data for Google Rich Snippets */}
  <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
</HelmetProvider>



      <SideBar tags={blogPost.tags} />

      {/* Blog Content */}
      <article className="blog-content">
        <p className="date">{blogPost.date}</p>
        <h1>{blogPost.title}</h1>

        {/* Blog Image with Lazy Loading */}
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="blog-image"
          style={isVertical ? { objectPosition: "40% 20%" } : {}}
          loading="lazy"
        />

        <div className="content" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

        {/* Additional Images */}
        {blogPost.additionalImages?.length > 0 && (
          <section className="additional-images">
            <div className="image-gallery">
              {blogPost.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional ${index + 1}`}
                  loading="lazy"
                  className="additional-img"
                />
              ))}
            </div>
          </section>
        )}

        {/* Blog Navigation */}
        <nav className="blog-navigation">
          {prevPost && (
            <Link to={`/blog/${prevPost.id}`} className="nav-arrow prev">
              <span className="arrow">&larr;</span> Prev
            </Link>
          )}
          {nextPost && (
            <Link to={`/blog/${nextPost.id}`} className="nav-arrow next">
              Next <span className="arrow">&rarr;</span>
            </Link>
          )}
        </nav>

        {/* Comments Section */}
        <section className="comment-list">
          <h2>Comments</h2>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((cmt, index) => (
              <div key={index} className={`comment-item ${index % 2 === 0 ? "comment-left" : "comment-right"}`}>
                <div className="comment-content">
                  <strong>{cmt.name}</strong>
                  <span className="comment-date">{format(new Date(), "MMMM d, yyyy")}</span>
                  <p className={`comment-text ${index % 2 === 0 ? "comment-left" : "comment-right"}`}>{cmt.comment}</p>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Comment Form */}
        <section className="comment-section">
          <h2>Post a Comment</h2>
          <form onSubmit={handleSubmit} className="comment-form">
            <label>Your Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />

            <div className="comment-inputs">
              <input type="text" value={name} placeholder="Your Name" onChange={(e) => setName(e.target.value)} required />
              <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="comment-checkbox">
              <input type="checkbox" id="save-info" />
              <label htmlFor="save-info">Save my info for next time.</label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>
      </article>
    </div>
  );
};

export default BlogDetail;