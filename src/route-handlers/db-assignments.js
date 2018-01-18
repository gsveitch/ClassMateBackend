const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

// Assignment find/create
// MUST RECEIVE SESSION ID FOR ASSIGNMENT CREATION
const findOrCreateAssignment = (info) => {
  console.log(info.sessionId, 'sessionId from findOrCreate Assignment')
  return db.Assignment.findOrCreate({
    where: {
      title: info.title
    },
    defaults: {
      id_session: info.sessionId,
      title: info.title,
      dueDate: info.dueDate,
    },
  })
    .then(results => {
      return results;
    })
    .catch(err => {
      console.error(err);
    });
};

// Assignment findAll for DueDates
const findAssignment = (id) => {
  return db.Assignment.findAll({
    where:{
      id_session: id
    },
  })
    .then(results => {
      const dueDates = [];
      results.forEach(el => dueDates.push([el.title, el.dueDate]));
      return dueDates;
    })
    .catch(err => console.error(err));
};

// Assignment deletion
const deleteAssignment = (info) => {
  return db.Assignment.destroy({
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
module.exports.findAssignment = findAssignment;
