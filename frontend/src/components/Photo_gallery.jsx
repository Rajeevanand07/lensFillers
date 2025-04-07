import { useState } from "react";
import "../style/Photo_gallery.css";

import { IoCloseOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

// import pg_img_1 from "../assets/pg_img_1.avif";
// import pg_img_2 from "../assets/pg_img_2.avif";
// import pg_img_3 from "../assets/pg_img_3.avif";
// import pg_img_4 from "../assets/pg_img_4.avif";
// import pg_img_5 from "../assets/pg_img_5.avif";
// import pg_img_6 from "../assets/pg_img_6.avif";
// import pg_img_7 from "../assets/pg_img_7.avif";
// import pg_img_8 from "../assets/pg_img_8.avif";
// import pg_img_9 from "../assets/pg_img_9.avif";
// import pg_img_10 from "../assets/pg_img_10.avif";
// import pg_img_11 from "../assets/pg_img_11.avif";

const images = [
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743399/lensfiller/lensFillersImages/pg_img_1.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743401/lensfiller/lensFillersImages/pg_img_2.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743401/lensfiller/lensFillersImages/pg_img_3.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743401/lensfiller/lensFillersImages/pg_img_4.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743401/lensfiller/lensFillersImages/pg_img_5.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743401/lensfiller/lensFillersImages/pg_img_6.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743402/lensfiller/lensFillersImages/pg_img_7.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743402/lensfiller/lensFillersImages/pg_img_8.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743439/lensfiller/lensFillersImages/pg_img_9.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743439/lensfiller/lensFillersImages/pg_img_10.avif",
  "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743453/lensfiller/lensFillersImages/pg_img_11.avif",
];

export default function Photo_gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderImage = (src, index) => (
    <div className="g_i_cover" key={index}>
      <img src={src} onClick={() => handleImg(src, index)} alt="" />
    </div>
  );

  const handleImg = (src, index) => {
    setSelectedImage(src);
    setActiveIndex(index);
  }

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setActiveIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <section className="main_photo_gallery">
      {selectedImage && (
        <div
          className="for_display_image"
        >
          <button className="close_button" onClick={() => setSelectedImage(null)}><IoCloseOutline /></button>
          <button className="nav_button prev_button" onClick={() => handlePrev()} ><GrPrevious /></button>
          <div className="for_display_image_cover">
            <img src={selectedImage} alt="" />
          </div>    
          <button className="nav_button next_button" onClick={() => handleNext()} ><GrNext /></button>
        </div>
      )}
      <div className="cover_gallery">
        <div className="gallery_heading">
          <h5>
            our <a href="">wedding</a> story in frames
          </h5>
        </div>
        <div className="gallery_photos">
          <div className="photo_g_1_7">
            {[0, 1].map((i) => renderImage(images[i], i))}
          </div>
          <div className="photo_g_2_6">
            {[2, 3].map((i) => renderImage(images[i], i))}
          </div>
          <div className="photo_g_c">
            {[4].map((i) => renderImage(images[i], i))}
          </div>
          <div className="photo_g_c">
            {[5].map((i) => renderImage(images[i], i))}
          </div>
          <div className="photo_g_c">
            {[6].map((i) => renderImage(images[i], i))}
          </div>
          <div className="photo_g_2_6">
            {[7, 8].map((i) => renderImage(images[i], i))}
          </div>
          <div className="photo_g_1_7">
            {[9, 10].map((i) => renderImage(images[i], i))}
          </div>
        </div>
        <div className="pg_main_sentence">
            <h2>&quot;Bound by love, crowned by fate <br />—our royal journey begins.&quot;</h2>
        </div>
      </div>
    </section>
  );
}
