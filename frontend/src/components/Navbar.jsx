import { useState, useRef, useCallback } from "react";
import "../style/Navbar.css";
import useScroll from "../hooks/useScroll";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const hamRef = useRef();
  const sideNavRef = useRef();
  const sideListRef = useRef();

  // Initially position the side nav completely off-screen to the right
  // and set initial state for the list items.
  useGSAP(() => {
    gsap.set(sideNavRef.current, { x: "100%" });
    gsap.set(sideListRef.current.children, { opacity: 0, x: 20 });
  });

  // Animate side nav into view when clicking on the hamburger icon.
  // After the container slides in, animate the <li> elements one by one.
  const handleHam = () => {
    const tl = gsap.timeline();
    tl.to(sideNavRef.current, {
      x: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    })
      .to(sideListRef.current.children, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.15,
      });
  };

  // Animate the <li> elements out one by one, then animate the side nav off-screen.
  const handleClose = () => {
    const tl = gsap.timeline();
    tl.to(sideListRef.current.children, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      stagger: 0.1,
    })
      .to(sideNavRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power2.inOut",
      });
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY.current;
    const scrollingUp = currentScrollY < lastScrollY.current;

    if (scrollingDown && currentScrollY > 100 && show) {
      // Scrolling down and scrolled more than 100px: hide navbar
      setShow(false);
    } else if (scrollingUp && !show) {
      // Scrolling up: show navbar
      setShow(true);
    }

    lastScrollY.current = currentScrollY;
  }, [show]);

  useScroll(handleScroll, 20); // Assuming throttling is implemented

  return (
    <>
      <nav className={`main_navbar ${show ? "visible" : "hidden"}`}>
        <div className="nav_logo">
          <h2>LOGO</h2>
        </div>
        <div className="nav_links">
        <ul>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/">Home</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/photography">Photography</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/films">Films</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/blog">Blog</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/about">About</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/contact">Contact</Link></li>
        </ul>
        </div>
        <div ref={hamRef} className="hamburger" onClick={handleHam}>
          <RxHamburgerMenu />
        </div>
      </nav>
      <div ref={sideNavRef} className="nav_side">
        <MdOutlineClose className="cross_nav" onClick={handleClose} />
        <ul ref={sideListRef}>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/">Home</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/photography">Photography</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/films">Films</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/blog">Blog</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/about">About</Link></li>
          <li className="underline"><Link className="Link" onClick={handleClose} to="/contact">Contact</Link></li>
        </ul>
      </div>
    </>
  );
}