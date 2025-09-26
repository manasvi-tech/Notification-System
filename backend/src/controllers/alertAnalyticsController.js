const { Alert, NotificationDelivery, UserAlertPreference } = require('../models');
const { Op, fn, col } = require('sequelize');

exports.analytics = async (req, res) => {
  const totalAlerts = await Alert.count();
  const delivered = await NotificationDelivery.count();
  const readPrefs = await UserAlertPreference.count({ where: { is_read: true } });
  const snoozedPrefs = await UserAlertPreference.count({ where: { snoozed_until: { [Op.gt]: new Date() } } });

  const bySeverity = await Alert.findAll({
    attributes: ['severity', [fn('COUNT', col('id')), 'count']],
    group: ['severity']
  });

  res.json({ totalAlerts, delivered, readPrefs, snoozedPrefs, bySeverity });
};
