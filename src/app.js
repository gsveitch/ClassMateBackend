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

const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
// ===============================
// User Route handlers ===========
// ===============================

app.post('/login', (req,res) => {
  const client = new OAuth2(process.env.GOOGLE_CALENDAR_CLIENT_ID, process.env.GOOGLE_CALENDAR_SECRET, '');
  client.verifyIdToken(
    req.body.idtoken,
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    (err, login) =>{
      if(err){
        console.error(err);
      }else{
        let userPayload = login.getPayload();
        let JWT = jwt.sign({
          client: client.id
        },
        'secret', {
          expiresIn: 24 * 60 * 60
        });
        userDB.findOrCreateTeacher(userPayload)
          .then((teacher) => {
            res.status(201).send(teacher);
          });
      }
    }
  );
});

app.post('/studentLogin', (req,res) => {
  let student = {username: req.body.userName, password: req.body.password};
  userDB.findOrCreateStudent(student);
  res.status(201).send('student login successful');
});

      //   function authorize(credentials) {
      //     var clientSecret = process.env.GOOGLE_CALENDAR_SECRET;
      //     var clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
      //     var redirectUrl = '';
      //     var auth = new googleAuth();
      //     var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
      //     oauth2Client.credentials = JSON.parse(token);
      //   }
      // }

    //   let calendar = google.calendar('v3');

    //   calendar.events.list({
    //     auth: client,
    //     calendarId: 'sfm05pn42d41k0f14gsdbkgfug@group.calendar.google.com',
    //   }, (err, response) =>{
    //     if(err){
    //       console.error('The API returned error: ',err);
    //       return;
    //     }else{
    //       console.log('response from API is ', response);
    //     }
    //   });
    //   res.status(201).send(userPayload);
    // });

module.exports = app;
