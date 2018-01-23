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

const findHomework = (arr) => {
  return db.Homework.findAll({
    where: {
      id_participant: arr
    },
  })
    .then(results => results)
    .catch(err => console.error(err));
}


module.exports.uploadHomework = uploadHomework;
module.exports.findHomework = findHomework;