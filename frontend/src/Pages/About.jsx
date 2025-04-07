// import Footer from "./components/Footer"
// import Slider from "./components/Slider"
import { useEffect } from "react";
// import "./";
import About_lenis from "./About_lenis";
import Lenis from 'lenis'

const About = () => {
  useEffect(() => {
    // Initialize Lenis with slower scroll settings
    const lenis = new Lenis({
      duration: 1, // Increased duration for slower scrolling
      smooth: true,
      // lerp: 0.05, // Lower lerp value for smoother, slower transitions
      wheelMultiplier: 0.5, // Reduced wheel multiplier to slow down mouse wheel scrolling
      touchMultiplier: 0.5, // Reduced touch multiplier for touch devices
      smoothWheel: true,
      smoothTouch: true
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []); // Added dependency array

  return (
    <>
      <About_lenis />
      {/* <Slider/> */}
      {/* <Footer/> */}
    </>
  )
}

export default About
