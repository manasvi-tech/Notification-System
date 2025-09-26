const { Alert } = require('../models');

// Create an alert
exports.create = async (req, res) => {
  try {
    const {
      title,
      message,
      severity,
      delivery_type,
      reminder_frequency,
      start_time,
      expiry_time,
      status,
      visibility_type,
      visibility_team_ids,
      visibility_user_ids
    } = req.body;

    // Basic required field validation
    if (
      !title || !message || !severity || !delivery_type ||
      !reminder_frequency || !start_time || !expiry_time || !status || !visibility_type
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const alert = await Alert.create({
      title,
      message,
      severity,
      delivery_type,
      reminder_frequency,
      start_time,
      expiry_time,
      status,
      visibility_type,
      visibility_team_ids,
      visibility_user_ids,
      created_by: req.user.id // assumes req.user.id from authentication
    });

    res.status(201).json(alert);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

// List all alerts
exports.list = async (req, res) => {
  try {
    const alerts = await Alert.findAll();
    res.json(alerts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get an alert by ID
exports.get = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json(alert);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Update an alert
exports.update = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Protect update: Only creator or any admin can update
    if (req.user.role !== 'admin' && alert.created_by !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: Not allowed to update this alert' });
    }

    await alert.update(req.body);
    res.json({ message: 'Updated', alert });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


// Delete an alert
exports.delete = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Protect delete: Only creator or any admin can delete
    if (req.user.role !== 'admin' && alert.created_by !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: Not allowed to delete this alert' });
    }

    await alert.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

