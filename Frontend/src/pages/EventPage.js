import React, { useEffect, useState } from 'react';
import authAxios from '../services/authAxios';
import { Link } from 'react-router-dom';
import './EventPage.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await authAxios().get('http://localhost:4000/api/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error.response.data.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-page">
      <h2 className="page-title">Upcoming Events</h2>
      <div className="event-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <Link to={`/events/${event._id}`} className="event-link">
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
              <button className="btn-cta">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
