const cron = require('node-cron');
const { User, Alert, NotificationDelivery, UserAlertPreference, Team } = require('../models');
const { Op } = require('sequelize');

// Run every hour (change the schedule as per reminder_frequency logic per alert)
cron.schedule('0 * * * *', async () => {
  const now = new Date();
  // Active, not expired alerts
  const alerts = await Alert.findAll({
    where: {
      status: 'active',
      expiry_time: { [Op.gt]: now },
      start_time: { [Op.lte]: now }
    }
  });

  for (const alert of alerts) {
    let userIds = [];

    if (alert.visibility_type === 'org') {
      // All users in org (simple: all users)
      const users = await User.findAll();
      userIds = users.map(u => u.id);
    } else if (alert.visibility_type === 'team' && alert.visibility_team_ids?.length) {
      // All users in listed teams
      const teams = await Team.findAll({
        where: { id: { [Op.in]: alert.visibility_team_ids } },
        include: [{ model: User }]
      });
      userIds = teams.flatMap(team => team.Users.map(u => u.id));
    } else if (alert.visibility_type === 'user' && alert.visibility_user_ids?.length) {
      userIds = alert.visibility_user_ids;
    }

    for (const uid of userIds) {
      // Check snooze/expiry via UserAlertPreference
      const pref = await UserAlertPreference.findOne({
        where: { alert_id: alert.id, user_id: uid }
      });

      // Skip if snoozed
      if (pref?.snoozed_until && now < pref.snoozed_until) continue;

      // Only deliver if reminder_frequency reached (calculate by last sent and alert.reminder_frequency)
      const lastDelivery = await NotificationDelivery.findOne({
        where: { alert_id: alert.id, user_id: uid },
        order: [['sent_timestamp', 'DESC']]
      });
      let shouldSend = true;
      if (lastDelivery) {
        const hoursSince = (now - lastDelivery.sent_timestamp) / (1000 * 60 * 60);
        shouldSend = hoursSince >= alert.reminder_frequency;
      }
      if (!shouldSend) continue;

      await NotificationDelivery.create({
        alert_id: alert.id,
        user_id: uid,
        sent_timestamp: now
      });
    }
  }
});
