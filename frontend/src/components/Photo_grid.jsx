import "../style/Photo_grid.css";
import punjabi_img from "../assets/lf_pnb.png";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";


export default function PhotoGrid() {
  const [images, setImages] = useState([
    { gridColumn: 1, gridRow: 1 },
    { gridColumn: 4, gridRow: 1 },
    { gridColumn: 5, gridRow: 2 },
    { gridColumn: 8, gridRow: 2 },
    { gridColumn: 3, gridRow: 3 },
    { gridColumn: 7, gridRow: 4 },
    { gridColumn: 8, gridRow: 5 },
    { gridColumn: 3, gridRow: 7 },
    { gridColumn: 7, gridRow: 7 },
    { gridColumn: 4, gridRow: 8 },
    { gridColumn: 6, gridRow: 9 },
    { gridColumn: 1, gridRow: 9 },
    { gridColumn: 7, gridRow: 10 },
    { gridColumn: 2, gridRow: 5 },
    { gridColumn: 4, gridRow: 6 },
  ]);
  
  const gridRefs = useRef([]);
  const headingRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        duration: 1,
        start: 'top 90%', // Start when the top of the heading is at 80% of the viewport height
        end: 'top 20%', // End when the top of the heading is at 30% of the viewport height
        scrub: true, // Smoothly animate the opacity as you scroll
        // markers: true,
      }
    });

    tl.fromTo(headingRef.current, 
      { opacity: 0 ,y : 100}, // Start with opacity 0
      { opacity: 1 ,y : 0} // End with opacity 1
    );
  }, []);


  useEffect(() => {
    // Fetch images only once when the component mounts
    const fetchImages = async () => {
      try {
        const response = await fetch("https://pixabay.com/api/?key=48654357-75bc02f46848fa20ad0279aa8&q=women+beauty+photography&image_type=photo&per_page=15");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the src for each image
        allImages(data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
        if (error.message.includes("Rate Limit Exceeded")) {
          console.error("You have exceeded the rate limit for the Pixabay API. Please try again later.");
        }
      }
    };
    fetchImages();

    const allImages = (data) => {
      setImages(prevImages => {
        return prevImages.map((img, index) => {
          if (index < data.hits.length) {
            return { ...img, src: data.hits[index].largeImageURL };
          }
          return img;
        });
      });
    };

    const tl = gsap.timeline();

    gridRefs.current.forEach(({ item, image }, index) => {
      // Use the index + 1 as a seed to compute a pseudo-random but consistent value
      const seed = index + 1;
      // Calculate a fractional value between 0 and 1 based on sine.
      const r = Math.sin(seed) * 10000;
      const fixedFrac = r - Math.floor(r);
      // Map the fraction to a value between -100 and 100
      const xTransform = fixedFrac * 200 - 100;

      tl.set(image, {
        transformOrigin: `${xTransform < 0 ? 0 : '100%'}`,
      })
      .to(item, {
        scale: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
      .to(item, {
        xPercent: xTransform,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <>
      <div className="photo-grid--wrapper">
        <div ref={headingRef} className="fixed-title">
          <h1>lens fillers.</h1>
          <div className="outer_punjabi_img">
            <img src={punjabi_img} alt="" />
          </div>
        </div>
        <section className="main_photo_grid">
          {images.map((img, index) => {
            const ref = (el) => {
              if (el) {
                gridRefs.current[index] = {
                  item: el,
                  image: el.firstChild, // Directly access the image element
                };
              }
            };

            return (
              <div
                key={index}
                className="grid-elem grid_row"
                style={{ gridColumn: img.gridColumn, gridRow: img.gridRow }}
                ref={ref} // Store reference to both grid element and image
              >
                <img src={img.src} alt="" loading="lazy" />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
