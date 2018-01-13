const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const axios = require('axios');
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
var gcal = require('google-calendar');
const jwt = require('jsonwebtoken');

const OAuth2 = google.auth.OAuth2;

require('dotenv').load();

const app = express(feathers());

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

app.post('/login', (req,res) => {
  const user = new OAuth2(req.body.idtoken, '', '');
  user.verifyIdToken(
    req.body.idtoken,
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    (err, login) =>{
      if(err){
        console.error(err);
      }else{
        let payload = login.getPayload();
        // let JWT = jwt.sign({
        //   user: user.id
        // },
        // 'secret', {
        //   expiresIn: 24 * 60 * 60
        // });

        let jwtClient = new google.auth.JWT(
          payload.email,
          null,
          process.env.GOOGLE_CALENDAR_CLIENT_ID,
          scopes
        );
        jwtClient.authorize((err, tokens) =>{
          if(err){
            console.error(err);
          }else{
            console.log('connected successfully!');
          }
        });
        
        res.status(201).send(payload);
      }
    }
  );
});

module.exports = app;
