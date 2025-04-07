import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import "../../style/contact_style/FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { 
      question: "How far in advance should we book you?", 
      answer: "Most of our clients book us more than a year in advance. The sooner you reach out, the better the chances are that your date is still available in our calendar. We require a 30% non-refundable retainer to secure the date." 
    },
    { 
      question: "How do we book our wedding photography?", 
      answer: "Simply reach out via our contact form, and we'll guide you through the booking process." 
    },
    { 
      question: "Do you help with the concept and locations for the shoot?", 
      answer: "Yes! We provide suggestions for locations and themes that match your vision." 
    },
    { 
      question: "Do you do destination weddings? Are there additional costs?", 
      answer: "Yes! We travel worldwide. Additional costs depend on travel and accommodation expenses." 
    },
    { 
      question: "Do you provide raw footage?", 
      answer: "Yes, raw footage is available upon request for an additional fee." 
    },
    { 
      question: "What if we need to reschedule our wedding?", 
      answer: "We understand that things happen. We will work with you to reschedule based on our availability." 
    }
  ];

  return (
    <>
    <div className="faq2-container">
      <div className="faq2-title">FAQ</div>
      <div className="faq2-content">
        {faqs.map((faq, index) => (
          <div key={index} className="faq2-item">
            <div className="faq2-question" onClick={() => toggleFAQ(index)}>
              <span className="faq2-icon">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
              {faq.question}
            </div>
            <div className={`faq2-answer ${openIndex === index ? "show" : ""}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      
    </div>
    </>
  );
};

export default FAQ;