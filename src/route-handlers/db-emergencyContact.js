const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

// create Emergency Contact
const createEmergencyContact = (info, userId) => {
  return db.EmergencyContact.create({
    nameFirst: info.nameFirst,
    nameLast: info.nameLast,
    address: info.address,
    email: info.phone,
  })
    .then(result => {
      // console.log(result, 'result of createEmergencyContact');
      const emergencyContactId = result.dataValues.id; 
      // console.log(userId, 'userId in .then of createEmergencyContact');
      db.User.update({ id_emergencyContact: emergencyContactId }, { where: { id: userId } })
        .then(user => {
          const format = {
            result,
            user
          };
          return format;
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
      console.error('error in create emergency contact', err);
    });
};

const findEmergencyContact = (id) => {
  db.EmergencyContact.find({
    where:{
      id: id
    },
  })
    .then(result => result)
    .catch(err => console.error(err));
};

module.exports.createEmergencyContact = createEmergencyContact;
module.exports.findEmergencyContact = findEmergencyContact;
