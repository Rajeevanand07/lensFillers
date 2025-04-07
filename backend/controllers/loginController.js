import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


export const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log(email,password)
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token valid for 1 day
    });

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true, // Prevent access from JavaScript (secure)
      secure: process.env.NODE_ENV === "production", // Enable only in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/', // Ensure cookie is available across all paths
      domain: 'localhost' // Specify domain
    });

    // Send response with token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token // Send token in response for fallback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logoutController = (req, res) => {
    try {
      // Check if token cookie exists
      // const token = req.cookies?.token;
      // if (!token) {
      //   return res.status(400).json({ message: "You are already logged out" });
      // }
  
      // Clear the token cookie
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(0), // Expire the cookie immediately
      });
  
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed", error: error.message });
    }
  };
  
  