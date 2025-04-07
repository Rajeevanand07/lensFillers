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

export const sendJoiningMail = async (req, res) => {
  const { firstName, lastName, email, phone, city, about, portfolio, experience } = req.body;
  const adminMailOptions = {
    from: `"Joining Inquiry" <${email}>`,
    to: email,
    subject: 'New Wedding Inquiry Received',
    html: `
      <h2>New Inquiry</h2>
      <p><b>First Name:</b> ${firstName}</p>
      <p><b>Last Name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>City:</b> ${city}</p>
      <p><b>About:</b> ${about}</p>
      <p><b>Portfolio:</b> ${portfolio}</p>
      <p><b>Experience:</b> ${experience}</p>
    `,
  };
  const userMailOptions = {
    from: `"Wedding Team" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: 'Thank You for Joining Us!',
    html: `
      <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for joining us. We've received your inquiry and will reply shortly.</p>
      <h4>Your Submitted Details:</h4>
      <ul>
        <li>First Name: ${firstName}</li>
        <li>Last Name: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>City: ${city}</li>
        <li>About: ${about}</li>
        <li>Portfolio: ${portfolio}</li>
        <li>Experience: ${experience}</li>
      </ul>
      <p>Warm regards,<br/>Lens Fillers</p>
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
}