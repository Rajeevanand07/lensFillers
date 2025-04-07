import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "../style/Hero.css";

const HeroSlider = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Add Google Fonts link with async loading
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    link.setAttribute('async', '');
    document.head.appendChild(link);

    // Preload image with proper handling
    const preloadImage = () => {
      const img = new Image();
      img.src = "https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743742150/lensfiller/lensFillersImages/rsa4w1hrhuhoztzovdyx.webp";
      img.loading = 'eager';
      img.decode().then(() => {
        if (imageRef.current) {
          imageRef.current.style.opacity = '1';
        }
      }).catch((error) => {
        console.error('Image decode failed:', error);
      });
    };

    // Only preload if the image is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preloadImage();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({ 
      duration: 0.8, 
      smooth: true,
      lerp: 0.1,
      smoothTouch: 0.1,
      touchMultiplier: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(raf);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <>
      <section 
        id="hero" 
        className="hero" 
        role="banner" 
        aria-label="Wedding Photography Showcase"
        ref={heroRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
          contain: 'layout paint style'
        }}
      >
        <div className="hero-content">
          <div className="all_static_contenet">
            <h1 className="static-title">Crafting a story</h1>
            <h4 className="static-subtitle_w">with</h4>
            <h3 className="static-subtitle">emotion | realtion | perfection</h3>
          </div>
        </div>
        <div className="slider-container">
          <div className="slide">
            <img
              ref={imageRef}
              srcSet="
                https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743742150/lensfiller/lensFillersImages/rsa4w1hrhuhoztzovdyx.webp 1x,
                https://res.cloudinary.com/dmkjbp3cm/image/upload/c_scale,w_1600/v1743742150/lensfiller/lensFillersImages/rsa4w1hrhuhoztzovdyx.webp 2x
              "
              src="https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743742150/lensfiller/lensFillersImages/rsa4w1hrhuhoztzovdyx.webp"
              alt="Happy couple in traditional wedding attire, bride in red lehenga and groom in black sherwani"
              loading="lazy"
              decoding="async"
              fetchpriority="high"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'opacity 0.3s ease-in-out',
                opacity: '0',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                contain: 'layout paint style',
                willChange: 'opacity'
              }}
            />
            <div className="placeholder-image" style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              backgroundSize: '4px 4px',
              backgroundPosition: '0 0, 2px 2px',
              transition: 'opacity 0.3s ease-in-out',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              contain: 'layout paint style'
            }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSlider;
