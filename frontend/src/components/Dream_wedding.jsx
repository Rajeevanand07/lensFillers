import "../style/Dream_wedding.css";
import img_dw from "../assets/wedding.png";
import img_a from "../assets/ampersand.png";

import dw1_1 from "../assets/dw1_1.webp";
import dw1_2 from "../assets/dw1_2.avif";
import dw1_3 from "../assets/dw1_3.avif";

import dw2_1 from "../assets/dw2_1.avif";
import dw2_2 from "../assets/dw2_2.avif";
import dw2_3 from "../assets/dw2_3.avif";

import dw3_1 from "../assets/dw3_1.avif";
import dw3_2 from "../assets/dw3_2.avif";
import dw3_3 from "../assets/dw3_3.avif";

import dw4_1 from "../assets/dw4_1.avif";
import dw4_2 from "../assets/dw4_2.avif";
import dw4_3 from "../assets/dw4_3.avif";

import { gsap } from "gsap/gsap-core";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

export default function Dream_wedding() {
  const img_1Ref = useRef(null);
  const img_2Ref = useRef(null);
  const img_3Ref = useRef(null);
  const img_4Ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // Build an array of refs for easier access
  const imageRefs = [img_1Ref, img_2Ref, img_3Ref, img_4Ref];

  useGSAP(() => {
    // When the component loads, show the first image group and hide the others
    gsap.set(img_1Ref.current.children, { opacity: 1, y: 0 });
    gsap.set(img_2Ref.current.children, { opacity: 0, y: 0 });
    gsap.set(img_3Ref.current.children, { opacity: 0, y: 0 });
    gsap.set(img_4Ref.current.children, { opacity: 0, y: 0 });
  });

  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      // Animate out the previously active images
      const prevImages = imageRefs[activeIndex - 1].current.children;
      gsap.set(prevImages, { opacity: 1, y: 0 });
      gsap.to(prevImages, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
      });
      // Animate in the new images
      const newImages = imageRefs[index - 1].current.children;
      gsap.set(newImages, { opacity: 1, y: 0 });
      gsap.from(newImages, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="dream_wedding">
      <div className="wedding_wrapper">
        <div className="list_names_container_dw">
          <div className="wedding_heading">
            <h5>Dream</h5>
            <div className="img_cont_dw">
              <img src={img_dw} alt="" />
            </div>
          </div>
          <div className="list_names_dw">
            <div
              onMouseEnter={() => handleMouseEnter(1)}
              className={`names_dw ${activeIndex === 1 ? "active_name" : ""}`}
            >
              <h2>Satvik</h2>
              <span>
                <img src={img_a} alt="" />
              </span>
              <h2>Sanya</h2>
            </div>
            <div
              onMouseEnter={() => handleMouseEnter(2)}
              className={`names_dw ${activeIndex === 2 ? "active_name" : ""}`}
            >
              <h2>amit</h2>
              <span>
                <img src={img_a} alt="" />
              </span>
              <h2>palak</h2>
            </div>
            <div
              onMouseEnter={() => handleMouseEnter(3)}
              className={`names_dw ${activeIndex === 3 ? "active_name" : ""}`}
            >
              <h2>sujal</h2>
              <span>
                <img src={img_a} alt="" />
              </span>
              <h2>megha</h2>
            </div>  
            <div
              onMouseEnter={() => handleMouseEnter(4)}
              className={`names_dw ${activeIndex === 4 ? "active_name" : ""}`}
            >
              <h2>arsh</h2>
              <span>
                <img src={img_a} alt="" />
              </span>
              <h2>jasmeen</h2>
            </div>
          </div>
        </div>
        <div className="list_images_container_dw">
          <div ref={img_1Ref} className="images_dw list_images_dw_1">
            <div className="list_image_wrapper_odd_1">
              <img src={dw1_1} alt="" />
            </div>
            <div className="list_image_wrapper_odd_2">
              <img src={dw1_2} alt="" />
            </div>
            <div className="list_image_wrapper_odd_3">
              <img src={dw1_3} alt="" />
            </div>
          </div>
          <div ref={img_2Ref} className="images_dw list_images_dw_2">
            <div className="list_image_wrapper_even_1">
              <img src={dw2_1} alt="" />
            </div>
            <div className="list_image_wrapper_even_2">
              <img src={dw2_2} alt="" />
            </div>
            <div className="list_image_wrapper_even_3">
              <img src={dw2_3} alt="" />
            </div>
          </div>
          <div ref={img_3Ref} className="images_dw list_images_dw_3">
            <div className="list_image_wrapper_odd_1">
              <img src={dw3_1} alt="" />
            </div>
            <div className="list_image_wrapper_odd_2">
              <img src={dw3_2} alt="" />
            </div>
            <div className="list_image_wrapper_odd_3">
              <img src={dw3_3} alt="" />
            </div>
          </div>
          <div ref={img_4Ref} className="images_dw list_images_dw_4">
            <div className="list_image_wrapper_even_1">
              <img src={dw4_1} alt="" />
            </div>
            <div className="list_image_wrapper_even_2">
              <img src={dw4_2} alt="" />
            </div>
            <div className="list_image_wrapper_even_3">
              <img src={dw4_3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
