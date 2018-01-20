const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');
const assignment = require('./db-assignments.js');

// const makeJoinCode = () => {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < 5; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));

//   return text;
// };

// Session Find or Create
const findOrCreateSession = (info) => {
  return db.Session.findOrCreate({
    where:{
      id: info.id,
      description: info.description,
    },
    defaults:{
      description: info.description,
      calendarId: null,
      joinCode: info.joinCode,
    },
  })
    .spread(result => {
      return result;
    })
    .catch(err => {
      console.error(err);
    });
};

//Get Sessions related to User
const getSessions = (userId) => {
  return db.Participant.findAll({
    where:{
      id_user: userId
    },
  })
    .then(sessions => {
      const sessionIds = [];
      const participantIds = [];
      sessions.forEach(el => sessionIds.push(el.dataValues.id_session));
      sessions.forEach(el => participantIds.push(el.dataValues));
      // console.log(sessionIds);
      // console.log(participantIds);
      return db.Session.findAll({
        where:{
          id: sessionIds,
        },
      })
        .then(names => {
          const sessions = [];
          names.forEach(el => {
            participantIds.forEach(id => {
              if (el.dataValues.id === id.id_session) {
                sessions.push({sessionID: el.dataValues.id, sessionName: el.dataValues.description, participantID: id.id});
              }
            });
          });
          console.log(sessions);
          return assignment.findAssignment(sessionIds)
            .then(assignments => {
              const format = {
                assignments,
                sessions,
              };
              return format;
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

// Session Update
const updateSession = (info) => {
  db.Session.update(
    // set update attributes here
    {},
    // where clause / criteria for updating
    { description: info.description }
  )
    .then(result => {
      // console.log(result);
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports.findOrCreateSession = findOrCreateSession;
module.exports.updateSession = updateSession;
module.exports.getSessions = getSessions;
