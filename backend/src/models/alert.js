module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    severity: { type: DataTypes.ENUM('info', 'warning', 'critical'), allowNull: false },
    delivery_type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'in-app' },
    reminder_frequency: { type: DataTypes.INTEGER, allowNull: false }, // e.g., hours
    start_time: { type: DataTypes.DATE, allowNull: false },
    expiry_time: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('active', 'archived', 'expired'), allowNull: false, defaultValue: 'active' },
    visibility_type: { type: DataTypes.ENUM('org', 'team', 'user'), allowNull: false },
    visibility_team_ids: { type: DataTypes.ARRAY(DataTypes.INTEGER) }, // For team-level
    visibility_user_ids: { type: DataTypes.ARRAY(DataTypes.INTEGER) }, // For user-level
  });
  Alert.associate = (models) => {
    Alert.hasMany(models.NotificationDelivery, { foreignKey: 'alert_id' });
    Alert.hasMany(models.UserAlertPreference, { foreignKey: 'alert_id' });
    Alert.belongsTo(models.User, { as: 'creator', foreignKey: 'created_by' });
  };
  return Alert;
};