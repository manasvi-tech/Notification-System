module.exports = (sequelize, DataTypes) => {
  const UserAlertPreference = sequelize.define('UserAlertPreference', {
    is_read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    snoozed_until: { type: DataTypes.DATE },
    snooze_history: { type: DataTypes.JSONB, allowNull: true }, // [{snoozed_at: Date}]
  });
  UserAlertPreference.associate = (models) => {
    UserAlertPreference.belongsTo(models.User, { foreignKey: 'user_id' });
    UserAlertPreference.belongsTo(models.Alert, { foreignKey: 'alert_id' });
  };
  return UserAlertPreference;
};