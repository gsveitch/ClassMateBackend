const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

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
      console.log(result);
      return result;
    })
    .catch(err => {
      console.error(err)
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
      sessions.forEach(el => sessionIds.push(el.dataValues.id_session));
      return db.Session.findAll({
        where:{
          id: sessionIds,
        },
      })
        .then(names => {
          const sessionNames = [];
          names.forEach(el => sessionNames.push(el.dataValues.description));
          const format = {
            sessionIds,
            sessionNames,
          };
          return format;
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
      console.log(result)
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports.findOrCreateSession = findOrCreateSession;
module.exports.updateSession = updateSession;
module.exports.getSessions = getSessions;
