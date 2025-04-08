import express from "express";
import albumRoutes from "./routes/albumRoutes.js";
import cors from "cors";
import loginRoute from "./routes/loginRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import joinRoutes from "./routes/joinRoutes.js";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://lens-fillers.vercel.app", // Adjust this to your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); 
// app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/albums", albumRoutes);
app.use("/api/auth", loginRoute);
app.use('/api/contact', contactRoutes);
app.use('/api/join', joinRoutes);



// Start server
app.listen(3000, () =>{
  connectDB();
  console.log("Server running on port 3000")
});


// 