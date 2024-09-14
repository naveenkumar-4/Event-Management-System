import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../services/authAxios';

const ManageJoinRequestsPage = () => {
  const { eventId } = useParams();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const { data } = await authAxios().get(`http://localhost:4000/api/events/${eventId}`);
        setPendingRequests(data.pendingRequests);
      } catch (error) {
        console.error('Error fetching join requests:', error.response.data.message);
      }
    };

    fetchPendingRequests();
  }, [eventId]);

  const handleRequestAction = async (userId, action) => {
    try {
      await authAxios().post(`http://localhost:4000/api/events/${eventId}/manage-requests`, {
        userId,
        action,
      });
      // Update the UI or fetch the updated requests list
    } catch (error) {
      console.error(`Error ${action}ing request:`, error.response.data.message);
    }
  };

  return (
    <div className="manage-join-requests-page">
      <h2>Manage Join Requests</h2>
      {pendingRequests.map((request) => (
        <div key={request._id}>
          <p>{request.name}</p>
          <button onClick={() => handleRequestAction(request._id, 'accept')}>Accept</button>
          <button onClick={() => handleRequestAction(request._id, 'reject')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ManageJoinRequestsPage;
