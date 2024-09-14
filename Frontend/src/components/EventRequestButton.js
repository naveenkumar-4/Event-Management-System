import React, { useState } from 'react';
import authAxios from '../services/authAxios';
import './EventRequestButton.css'; // Link to the CSS file

const EventRequestButton = ({ eventId }) => {
  const [message, setMessage] = useState('');

  const requestToJoin = async () => {
    try {
      const { data } = await authAxios().post(`http://localhost:4000/api/events/${eventId}/request`);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="event-request-container">
      <button className="request-button" onClick={requestToJoin}>
        Request to Join
      </button>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default EventRequestButton;
