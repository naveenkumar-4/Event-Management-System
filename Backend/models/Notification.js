const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  message: String,
  sentAt: {
    type: Date,
    default: Date.now,
  },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
