// import React from "react";
import '../../style/about_style/Quote.css';
// import image_1 from "../assets/im4.jpg";
// import image_2 from "../assets/img2_wr.avif";

import image_1 from "../../assets/about-assets/im4.jpg";
import image_2 from "../../assets/about-assets/img2_wr.avif";

export default function Quote() {
  return (
    <section className="main_quote">
      <p>the spotlight of lensfillers</p>
      <div className="quote_cover">
        <h1>&quot;A single click, a lifetime of cherished memories&quot;</h1>
        <p>
          Photography is more than just images; it’s about preserving the
          feelings behind them. At LensFillers, we turn fleeting moments into
          lasting memories, ensuring every picture speaks a story of love,
          laughter, and life.
        </p>
      </div>
      <div className="quote_images">
        <div className="quote_images_outer">
          <img src={image_1} alt="" />
        </div>
        <div className="quote_images_outer">
          <img src={image_2} alt="" />
        </div>
      </div>
    </section>
  );
}
