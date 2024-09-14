import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Event Management App</h1>
      <p>Manage and join events effortlessly.</p>
      <img src='event.jpeg' width={900} />
    </div>
  );
};

export default HomePage;
