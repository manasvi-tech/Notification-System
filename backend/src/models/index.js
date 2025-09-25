'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all model files in this directory (skip hidden and index.js)
fs
  .readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&         // Not hidden
    file !== basename &&               // Not this index.js file
    file.slice(-3) === '.js' &&        // Is a .js file
    !file.endsWith('.test.js')         // Not a test file
  ))
  .forEach(file => {
    // Import model and pass sequelize instance and DataTypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Register model by its name
  });

// Setup model associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize instance and all models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
