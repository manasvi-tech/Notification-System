module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    team_id: { type: DataTypes.INTEGER }
  });
  User.associate = (models) => {
    User.belongsTo(models.Team, { foreignKey: 'team_id' });
    User.hasMany(models.NotificationDelivery, { foreignKey: 'user_id' });
    User.hasMany(models.UserAlertPreference, { foreignKey: 'user_id' });
  };
  return User;
};