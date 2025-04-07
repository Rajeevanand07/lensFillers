import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactMail = async (req, res) => {
  const {
    role,
    groomName,
    brideName,
    email,        // User email directly from frontend
    phone,
    eventFrom,
    eventTo,
    venue,
    message,
  } = req.body;

  // try {
  //   const response = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}`);
    
  //   if (response.data.status !== "valid") {
  //     return res.status(400).json({ error: "Invalid or non-existent email address." });
  //   }
  // } catch (error) {
  //   console.error("ZeroBounce Error:", error);
  //   return res.status(500).json({ error: "Email verification service failed." });
  // }

  // Email content to Admin
  const adminMailOptions = {
    from: `"Wedding Inquiry" <${email}>`,
    to: email,
    subject: 'New Wedding Inquiry Received',
    html: `
      <h2>New Inquiry</h2>
      <p><b>Role:</b> ${role}</p>
      <p><b>Groom Name:</b> ${groomName}</p>
      <p><b>Bride Name:</b> ${brideName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Event Dates:</b> ${eventFrom} to ${eventTo}</p>
      <p><b>Venue:</b> ${venue}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  // Confirmation email to User (email directly from frontend)
  const userMailOptions = {
    from: `"Wedding Team" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: 'Thank You for Contacting Us!',
    html: `
      <p>Dear ${groomName || brideName},</p>
      <p>Thank you for contacting us. We've received your inquiry and will reply shortly.</p>
      <h4>Your Submitted Details:</h4>
      <ul>
        <li>Role: ${role}</li>
        <li>Event Dates: ${eventFrom} to ${eventTo}</li>
        <li>Venue: ${venue}</li>
      </ul>
      <p>Warm regards,<br/>Wedding Team</p>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Emails successfully sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
};
