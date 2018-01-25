const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

// Create Badges
const createBadges = (info) => {
  db.Badge.create({
    icon: info.icon,
    description: info.description,
  })
    .then(result => {
      // console.log(result);
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports.createBadges = createBadges;
