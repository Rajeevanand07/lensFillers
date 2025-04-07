import { useState } from "react";
import axios from "axios";
import "../../style/contact_style/ContactUs.css";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    role: "",
    groomName: "",
    brideName: "",
    email: "",
    phone: "",
    eventFrom: "",
    eventTo: "",
    venue: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.role) newErrors.role = "Please select your role.";
    if (!formData.groomName.trim().match(/^[A-Za-z ]{5,}$/))
      newErrors.groomName = "Enter a valid name (only letters, min 5 characters).";
    if (!formData.brideName.trim().match(/^[A-Za-z ]{2,}$/))
      newErrors.brideName = "Enter a valid name (only letters, min 2 characters).";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|protonmail|icloud)\.com$/;
    if (!formData.email.match(emailRegex) || formData.email.length < 12)
      newErrors.email = "Enter a valid email from a known provider.";

    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.eventFrom)
      newErrors.eventFrom = "Please select the event start date.";
    if (!formData.eventTo)
      newErrors.eventTo = "Please select the event end date.";
    if (
      formData.eventFrom &&
      formData.eventTo &&
      formData.eventTo < formData.eventFrom
    )
      newErrors.eventTo = "End date must be after start date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      setLoading(true);
      try {
        await axios.post("http://localhost:3000/api/contact", formData);
        toast.success("Message sent successfully!");


        setFormData({
          role: "",
          groomName: "",
          brideName: "",
          email: "",
          phone: "",
          eventFrom: "",
          eventTo: "",
          venue: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Submission failed:", error);
        toast.error("Failed to send message. Please try again later.");
      }
      finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="contact-wrapper">
     

      <div className="contact-container">
        <div className="contact-image"></div>
        <div className="contact-form">
          <h1 className="contact-heading">Get In Touch</h1>
          <p className="lableinfo">
            For wedding inquiries, please fill the contact form below
          </p>

          <form className="contact-form_m" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Role *</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select option</option>
                <option value="groom">Groom</option>
                <option value="bride">Bride</option>
                <option value="planner">Planner</option>
                <option value="other">Other</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>

            <div className="form-group-grouped">
              <div className="form-group half-width">
                <label>Groom Name *</label>
                <input
                  type="text"
                  name="groomName"
                  value={formData.groomName}
                  onChange={handleChange}
                  required
                />
                {errors.groomName && <span className="error">{errors.groomName}</span>}
              </div>
              <div className="form-group half-width">
                <label>Bride Name *</label>
                <input
                  type="text"
                  name="brideName"
                  value={formData.brideName}
                  onChange={handleChange}
                  required
                />
                {errors.brideName && <span className="error">{errors.brideName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group-grouped">
              <div className="form-group half-width">
                <label>Event Date From *</label>
                <input
                  type="date"
                  name="eventFrom"
                  value={formData.eventFrom}
                  onChange={handleChange}
                  required
                />
                {errors.eventFrom && <span className="error">{errors.eventFrom}</span>}
              </div>
              <div className="form-group half-width">
                <label>Event Date To *</label>
                <input
                  type="date"
                  name="eventTo"
                  value={formData.eventTo}
                  onChange={handleChange}
                  required
                />
                {errors.eventTo && <span className="error">{errors.eventTo}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your wedding: What coverage you require? What's your vision?"
              ></textarea>
            </div>

            <button className="contact-button" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
