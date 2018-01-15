const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');


// Student Creation
const findOrCreateTeacher = (info) => {
  return db.User.findOrCreate({
    where:{
      email: info.email,
    },
    defaults: {
      nameFirst: info.given_name,
      nameLast: info.family_name,
      email: info.email,
      photoUrl: info.picture,
      id_emergencyContact: null,
    },
  })
    .spread(({ dataValues }) => {
      return dataValues;
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports.findOrCreateTeacher = findOrCreateTeacher;
