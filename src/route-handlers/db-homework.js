const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

const uploadHomework = (id, photoUrl) => {
  db.Homework.create({
    id_participant: id,
    photoUrl
  })
    .then(result => result)
    .catch(err => console.error(err));
};


module.exports.uploadHomework = uploadHomework;