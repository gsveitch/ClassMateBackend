import { find } from 'node-pre-gyp';

const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');

// create Emergency Contact
const createEmergencyContact = (info) => {
  db.EmergencyContact.create({
    nameFirst: info.nameFirst,
    nameLast: info.nameLast,
    address: info.address,
    phone: info.phone,
    email: info.email,
  })
    .then(result => {
      console.log(result);
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
