const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');
const participantDB = require('./db-participants');
const homeworkDB = require('./db-homework');

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
      results.forEach(el => dueDates.push({id: el.id, title: el.title, dueDate: el.dueDate, sessionId: el.id_session}));
      return dueDates;
    })
    .catch(err => console.error(err));
};

// Assignment deletion
const deleteAssignment = (info) => {
  return db.Assignment.destroy({
    where:{
      id: info.id,
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

const checkAssignment = (sessionId) => {
  return participantDB.searchParticipants(sessionId)
    .then(participants => {
      return participants;
    })
    .catch(err => console.error(err));
};

const specificAssignment = (sessionId, assignmentId) => {
  return checkAssignment(sessionId)
    .then(results => {
      // console.log(results, 'results from check assignment');
      const ids = [];
      results.forEach(res => ids.push(res.id_participant));
      return homeworkDB.findHomework(ids, assignmentId)
        .then(res => {
          const format = [];
          res.forEach(el => {
            if (ids.includes(el.id_participant)) {
              format.push({ id_participant: el.id_participant, photoUrl: el.photoUrl });
            }
          });
          format.forEach(le => {
            results.forEach(element => {
              if (element.id_participant === le.id_participant) {
                element.photoUrl = le.photoUrl;
              }
            });
          });
          return results;
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

module.exports.findOrCreateAssignment = findOrCreateAssignment;
module.exports.deleteAssignment = deleteAssignment;
module.exports.findAssignment = findAssignment;
module.exports.checkAssignment = checkAssignment;
module.exports.specificAssignment = specificAssignment;
