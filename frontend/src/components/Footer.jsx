import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";

import "../style/Footer.css";

export default function Footer() {
  return (
    <footer data-scroll-section role="contentinfo">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Follow Us Section */}
          <div className="footer-section">
            <h3 className="footer-heading" id="follow-us">FOLLOW US</h3>
            <div className="footer-icons" aria-label="Social media links">
              <a href="#" aria-label="Follow us on Facebook" className="social-link-f">
                <FaFacebookF aria-hidden="true" />
              </a>
              <a href="#" aria-label="Follow us on Instagram" className="social-link-f">
                <FaInstagram aria-hidden="true" />
              </a>
              <a href="#" aria-label="Follow us on Twitter" className="social-link-f">
                <FaTwitter aria-hidden="true" />
              </a>
              <a href="#" aria-label="Follow us on YouTube" className="social-link-f">
                <FaYoutube aria-hidden="true" />
              </a>
            </div>
            <p className="footer-contact" id="contact-email">jasdeep@lensfiller.com</p>
          </div>

          <div className="footer-brand">
            <h2 className="brand-name" id="brand-name">LensFiller</h2>
            <div className="rotating-text" role="region" aria-label="Brand services">
              <div className="text-group" aria-hidden="true">
                <span>P</span>
                <span>h</span>
                <span>o</span>
                <span>t</span>
                <span>o</span>
                <span>g</span>
                <span>r</span>
                <span>a</span>
                <span>p</span>
                <span>h</span>
                <span>y</span>
                <span>-</span>
              </div>

              <div className="text-group" aria-hidden="true">
                <span>W</span>
                <span>e</span>
                <span>d</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>-</span>
              </div>

              <div className="text-group" aria-hidden="true">
                <span>S</span>
                <span>t</span>
                <span>u</span>
                <span>d</span>
                <span>i</span>
                <span>o</span>
                <span>-</span>
              </div>

              <div className="text-group" aria-hidden="true">
                <span>P</span>
                <span>o</span>
                <span>r</span>
                <span>t</span>
                <span>r</span>
                <span>a</span>
                <span>i</span>
                <span>t</span>
                <span>s</span>
                <span>-</span>
              </div>

              <div className="text-group" aria-hidden="true">
                <span>E</span>
                <span>v</span>
                <span>e</span>
                <span>n</span>
                <span>t</span>
                <span>s</span>
                <span>-</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <h3 className="footer-heading" id="newsletter">NEWSLETTER</h3>
            <p>Follow our latest stories.</p>
            <div className="footer-input-container">
              <input 
                type="email" 
                placeholder="E-MAIL" 
                aria-label="Enter your email address"
                className="newsletter-input"
              />
              <button 
                type="submit"
                aria-label="Subscribe to newsletter"
                className="newsletter-button"
              >
                <BsEnvelope aria-hidden="true" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom" role="region" aria-label="Copyright information">
        <p> 2025 Qode Interactive, All Rights Reserved</p>
      </div>
    </footer>
  );
}
