import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Validation for email and password
  const validateForm = () => {
    if (!email.trim()) {
      console.log('Email is empty');  // Debugging
      toast.error('Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');  // Debugging
      toast.error('Please enter a valid email.');
      return false;
    }
    if (password.length < 6) {
      console.log('Password is too short');  // Debugging
      toast.error('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log('Login response data:', data);  // Debugging

      // Save the token to localStorage
      localStorage.setItem('authToken', data.token);

      // Success toast notification
      toast.success('Login successful! Redirecting...');

      // Redirect to home or events page
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-password"
        />
        <button type="submit" className="btn-submit">Login</button>
      </form>

      {/* Ensure the ToastContainer is present */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
