module.exports = (sequelize, DataTypes) => {
  const NotificationDelivery = sequelize.define('NotificationDelivery', {
    sent_timestamp: { type: DataTypes.DATE, allowNull: false }
  });
  NotificationDelivery.associate = (models) => {
    NotificationDelivery.belongsTo(models.User, { foreignKey: 'user_id' });
    NotificationDelivery.belongsTo(models.Alert, { foreignKey: 'alert_id' });
  };
  return NotificationDelivery;
};