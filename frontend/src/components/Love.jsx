// import React from "react";
import "../style/Love.css";

const Love = () => {
  return (
    <section className="love-section_love" aria-labelledby="love-title_love">
      <div className="love-image_love">
        <img
          src="https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743515851/lensfiller/lensFillersImages/ddymkgttmeu5f0bol88i.jpg"
          alt="Bride in traditional attire"
        />
      </div>
      <div className="love-content_love">
        <div className="all_contenet_love">
          <div className="acl_h2">
            <h2 id="love-title">bridal bangle</h2>
            <h2 id="love-title_chime">chime</h2>
          </div>
          <p className="subtitle">
            wrapped in silent love, eyes glisten with destiny.
          </p>
          <a
            href="#"
            className="read-more"
            aria-label="Read more about our services"
          >
            READ MORE
            <span className="arrow_love">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Love;
