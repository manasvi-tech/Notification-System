const { NotificationDelivery, User, Alert } = require('../models');

// Create a notification delivery (send alert to a user)
exports.create = async (req, res) => {
  try {
    const { alert_id, user_id, sent_timestamp } = req.body;
    if (!alert_id || !user_id || !sent_timestamp)
      return res.status(400).json({ error: 'Missing required fields' });

    // Optionally check if User/Alert exist
    const notification = await NotificationDelivery.create({
      alert_id,
      user_id,
      sent_timestamp
    });

    res.status(201).json(notification);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

// List all notification deliveries
exports.list = async (req, res) => {
  try {
    const notifications = await NotificationDelivery.findAll({
      include: [{ model: User }, { model: Alert }]
    });
    res.json(notifications);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get a single notification delivery by id
exports.get = async (req, res) => {
  try {
    const notification = await NotificationDelivery.findByPk(req.params.id, {
      include: [{ model: User }, { model: Alert }]
    });
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
