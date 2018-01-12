const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const axios = require('axios');

const feathers = require('@feathersjs/feathers');

const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const oauth2 = require('@feathersjs/authentication-oauth2');
const GoogleStrategy = require('passport-google').Strategy;


const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
require('dotenv').load();

const app = express(feathers());

// Load app configuration
app.configure(configuration());

app.configure(authentication({ secret: 'super secret' }));
app.configure(jwt());
app.configure(oauth2({
  name: 'google',
  Strategy: GoogleStrategy,
  clientID: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CALENDAR_SECRET,
  scope: ['public_profile', 'awinste@gmail.com']
}));

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

//attempted api call to google calendar

axios({
  method: 'get',
  url:'https://www.googleapis.com/calendar/v3/calendars/sfm05pn42d41k0f14gsdbkgfug@group.calendar.google.com/events'
})
  .then(response =>{
    console.log(response);
  })
  .catch(error =>{
    console.error(error);
  });

//

module.exports = app;
