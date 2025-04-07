import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style/Testimonial.css";

const testimonials = [
  {
    name: "John Doe",
    designation: "Wedding Photographer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Captured my wedding moments beautifully! The photos are stunning.",
  },
  {
    name: "Sarah Lee",
    designation: "Fashion Model",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "An absolutely professional experience. The photos exceeded my expectations!",
  },
  {
    name: "Michael Smith",
    designation: "Event Planner",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "Highly talented photographer! The event pictures were amazing.",
  },
  {
    name: "Jessica Brown",
    designation: "Engagement Shoot",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    text: "The lighting, composition, and colors were simply breathtaking!",
  },
  {
    name: "David Johnson",
    designation: "Travel Blogger",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    text: "Captured the essence of my travels perfectly. Highly recommended!",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const handleNext = () => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    startAutoScroll();
  };

  const handlePrev = () => {
    stopAutoScroll();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    startAutoScroll();
  };

  return (
    <div className="testimonial-container">
      {/* Heading Section */}
      <h2 className="heading ">Our Clients Say</h2>
      <p className="paragraph">
        Hear from those who have experienced our photography magic.
      </p>

      {/* Testimonial Slider */}
      <div className="testimonial-slider">
        {/* Previous Button */}
        <button onClick={handlePrev} className="prev-button ">
          <FaChevronLeft className="chevron-icon" />
        </button>

        <AnimatePresence>
          {testimonials.map((testimonial, index) => {
            const isActive = index === currentIndex;
            const isPrev = (index + 1) % testimonials.length === currentIndex;
            const isNext =
              (index - 1 + testimonials.length) % testimonials.length ===
              currentIndex;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: "100%" }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1 : 0.85,
                  x: isActive ? 0 : isPrev ? "-80%" : "80%",
                  filter: isActive ? "none" : "blur(8px)",
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className={`motion-div ${isActive ? "active" : "inactive"} ${
                  isNext ? "next" : ""
                } motion-div-transition`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />

                <p className="testimonial-text">
                  <FaQuoteLeft className="testimonial-quote-icon" />
                  {testimonial.text}
                </p>

                <h4 className="testimonial-name">{testimonial.name}</h4>

                <p className="testimonial-designation">
                  {testimonial.designation}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Next Button */}
        <button onClick={handleNext} className="next-button">
          <FaChevronRight className="chevron-icon" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="dots-container">
        {testimonials.map((_, index) => (
          <div key={index} className="relative w-2 sm:w-3 h-2 sm:h-3">
            {/* Static Dots */}
            <div className="t_dot"></div>

            {/* Moving Indicator */}
            {index === currentIndex && (
              <motion.div
                layoutId="activeDot"
                className="active-dot"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
