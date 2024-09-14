import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../services/authAxios';
import EventRequestButton from '../components/EventRequestButton';
import ManageJoinRequests from '../components/ManageJoinRequests';
import { useUser } from '../context/userContext';
import './EventDetailPage.css';
import moment from 'moment';


const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await authAxios().get(`http://localhost:4000/api/events/${id}`);
        setEvent(data);
  
        const attendeesResponse = await authAxios().get(`http://localhost:4000/api/events/${id}/attendees`);
        setAttendees(attendeesResponse.data);
      } catch (error) {
        console.error('Error fetching event:', error.response.data.message);
      }
    };
  
    fetchEvent();
  }, [id]);
  

  if (!event) return <div>Loading...</div>;
  const formattedDate = moment(event.date).format('MMMM D, YYYY');

  return (
    <div className="event-detail-page">
      <div className="event-info">
        <h2>{event.title}</h2>
        <p className="event-date-time">{formattedDate} at {event.time}</p>
        <p className="event-location"><strong>Location:</strong> {event.location}</p>
        <p className="event-description">{event.description}</p>
        <hr />

        {user && (
          <div className="event-actions">
            <EventRequestButton eventId={event._id} />

            
            {user._id === event.createdBy._id && (
              <ManageJoinRequests eventId={event._id} />
            )}
          </div>
        )}
      </div>

      <div className="attendees-list">
        <h3>Attendees</h3>
        <ul>
          {attendees.map(attendee => (
            <li key={attendee._id} className="attendee-item">
              {attendee.name} <span>({attendee.email})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetailPage;
