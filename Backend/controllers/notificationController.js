const Notification = require('../models/Notification');
const Event = require('../models/Event');

// Send Notification
const sendNotification = async (req, res) => {
  const { eventId, message } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const notification = await Notification.create({
    event: eventId,
    message,
    recipient: event.createdBy,
  });

  res.status(201).json(notification);
};

// Get Notifications for the user
const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id });

  res.json(notifications);
};

module.exports = {
  sendNotification,
  getNotifications,
};
