import React, { useState } from 'react';
import axios from 'axios';

import './AdminLogin.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Add withCredentials to ensure cookies are sent
      axios.defaults.withCredentials = true;
      
      const response = await axios.post('https://lensfillers.onrender.com/api/auth/login', { email, password }, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Wait for a moment to ensure everything is set
        await new Promise(resolve => setTimeout(resolve, 500));
        
        navigate('/admin');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://lensfillers.onrender.com/api/auth/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully');
      navigate('/admin/login');
      localStorage.removeItem('token'); //just recently added this line (by rajeev)
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="adminLogin-container">
      <div className="adminLogin-card">
        <h2 className="adminLogin-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="adminLogin-form">
          <label className="adminLogin-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="adminLogin-input"
            required
          />

          <label className="adminLogin-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="adminLogin-input"
            required
          />

          <button type="submit" className="adminLogin-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;
