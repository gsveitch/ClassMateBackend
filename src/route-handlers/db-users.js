/* eslint-disable */

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

const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (studentPassword, hash) => {
  return bcrypt.compareSync(studentPassword, hash);
}

// Student Creation/Find
const findOrCreateStudent = (student) => {
  student.password = hashPassword(student.password);
  return db.User.findOrCreate({
    where: {
      username: student.username,
      password: student.password,
    },
    defaults: {
      username: student.username,
      password: student.password,
      nameFirst: student.nameFirst,
      nameLast: student.nameLast,
      gradeLevel: student.gradeLevel,
    },
  })
    .spread((user, created) => {
      if (created) {
        console.log(created);
      } else {
        console.log(user);
      }
      // return dataValues;
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports.findOrCreateTeacher = findOrCreateTeacher;
module.exports.findOrCreateStudent = findOrCreateStudent;
