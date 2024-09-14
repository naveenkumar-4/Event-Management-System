import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Simple email and password validation function
  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Name is required.');
      return false;
    }
    if (!email.trim()) {
      toast.error('Email is required.');
      return false;
    }
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email.');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
      console.log('Registered:', response.data);

      // Save the token to localStorage
      localStorage.setItem('authToken', response.data.token);

      // Success toast notification
      toast.success('Registration successful! Redirecting...');

      // Redirect to home or events page
      setTimeout(() => {
        navigate('/events');
      }, 2000); // Delay for better UX
    } catch (error) {
      toast.error('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-name"
        />
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
        <button type="submit" className="btn-submit">Register</button>
      </form>

      {/* ToastContainer component must be added */}
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
