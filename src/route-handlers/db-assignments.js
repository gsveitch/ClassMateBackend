const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

// Assignment find/create
// MUST RECEIVE SESSION ID FOR ASSIGNMENT CREATION
const findOrCreateAssignment = (info) => {
  db.Assignment.findOrCreate({
    where: {
      title: info.title
    },
    defaults: {
      title: info.title,
      dueDate: info.dueDate,
      id_session: info.sessionId,
    },
  })
    .then(results => {
      console.log(results);
    })
    .catch(err => {
      console.error(err);
    });
};

// Assignment deletion
const deleteAssignment = (info) => {
  db.Assignment.destroy({
    where:{
      title: info.title,
    }
  })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.error(err);
    });
};


module.exports.findOrCreateAssignment = findOrCreateAssignment;
module.exports.deleteAssignment = deleteAssignment;