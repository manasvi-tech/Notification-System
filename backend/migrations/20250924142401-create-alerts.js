'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      severity: {
        type: Sequelize.ENUM('info', 'warning', 'critical'),
        allowNull: false
      },
      delivery_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'in-app'
      },
      reminder_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expiry_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'archived', 'expired'),
        allowNull: false,
        defaultValue: 'active'
      },
      visibility_type: {
        type: Sequelize.ENUM('org', 'team', 'user'),
        allowNull: false
      },
      visibility_team_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      visibility_user_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alerts');
  }
};
