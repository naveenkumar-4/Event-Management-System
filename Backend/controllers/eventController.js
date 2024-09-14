const Event = require('../models/Event');
const User = require('../models/User');

// Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

// RSVP Event
const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Ensure the user is not already an attendee
    if (!event.attendees.includes(req.user._id)) {
      event.attendees.push(req.user._id);
      await event.save();
    }

    res.json({ message: 'RSVP confirmed', attendees: event.attendees });
  } catch (error) {
    res.status(500).json({ message: 'Error RSVPing to event', error: error.message });
  }
};

// Get Attendees
const getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event.attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendees', error: error.message });
  }
};

// Request to Join Event
const requestToJoinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user has already requested to join
    if (event.pendingRequests.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already requested to join this event' });
    }

    // Add the user's request to the pendingRequests array
    event.pendingRequests.push(req.user._id);
    await event.save();

    res.json({ message: 'Request to join event sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

// Manage Join Requests
const manageJoinRequests = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate('pendingRequests', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user making the request is the event creator
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the event creator can manage requests' });
    }

    const { userId, action } = req.body;  // 'action' can be 'accept' or 'reject'

    // Find the index of the user in the pendingRequests array
    const requestIndex = event.pendingRequests.findIndex(user => user._id.toString() === userId);

    if (requestIndex === -1) {
      return res.status(400).json({ message: 'No such request found' });
    }

    if (action === 'accept') {
      // Check if the user is already in the attendees list
      const isAttendee = event.attendees.find(attendee => attendee.toString() === userId);
      if (!isAttendee) {
        // Move the user from pendingRequests to attendees
        event.attendees.push(userId);
      }
    }

    // Remove the request from pendingRequests array
    event.pendingRequests.splice(requestIndex, 1);
    await event.save();

    res.json({
      message: action === 'accept' ? 'User added to attendees' : 'User request rejected',
      attendees: event.attendees,
      pendingRequests: event.pendingRequests
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  getAttendees,
  manageJoinRequests,
  requestToJoinEvent,
};
