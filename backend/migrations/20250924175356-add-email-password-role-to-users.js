'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'email', { type: Sequelize.STRING, allowNull: false, unique: true });
    await queryInterface.addColumn('Users', 'password', { type: Sequelize.STRING, allowNull: false });
    await queryInterface.addColumn('Users', 'role', { type: Sequelize.STRING });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'email');
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'role');
  }
};
