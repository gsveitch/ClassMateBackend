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

// LOCAL AUTH
// ============================
const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (studentPassword, hash) => {
  return bcrypt.compareSync(studentPassword, hash);
}
// =============================


// Student Creation/Find
const findOrCreateStudent = (student) => {
  student.password = hashPassword(student.password);
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
      if (found.dataValues.id_emergencyContact !== null) {

      }
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

//Find Student
// const findStudent = (student) => {
//   return db.User.find({
//     where:{
//       username: student.username
//     }, 
//   })
//   .then(result => {
//     if (comparePassword(student.password, result.password)) {
//       return result;
//     } else {
//       return 'Failed Login Attempt';
//     }
//   })
//   .catch(err => console.error(err));
// };

const findStudentInfo = (id) => {
  return db.User.find({
    where: {
      id: id
    },
  })
    .then(result => {
      const student = result.dataValues
      return db.EmergencyContact.find({
        where: {
          id: student.id_emergencyContact
        },
      })
      .then(emergencyContact => {
        const format = {
          student,
          emergencyContact
        }
        return format;
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

module.exports.findOrCreateTeacher = findOrCreateTeacher;
module.exports.findOrCreateStudent = findOrCreateStudent;
// module.exports.findStudent = findStudent;
module.exports.findStudentInfo = findStudentInfo;
