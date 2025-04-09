import { useState, useEffect, useCallback, useMemo, useRef } from "react";

import Lenis from "lenis";

import "../style/Hero.css";
import img1 from "../assets/h1.jpeg";
import img2 from "../assets/h2.jpeg";
import img3 from "../assets/h3.jpeg";

import { gsap } from "gsap"; // Import GSAP


const HeroSlider = () => {
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const preloadImageRef = useRef(new Image()); // Use useRef for preloading
  const id = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.8,
      smooth: true, // Enable smooth scrolling
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function to destroy Lenis on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  const clearTimer = () => {
    window.clearInterval(id.current);
    setLoader(false);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearTimer();
    }
  }, [timer]);

  // Preload next image
  const preloadImage = (src) => {
    preloadImageRef.current.src = src; // Set the src directly
  };

  const slides = useMemo(
    () => [
      {
        image: img1,
        alt: "Happy couple in traditional wedding attire, bride in red lehenga and groom in black sherwani",
      },
      {
        image: img2,
        alt: "Beautiful wedding photography showcasing couple in traditional Indian wedding ceremony",
      },
      {
        image: img3,
        alt: "Elegant wedding photoshoot highlighting traditional Indian wedding celebrations",
      },
    ],
    []
  );

  // Preload next image when slide changes
  useEffect(() => {
    preloadImage(slides[(currentSlide + 1) % slides.length].image);
  }, [currentSlide, slides]);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setKey((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
      );
      setKey((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setKey((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    if (loader) {
      gsap.fromTo(
        ".loader-wrapper h1, .loader-wrapper h4", // Targeting h1 and h4 specifically
        { opacity: 0 }, // Initial state
        { opacity: 1, duration: 0.7, repeat: -1, yoyo: true } // Animation to apply with looping
      );
    }
  }, [loader]); // Run animation when loader state changes

  return (
    <>
        <div>
          <section
            id="hero"
            className="hero"
            role="banner"
            aria-label="Wedding Photography Showcase"
          >
            <div className="hero-content">
          <div className="all_static_contenet">
            <h1 className="static-title">Crafting a story</h1>
            <h4 className="static-subtitle_w">with</h4>
            <h3 className="static-subtitle">emotion | realtion | perfection</h3>
          </div>
        </div>
            <div className="slider-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? "active" : ""}`}
                  aria-hidden={index !== currentSlide}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    width="1920"
                    height="1080"
                    decoding="async"
                  />
                  <div className="slide-overlay"></div>
                </div>
              ))}

              <div
                className="pagination"
                role="navigation"
                aria-label="Slide Navigation"
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot_hs ${index === currentSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

export default HeroSlider;
