import "../style/Slider.css";
import { useState, useEffect } from "react";


// Import images
// import img1 from "../assets/img1.webp";
// import img3 from "../assets/img2.webp";
// import img4 from "../assets/img3.webp";
// import img5 from "../assets/img4.webp";
// import img7 from "../assets/img5.webp";
// import img8 from "../assets/img7.webp";
// import img9 from "../assets/img9.webp";
import img10 from "../assets/couple.jpg";


// Static slides data
const SLIDES_DATA = [
  { img: img10, title: "Emotion" },
  { img: img10, title: "Colorful" },
  { img: img10, title: "Timeless" },
  { img: img10, title: "Expressive" },
  { img: img10, title: "Innovative" },
  { img: img10, title: "Creative" },
  { img: img10, title: "Artistic" },
];


export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      try {
        // Create all image elements at once
        const imagePromises = SLIDES_DATA.map((slide) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = slide.img;
            
            // Use both load and decode for better performance
            const handleLoad = async () => {
              if ("decode" in img) {
                try {
                  await img.decode();
                } catch (err) {
                  console.warn("Image decode failed:", err);
                }
              }
              resolve();
            };
            
            if (img.complete) {
              handleLoad();
            } else {
              img.onload = handleLoad;
            }
            
            img.onerror = () => {
              console.warn("Failed to load image:", slide.img);
              resolve();
            };
          });
        });

        await Promise.all(imagePromises);
        if (isMounted) setImagesLoaded(true);
      } catch (error) {
        console.error("Image preloading error:", error);
      }
    };

    // Start preloading immediately instead of using requestIdleCallback
    preloadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (index) => {
    if (imagesLoaded && !isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      // Reset transition lock after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match this with your CSS transition duration
    }
  };

  // ✅ Show loader until all images are loaded
  if (!imagesLoaded) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="silderMain">
      <section className="sliderSection">
        {SLIDES_DATA.map((slide, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className={`slider_img ${isActive ? "active" : ""}`}
              onClick={() => handleClick(index)}
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src={img10}
                alt={slide.title}
                loading="eager"
                decoding="async"
                draggable="false"
                style={{ willChange: "transform" }}
              />
              <h1 style={{
                 fontSize: "2.5rem",
                 color: "#ffffff",
                 position: "relative",
                 top: "-40%",
                 transform: "rotate(270deg)",
                 transition: "0.7s ease",
                 textTransform: "uppercase",
              }}>{slide.title}</h1>
              <div className="details">
                <h2>{slide.title}</h2>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}