const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const jwt = require('jsonwebtoken');
const db = require('../app/seeders/db.js');
const userDB = require('./route-handlers/db-users.js');
const assignmentDB = require('./route-handlers/db-assignments.js');
const sessionDB = require('./route-handlers/db-sessions.js');
const participantDB = require('./route-handlers/db-participants.js');
const cronofy = require('cronofy');
const calApi = require('./services/calendar.js'); 
 
const OAuth2 = google.auth.OAuth2;
const app = express(feathers());

require('dotenv').load();

app.configure(configuration());

app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

app.use('/', express.static(app.get('public')));

app.configure(express.rest());
app.configure(socketio());
app.configure(middleware);
app.configure(services);
app.configure(channels);

app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

// ===============================
// User login/creations ==========
// ===============================
app.post('/login', (req,res) => {
  const user = new OAuth2(process.env.GOOGLE_CALENDAR_CLIENT_ID, process.env.GOOGLE_CALENDAR_SECRET, '');
  user.verifyIdToken(
    req.body.idtoken,
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    (err, login) =>{
      if(err){
        console.error(err);
      }else{
        let userPayload = login.getPayload();
        let JWT = jwt.sign({
          user: user.id
        },
        'secret', {
          expiresIn: 24 * 60 * 60
        });
      
        let client = new cronofy({
          access_token: process.env.CRONOFY_ACCESS_TOKEN,
        });
        
        //call calendar API for calendar events
        const calendarName = '5th Grade';
        calApi.getCalendar(client, calendarName);

        userDB.findOrCreateTeacher(userPayload)
          .then((response) => {
            teacher = response;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  );
});

app.post('/studentLogin', (req,res) => {
  const student = {username: req.body.userName, password: req.body.password};
  userDB.findStudent(student)
    .then(student => res.status(201).send(student))
    .catch(err => console.error(err));
});

app.post('/studentCreate', (req, res) => {
  const student = { username: req.body.userName, password: req.body.password };
  userDB.findOrCreateStudent(student)
    .then(student => res.status(201).send(student))
    .catch(err => console.error(err));
});

// ===============================

// ===============================
// Session Routes ================
// ===============================
app.get('/addClass', (req, res) => {
  const session = {
    description: 'Maths',
    joinCode: 'abc123',
  };
  sessionDB.findOrCreateSession(session)
    .then(result => res.status(201).send(result))
    .catch(err => console.error(err));
});
// ===============================


// ===============================
// Participant Routes ============
// ===============================
app.get('/joinClass', (req, res) => {
  const participant = {
    userId: 3,
    joinCode: 'abc123',
  };
  participantDB.addParticipant(participant)
    .then(result => res.status(201).send(result))
    .catch(err => console.error(err));
});
// ===============================

module.exports = app;
