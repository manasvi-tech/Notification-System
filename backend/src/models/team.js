module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: { type: DataTypes.STRING, allowNull: false }
  });
  Team.associate = (models) => {
    Team.hasMany(models.User, { foreignKey: 'team_id' });
  };
  return Team;
};