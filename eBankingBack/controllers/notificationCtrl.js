
const Notification = require('../models/Notification');

async function createNotification(req, res) {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getUserNotifications(req, res) {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function getNotification(req, res) {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, notification });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function updateNotification(req, res) {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, notification });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

async function deleteNotification(req, res) {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = {
  createNotification,
  getUserNotifications,
  getNotification,
  updateNotification,
  deleteNotification
};
