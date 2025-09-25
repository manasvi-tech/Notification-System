const { UserAlertPreference, User, Alert } = require('../models');

// Create or set preference for user/alert
exports.setPreference = async (req, res) => {
  try {
    const { alert_id, user_id, is_read, snoozed_until } = req.body;
    if (!alert_id || !user_id)
      return res.status(400).json({ error: "alert_id and user_id required" });

    let pref = await UserAlertPreference.findOne({ where: { alert_id, user_id } });

    if (pref) {
      await pref.update({ is_read, snoozed_until });
    } else {
      pref = await UserAlertPreference.create({ alert_id, user_id, is_read, snoozed_until });
    }

    res.status(201).json(pref);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

// Mark an alert as read
exports.markRead = async (req, res) => {
  try {
    const { alert_id } = req.body;
    const user_id = req.user.id; // assumes authentication
    let pref = await UserAlertPreference.findOne({ where: { alert_id, user_id } });

    if (!pref) {
      pref = await UserAlertPreference.create({ alert_id, user_id, is_read: true });
    } else {
      await pref.update({ is_read: true });
    }
    res.json(pref);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Snooze an alert for the user
exports.snooze = async (req, res) => {
  try {
    const { alert_id, snoozed_until } = req.body;
    const user_id = req.user.id; // assumes authentication

    let pref = await UserAlertPreference.findOne({ where: { alert_id, user_id } });

    // Build new history
    let snooze_history = pref?.snooze_history || [];
    snooze_history = [...snooze_history, { snoozed_at: new Date(), until: snoozed_until }];

    if (!pref) {
      pref = await UserAlertPreference.create({
        alert_id,
        user_id,
        snoozed_until,
        snooze_history
      });
    } else {
      await pref.update({ snoozed_until, snooze_history });
    }
    res.json(pref);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Get all preferences for a user
exports.listMyPrefs = async (req, res) => {
  try {
    const user_id = req.user.id;
    const prefs = await UserAlertPreference.findAll({
      where: { user_id },
      include: [{ model: Alert }]
    });
    res.json(prefs);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
