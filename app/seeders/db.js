const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const env = 'development';
const config = require('../config/config.json')[env];

const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, 'models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.authenticate().then(() => {
  console.log('DB Connected');
}).catch((err) => {
  console.error(err);
});

module.exports = db;
