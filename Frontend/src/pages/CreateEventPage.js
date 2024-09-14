import { useState } from 'react';
import authAxios from '../services/authAxios';
import { useNavigate } from 'react-router-dom';
import './CreateEventPage.css';

const CreateEventPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAxios().post(
        'http://localhost:4000/api/events',
        { title, description, date, time, location }
      );
      console.log('Event created:', response.data);
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error.response.data.message);
    }
  };

  return (
    <div className="create-event-page">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Event Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter the event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter a brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="date">Event Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="time">Event Time</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter the event location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
