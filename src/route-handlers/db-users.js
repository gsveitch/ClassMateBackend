const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');


// Teacher Creation/Find
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

// Student Creation/Find
const findOrCreateStudent = (info) => {
  return db.User.findOrCreate({
    where: {
      nameFirst: info.nameFirst,
      nameLast: info.nameLast,
    },
    defaults: {
      username: info.username,
      password: info.password,
      nameFirst: info.nameFirst,
      nameLast: info.nameLast,
      gradeLevel: info.gradeLevel,
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
module.exports.findOrCreateStudent = findOrCreateStudent;
