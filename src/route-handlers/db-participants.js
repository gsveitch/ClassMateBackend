const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');


// Creation of Participant into session

const addParticipant = (info) => {
  // find session associated with info.joinCode. save sessionID and name of class
  // figure out what piece of data can be sent to determine whether or not the user in question is a teacher or student
  // possibly email? if info.email ? participantType = 2 | participantType = 1
  // use sessionID along with info.userID to create a participant in that particular session
  // send back participant info( which will include sessionID ), as well as the saved name of class
  const user = info.userId;
  const type = info.email ? 2 : 1;
  return db.Session.findAll({
    where:{
      joinCode: info.joinCode,
    },
  })
    .then(result => {
      console.log(result);
      const className = result.description;
      const classId = result.id;
      db.Participant.findOrCreate({
        where:{
          id_user: user,
        },
        defaults:{
          id_user: user,
          id_session: classId,
          id_participant_type: type
        },
      })
        .then(result => {
          console.log(result);
          const format = {
            participantId: result.id,
            sessionId: classId,
            className: className,
          };
          return format;
        })
        .catch(err => {
          console.error(err, 'inner create participant error')
        })
    })
    .catch(err => {
      console.error(err, 'outer create participant error');
    });
};

module.exports.addParticipant = addParticipant;
