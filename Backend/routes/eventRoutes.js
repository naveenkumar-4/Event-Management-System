const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  getAttendees,requestToJoinEvent,
  manageJoinRequests
} = require('../controllers/eventController');

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getAllEvents);
router.get('/:id', protect, getEventById);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

// RSVP and Attendee management
// router.post('/:id/rsvp', protect, rsvpEvent);
 router.get('/:id/attendees', protect, getAttendees);

router.post('/:id/request', protect, requestToJoinEvent);  // Request to join event
router.post('/:eventId/manage-requests', protect, manageJoinRequests);  // Manage join requests


module.exports = router;
