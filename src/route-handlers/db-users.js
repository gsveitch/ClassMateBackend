const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;


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
const findOrCreateStudent = (student) => {
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(student.password, salt, (err, hash) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log('student is ', student);
  //       student.password = hash;
  //       console.log('student username: ', student.username);
  //       console.log('student hashed password: ', student.password);
  //     }
  //   });
  // });
  return db.User.findOrCreate({
    where: {
      username: student.username,
    },
    defaults: {
      username: student.username,
      password: student.password,
      nameFirst: student.nameFirst,
      nameLast: student.nameLast,
      gradeLevel: student.gradeLevel,
      id_emergencyContact: null,
    },
  })
    .spread((found, created) => {
      const format = {
        newUser: true,
        info: found.dataValues
      };
      if (created) {
        return format;
      } else {
        return found.dataValues;
      }
    })
    .catch(err => {
      console.error(err, 'this is error in catch');
    });
};

module.exports.findOrCreateTeacher = findOrCreateTeacher;
module.exports.findOrCreateStudent = findOrCreateStudent;
