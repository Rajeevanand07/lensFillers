import React, { useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import logo from '../assets/logo.png'
import '../style/First.css' 
import gsap from 'gsap'
import Info from './info'


const First = () => {
  const logoRef = useRef(null)
  const leftNavRef = useRef(null)
  const rightNavRef = useRef(null)
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    
    // Initial setup
    timeline.set(logoRef.current, {
      opacity: 0,
      x: -100,
      scale: 0.5,
      // y: -50,
    })
    .set([leftNavRef.current, rightNavRef.current], {
      opacity: 0,
      x: -100,
    })
    .set([headingRef.current, bottomRef.current], {
      opacity: 0,
      y: 50,
    })

    // Animations
    timeline
      .to(logoRef.current, {
        duration: 2,
        opacity: 1,
        scale: 1,
        x: 0,
        y: 20,
        ease: "power2.out",
      })
      .to(leftNavRef.current, {
        duration: 1,
        opacity: 1,
        x: 0,
        ease: "power2.out",
      }, "-=0.5")
      .to(rightNavRef.current, {
        duration: 1,
        opacity: 1,
        x: 0,
        ease: "power2.out",
      }, "<")
      .to(headingRef.current, {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      }, "-=0.5")
      .to(bottomRef.current, {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      }, "-=0.5")

  }, [])

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>FINE ART WEDDING PHOTOGRAPHY</title>
        <meta name="title" content="FINE ART WEDDING PHOTOGRAPHY" />
        <meta name="description" content="Discover our world of creative photography. Professional photography services for weddings, events, and more." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:title" content="FINE ART WEDDING PHOTOGRAPHY" />
        <meta property="og:description" content="Discover our world of creative photography. Professional photography services for weddings, events, and more." />
        <meta property="og:image" content="https://yourwebsite.com/path-to-preview-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourwebsite.com/" />
        <meta property="twitter:title" content="FINE ART WEDDING PHOTOGRAPHY" />
        <meta property="twitter:description" content="Discover our world of creative photography. Professional photography services for weddings, events, and more." />
        <meta property="twitter:image" content="https://yourwebsite.com/path-to-preview-image.jpg" />

        {/* Additional SEO tags */}
        <meta name="keywords" content="photography, creative photography, professional photographer, wedding photography, event photography" />
        <meta name="author" content="Lens Fillers" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/" />

        {/* Preload critical assets */}
        <link rel="preload" href={logo} as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" as="style" />
      </Helmet>
      <img 
        ref={logoRef}
        src={logo} 
        alt="Company Logo"
        className="logo" 
      />
  <div className='navbar'>
  <nav ref={leftNavRef} className="nav-left" role="navigation" aria-label="Main navigation left">
        <a href="#home" aria-label="Go to Home section">Home</a>
        <a href="#about" aria-label="Go to About section">About</a>
        <a href="#gallery" aria-label="Go to Gallery section">Gallery</a>
      </nav>
      <nav ref={rightNavRef} className="nav-right" role="navigation" aria-label="Main navigation right">
        <a href="#video" aria-label="Go to Video section">Video</a>
        <a href="#contact" aria-label="Go to Contact section">Contact</a>
        <a href="#blog" aria-label="Go to Blog section">Packages</a>
      </nav>
  </div>

      <main>
        <div className="heroSection" ref={heroRef}>
          <div className="vignette" role="presentation"></div>
          <div className="grain" role="presentation"></div>
          <div className="hero-content">
            <h1 ref={headingRef}>FINE ART WEDDING 
              <span className='photoText'>
               PHOTOGRAPHY
              </span></h1>
          </div>
          <div className="bottom">
            <h3 ref={bottomRef}>By Lens Fillers</h3>
          </div>
        </div>
      </main>
      <Info />
    </>
  )
}

export default First