// import React from "react";
import "../../style/about_style/AboutMain.css";
import member_1 from "../../assets/about-assets/member_1.avif";

export default function AboutMain() {
  return (
    <section className="about_main">
      <div className="about_main_cover">
        <img src={member_1} alt="" />
      </div>
      <div className="about_person">
        <div className="about_person_main">
        <h1 className="director">About Jasdeep Singh</h1>
        <div className="about_director">
        <p>
        &quot;We have streamlined the outdated and layered agency model to give you
          direct access to some of the best global talent. No wasted time, no
          empty promises. Just impactful results.&quot;
        </p>
        </div>
        <div className="we_are">
          <h1>we&apos;re</h1>
          <div className="about_all">
          <p>
            carrying a decade of love, laughter, and timeless memories—a journey
            woven with passion, trust, and unbreakable bonds, leading us to a
            future as grand and beautiful as our story.
          </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
