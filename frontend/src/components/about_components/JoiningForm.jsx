import React, { useState } from 'react';
import '../../style/about_style/JoiningForm.css';
import axios from "axios";
import { toast } from 'react-toastify';

const JoiningForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    about: '',
    portfolio: '',
    experience: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // 🔹 Loading state added

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user types
  };

  // ✅ Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    
    // Email Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone Number Validation (Only digits, 10-digit length)
    if (!formData.phone) {
      newErrors.phone = 'Contact Number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    // Portfolio URL Validation (if provided)
    if (formData.portfolio && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}.*$/.test(formData.portfolio)) {
      newErrors.portfolio = 'Invalid URL format';
    }

    // Experience Validation (Must be a number)
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience) || Number(formData.experience) < 0) {
      newErrors.experience = 'Enter a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // 🔹 Set loading state to true
      try {
        await axios.post("http://localhost:3000/api/join", formData);
        toast.success("Message sent successfully!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          about: "",
          portfolio: "",
          experience: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Submission failed:", error);
        toast.error("Failed to send message. Please try again later.");
      } finally {
        setLoading(false); // 🔹 Reset loading state
      }
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <small className="error">{errors.firstName}</small>}
            </div>
            
            <div className="form-group">
              <label>Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <small className="error">{errors.lastName}</small>}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="form-group">
              <label>Contact Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <small className="error">{errors.phone}</small>}
            </div>

            <div className="form-group">
              <label>Current City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Tell us about yourself</label>
              <textarea name="about" rows="3" placeholder="Tell us about yourself" value={formData.about} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label>Link to your professional portfolio</label>
              <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} />
              {errors.portfolio && <small className="error">{errors.portfolio}</small>}
            </div>

            <div className="form-group">
              <label>Experience ( in years ) *</label>
              <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
              {errors.experience && <small className="error">{errors.experience}</small>}
            </div>

            <button className="joining_btn" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoiningForm;
