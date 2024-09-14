import React, { useEffect, useState } from 'react';
import authAxios from '../services/authAxios';
import './ManageJoinRequests.css'; // Link to the CSS file

const ManageJoinRequests = ({ eventId }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const { data } = await authAxios().get(`http://localhost:4000/api/events/${eventId}`);
        setPendingRequests(data.pendingRequests);
      } catch (error) {
        console.error('Error fetching event data:', error.response.data.message);
      }
    };

    fetchPendingRequests();
  }, [eventId]);

  const handleRequest = async (userId, action) => {
    try {
      const { data } = await authAxios().post(`http://localhost:4000/api/events/${eventId}/manage-requests`, {
        userId,
        action,
      });
      setMessage(data.message);
      setPendingRequests(data.pendingRequests);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="manage-requests">
      <h3>Manage Join Requests</h3>
      {message && <p className="status-message">{message}</p>}
      <ul className="request-list">
        {pendingRequests.map((userId) => (
          <li key={userId} className="request-item">
            <span className="user-id">User ID: {userId}</span>
            <button onClick={() => handleRequest(userId, 'accept')} className="btn-accept">Accept</button>
            <button onClick={() => handleRequest(userId, 'reject')} className="btn-reject">Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageJoinRequests;
