import "../style/Photography_team.css";
import img1 from "../assets/member-1.jpg";
import img2 from "../assets/member-2.jpg";
import img3 from "../assets/member-3.jpg";
import img4 from "../assets/member-4.jpg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import jaspreet_signature from "../assets/jaspreet-signature.png";
import jasdeep_signature from "../assets/jasdeep-signature.png";
import sukhwinder_signature from "../assets/sukhwinder-signature.png";
import sukhpreet_signature from "../assets/sukhpreet-signature.png";

import React from "react";

export default function Photography_team() {
  // Memoize team members data to prevent recreating on each render
  const teamMembers = React.useMemo(() => [
    { img: img1, signature: jaspreet_signature, role: 'Director', name: 'Jaspreet Singh' },
    { img: img2, signature: jasdeep_signature, role: 'Cinematographer', name: 'Jasdeep Singh' },
    { img: img3, signature: sukhwinder_signature, role: 'Photographer', name: 'Sukhwinder Singh' },
    { img: img4, signature: sukhpreet_signature, role: 'Photographer', name: 'Sukhjeet Kaur' }
  ], []); // Empty dependency array as data is static

  // Memoize event handlers to prevent recreating on each render
  const handleMouseEnter = React.useCallback((e) => {
    e.currentTarget._enter?.();
  }, []);

  const handleMouseLeave = React.useCallback((e) => {
    e.currentTarget._leave?.();
  }, []);

  useGSAP(() => {
    // Set initial state of signatures
    gsap.set('.signature', {
      yPercent: 3,
      opacity: 0
    });

    // Create a context for better performance
    const ctx = gsap.context(() => {
      // Create hover animations for all cards at once
      const cards = gsap.utils.toArray('.pt_img_outer');
      
      cards.forEach((card) => {
        // Use direct element references instead of querySelector
        const signature = card.children[1]; // signature is the second child
        const mainImage = card.children[0]; // main image is the first child
        
        // Create timeline for each card
        const tl = gsap.timeline({ paused: true });
        
        tl.to(signature, {
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
        .to(mainImage, {
          filter: 'blur(5px)',
          duration: 0.8,
          ease: 'sine.inOut'
        }, '<');

        card._enter = () => tl.play();
        card._leave = () => tl.reverse();
      });
    });

    // Cleanup function
    return () => ctx.revert();
  }, []); // Empty dependency array since we only want this to run once

  return (
    <div className="main_photography_team">
      <section className="pt_upper">
        <h2>Our Photography Team</h2>
        <p>Creative, passionate, storytelling photography team.</p>
      </section>
      <section className="pt_lower">
        {teamMembers.map((member, index) => (
          <div className="pt_card" key={index}>
            <div className="outer_layout">
              <div 
                className="pt_img_outer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img className="main_image" src={member.img} alt={member.name} />
                <img className="signature" src={member.signature} alt={`${member.name}'s signature`} />
              </div>
              <h6>{member.role}</h6>
              <h4>{member.name}</h4>
              <div className="pt_refrences">
                <a href="#">FB</a>
                <a href="#">IN</a>
                <a href="#">TW</a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
