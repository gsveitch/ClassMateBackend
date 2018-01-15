const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

// Session Find or Create
const findOrCreateSession = (info) => {
  db.Session.findOrCreate({
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
    })
    .catch(err => {
      console.error(err)
    });
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
