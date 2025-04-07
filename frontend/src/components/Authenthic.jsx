// import React from 'react';
import '../style/Authenthic.css'; 
import img1 from '../assets/couple.jpg'
import img2 from '../assets/couple2.jpg'
import img3 from '../assets/couple3.jpg'
import img4 from '../assets/couple4.jpg'
import img5 from '../assets/love.png'

const Authenthic = () => {
  return (
    <>
    <div className="authentic-container">
      <div className="heading-image-container">
        <div className="text-section">
          <h1>AUTHENTIC PHOTOS</h1>
          <p>Sun and clarity, from which all this was born, is the fault of the accuser and the praise of what is painful.</p>
        </div>
        <div className="image-section">
          <div className="image-container">
            <img src={img1} alt="Bridal Bouquet" className="main-image" />
            <div className='firstText'>
              <p>Bridal Bouquet</p>
            </div>
          </div>
          <div className="image-container">
            <img src={img3} alt="Capture Emotion" className="right-image" />
            <div className='secondText'>
              <p>Capture Emotion</p>
            </div>
          </div>
          <div className="image-container">
            <img src={img2} alt="Blushing Bride" className="side-image" />
            <div className='thirdText'>
              <p>Blushing Bride</p>
            </div>
          </div>
          <div className="image-container">
            <img src={img4} alt="Love Shades" className="left-image" />
            <div className='fourthText'>
              <p>Love Shades</p>
            </div>
          </div>
          <div className='image-container'>
            <img src={img5} alt="Love Shades" className="love-text" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Authenthic;
