import "../style/about_style/About.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useMemo } from "react";
import AboutMain from "../components/about_components/AboutMain";
import Quote from "../components/about_components/Quote";
import JoinTeam from "../components/about_components/JoinTeam";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  wedding: {
    x: "-300vw",
    scrollConfig: {
      start: "-400vw 0",
      end: "150% -100%",
      scrub: 0.4,
    },
  },
  haldi: {
    x: "-250vw",
    scrollConfig: {
      start: "-700vw 0",
      end: "100% -100%",
      scrub: 2,
    },
  },
  preWedding: {
    x: "300vw",
    scrollConfig: {
      start: "80% 70%",
      end: "230% -70%",
      scrub: 1,
      // markers: true,
    },
  },
  preWedding2: {
    x: "200vw",
    scrollConfig: {
      start: "80% 110%",
      end: "200% -200%",
      scrub: 2,
      // markers: true,
    },
  },
};

export default function About_lenis() {
  const ftRef1 = useRef(null);
  const ftRef2 = useRef(null);
  const ftRef3 = useRef(null);
  const ftRef4 = useRef(null);

  useGSAP(() => {
    const commonConfig = {
      ease: "power2.out",
    };

    [
      { ref: ftRef1.current, config: ANIMATION_CONFIG.wedding },
      { ref: ftRef2.current, config: ANIMATION_CONFIG.haldi },
      { ref: ftRef3.current, config: ANIMATION_CONFIG.preWedding },
      { ref: ftRef4.current, config: ANIMATION_CONFIG.preWedding2 },
    ].forEach(({ ref, config }) => {
      // Reset any previous transforms to get accurate width
      gsap.set(ref, { clearProps: "all" });

      gsap.from(ref, {
        ...commonConfig,
        x: config.x,
        scrollTrigger: {
          trigger: ref,
          ...config.scrollConfig,
        },
      });
    });
  });

  // const renderFlowingText = useMemo(
  //   () =>
  //     (ref, words, className = "flowing_text") => {
  //       return (
  //         <div ref={ref} className={className}>
  //           <h1>{words.join(" ")}</h1>
  //         </div>
  //       );
  //     },
  //   []
  // );

  const renderFlowingText = useMemo(() => {
    const Component = (ref, words, className = "flowing_text") => (
      <div ref={ref} className={className}>
        <h1>{words.join(" ")}</h1>
      </div>
    );

    Component.displayName = "RenderFlowingText";
    return Component;
  }, []);

  return (
    <section className="about_section">
      <AboutMain />
      <div className="full_page">
        <div className="pipe1">
          {renderFlowingText(ftRef1, [
            "● WeddingPhotography",
            "● WeddingDay",
            "● BrideAndGroom",
            "● HappilyEverAfter",
            "● LoveStory",
            "● WeddingDress",
            "● WeddingPlanning",
            "● Wedding",
            "● BrideToBe",
            "● WeddingInspiration",
          ])}
        </div>
        <div className="pipe4">
          {renderFlowingText(ftRef4, [
            "● WeddingDress",
            "● HappilyEverAfter",
            "● BrideToBe",
            "● WeddingPhotography",
            "● Wedding",
            "● LoveStory",
            "● WeddingPlanning",
            "● BrideAndGroom",
            "● WeddingInspiration",
            "● WeddingDay",
          ])}
        </div>
        <div className="pipe2">
          {renderFlowingText(ftRef2, [
            "● BrideToBe",
            "● WeddingInspiration",
            "● LoveStory",
            "● WeddingPlanning",
            "● Wedding",
            "● WeddingDay",
            "● WeddingPhotography",
            "● WeddingDress",
            "● BrideAndGroom",
            "● HappilyEverAfter",
          ])}
        </div>
        <div className="pipe3">
          {renderFlowingText(ftRef3, [
            "● WeddingDress",
            "● HappilyEverAfter",
            "● BrideToBe",
            "● WeddingPhotography",
            "● Wedding",
            "● LoveStory",
            "● WeddingPlanning",
            "● BrideAndGroom",
            "● WeddingInspiration",
            "● WeddingDay",
          ])}
        </div>
      </div>
      <Quote />
      <JoinTeam />
    </section>
  );
}
