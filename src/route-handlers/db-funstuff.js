const Sequelize = require('sequelize');
const db = require('../../app/seeders/db.js');


const createFunStuff = (sessionId, link, type) => {
  return db.FunStuff.findOrCreate({
    where: {
      link: link
    },
    defaults: {
      link,
      type,
      id_session: sessionId,
    },
  })
    .then(results => {
      // console.log(results, 'results in createFunStuff');
      return results[0].dataValues;
    })
    .catch(err => {
      console.error(err);
    });
};

const findFunStuff = (sessionId) => {
  return db.FunStuff.findAll({
    where:{
      id_session: sessionId
    },
  })
    .then(results => {
      let funStuff = [];
      // console.log(results, 'results of findFunStuff');
      results.forEach(el => funStuff.push(el.dataValues));
      return funStuff;
    })
    .catch(err => console.error(err));
};



module.exports.createFunStuff = createFunStuff;
module.exports.findFunStuff = findFunStuff;
