// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Event Management</Link>
      </div>
      <nav>
        {isAuthenticated ? (
          <>
            <Link to="/events">Events</Link>
            <Link to="/create-event">Create Event</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
