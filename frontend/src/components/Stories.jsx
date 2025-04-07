// import React from 'react'
import "../style/Stories.css";
import im1 from "../assets/im1.jpg";
import im2 from "../assets/im2.jpg";
import im3 from "../assets/im3.jpg";
import im4 from "../assets/im4.jpg";
import love from "../assets/love.png";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Stories() {
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);

  const s_containerRef1 = useRef(null);
  const s_containerRef2 = useRef(null);
  const s_containerRef3 = useRef(null);
  const s_containerRef4 = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const imageRefsArray = [imageRef1, imageRef2, imageRef3, imageRef4];
    
    // Set initial opacity to 0 for all images
    imageRefsArray.forEach(ref => {
      gsap.set(ref.current, { opacity: 0 });
    });

    imageRefsArray.forEach((ref) => {
      ScrollTrigger.create({
        trigger: ref.current, // Trigger animation when this element comes into view
        start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
        once: true, // Animation will only happen once
        onEnter: () => {
          gsap.fromTo(ref.current,{
            width: "60%",
            opacity: 0,

          }, {
            width: "100%",
            opacity: 1, // Fade in to full opacity
            duration: 0.7,
            ease: "power2.inOut"
          });
        }
      });
    });

    // Cleanup function to kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseEnter = (index) => {
    gsap.to(s_containerRefs[index].current, {
      scale: 0.97,
      duration: 0.7,
      ease: "power2.inOut"
    });
    gsap.to(imageRefs[index].current, {
      scale: 1.1,
      duration: 0.7,
      ease: "power2.inOut"
    });
  }

  const handleMouseLeave = (index) => {
    gsap.to(s_containerRefs[index].current, {
      scale: 1,
      duration: 0.7,
      ease: "power2.inOut"
    });
    gsap.to(imageRefs[index].current, {
      scale: 1,
      duration: 0.7,
      ease: "power2.inOut"
    });
  }

  // Initialize refs for images and containers
  const imageRefs = [imageRef1, imageRef2, imageRef3, imageRef4];
  const s_containerRefs = [s_containerRef1, s_containerRef2, s_containerRef3, s_containerRef4];

  return (
    <>
      <section className="stories_container">
        <div className="stories">
          <div className="left_stories">
            <section className="story_header">
              <h1>Authentic Photos</h1>
              <p>
                Capturing raw, real moments with stunning clarity—authentic
                photography that tells your story, naturally and beautifully.
              </p>
            </section>
            <section className="lower_left_stroies">
              <div className="l_image1_cont">
                <div style={{position:"relative",overflow:"hidden"}} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)} ref={s_containerRef1} className="img_outer">
                  <img ref={imageRef1} src={im2} alt="" />
                </div>
                <h6>interior</h6>
                <h3>bridal bouquet</h3>
              </div>
              <div className="l_image2_cont">
                <div style={{position:"relative",overflow:"hidden"}} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)} ref={s_containerRef2} className="img_outer">
                  <img ref={imageRef2} src={im4} alt="" />
                </div>
                <h6>interior</h6>
                <h3>Capture emotion</h3>
              </div>
            </section>
          </div>
          <div className="right_stories">
            <section className="upper_right_stories">
              <div className="img_cover">
                <div className="r_image1_cont">
                  <div style={{position:"relative",overflow:"hidden"}} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)} ref={s_containerRef3} className="img_outer">
                    <img ref={imageRef3} src={im1} alt="" />
                  </div>
                    <h6>interior</h6>
                    <h3>Blushing bridal</h3>
                </div>
              </div>
              <div className="img_cover">
                <div className="r_image2_cont">
                  <div style={{position:"relative",overflow:"hidden"}} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)} ref={s_containerRef4} className="img_outer">
                    <img ref={imageRef4} src={im3} alt="" />
                  </div>
                  <h6>interior</h6>
                  <h3>Love shades</h3>
                </div>
              </div>
            </section>
            <section className="story_quoat">
              <img src={love} alt="" />
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
