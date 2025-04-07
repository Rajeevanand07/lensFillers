import React, { useRef } from "react";
import "../style/Royal.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Royal() {
  const l_upperRefs = useRef([]);
  const l_lowerRefs = useRef([]);
  const r_upperRefs = useRef([]);
  const r_lowerRefs = useRef([]);
  const royalImgRef = useRef();
  const sectionRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Animation starts when top of section hits center of viewport
        // toggleActions: "play none none reset" // Play on enter, reset on leave
      }
    });
    tl.from(
      l_upperRefs.current,
      {
        y: -200,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.1,
      },
      "same"
    )
    .from(
      r_lowerRefs.current,
      {
        y: 200,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: -0.1,
      },
      "same"
    )
    .from(royalImgRef.current, {
      width: 0,
      duration: 0.7,
      ease: "power2.inOut",
    }, "same+=1.3")
  });

  return (
    <>
    <section ref={sectionRef} className="main_royal_section">
      <section className="main_royal_section">
        <div className="royal_heading">
          <div className="upper_r_h">
            <div className="u_text_l">
              {"royal".split("").map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (l_upperRefs.current[index] = el)}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="u_text_r">
              {"broach".split("").map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (r_upperRefs.current[index] = el)}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="lower_r_h">
            <div className="l_text_l">
              {"modern".split("").map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (l_lowerRefs.current[index] = el)}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="l_text_r">
              {"approach".split("").map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (r_lowerRefs.current[index] = el)}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="royal_content">
          <div className="royal_image">
            <img className="img_c1" src="https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743744158/lensfiller/lensFillersImages/couples.jpg" alt="" />
            <img className="img_c2" src="https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743744203/lensfiller/lensFillersImages/only_couples.png" alt="" />
          </div>
          <div className="royal_side_content">
            <div className="upper_royal">
              <div className="royal_hands">
                <img ref={royalImgRef} src="https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743744302/lensfiller/lensFillersImages/hands.avif" alt="" />
              </div>
            </div>
            <div className="lower_royal">
              <div className="royal_stroy_l">
                <h5>
                  "In the garden of time, their love blooms eternally, nurtured
                  by dreams and whispered promises."
                </h5>
              </div>
              <div className="royal_stroy_r">
                <h5>
                  "Hand in hand, soul to soul—love flourishes where nature and
                  hearts unite."
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
    </>
  );
}
