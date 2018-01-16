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
const cronofy = require('cronofy');
 
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

app.post('/login', (req,res) => {
  const user = new OAuth2(process.env.GOOGLE_CALENDAR_CLIENT_ID, process.env.GOOGLE_CALENDAR_SECRET, '');
  let teacher;
  let requestedCalendar = [];
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
          access_token: 't5cezkIyHkr2pU-w1c9Q6fneYdhyqu_e',
        });
        var options = {
          tzid: 'Etc/UTC'
        };

        client.listCalendars(options)
          .then(function (response) {
            console.log('calendars available for list');
            // var calendars = response.calendars;
          })
          .catch(err => {
            console.log(err);
          });
    
        client.readEvents(options)
          .then(function (response) {
            console.log('calendar events available');
            let teacherCalendar = response.events;
            for(let i=0; i<teacherCalendar.length; i++){
              if(teacherCalendar[i].organizer.display_name === '5th Grade'){
                requestedCalendar.push(teacherCalendar[i]);
              }
            }
            sendTeacher(teacher, requestedCalendar);
            // console.log('teacher calendar is ', teacherCalendar);
          })
          .catch(err => {
            console.log(err);
          });

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
  const sendTeacher = (teach, calendar) => {
    console.log('teacher is ', teach);
    console.log('teacher calendar is ', calendar);
    res.status(201).send({teacherData: teach, calendarData: calendar});
  }
});

app.post('/studentLogin', (req,res) => {
  let student = {username: req.body.userName, password: req.body.password};
  userDB.findOrCreateStudent(student);
  res.status(201).send('student login successful');
});

module.exports = app;
