const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const axios = require('axios');
const passport = require('passport');
const GoogleAuth = require('google-auth-library');
const google = require('googleapis');

const feathers = require('@feathersjs/feathers');

const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
require('dotenv').load();

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express(feathers());
var OAuth2 = google.auth.OAuth2;

// Load app configuration
app.configure(configuration());

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
// app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CALENDAR_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CALENDAR_SECRET,
  callbackURL: `https://www.googleapis.com/calendar/v3/calendars/sfm05pn42d41k0f14gsdbkgfug%40group.calendar.google.com/events?key=${this.clientID}`
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('successful authentication');
    res.redirect('/');
  });

app.post('/login', (req, res) =>{
  console.log('post in server being hit');
  var oauth2Client = new OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_SECRET,
  );

  var scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

  

});

// axios({
//   method: 'get',
//   url:'https://www.googleapis.com/calendar/v3/calendars/sfm05pn42d41k0f14gsdbkgfug@group.calendar.google.com/events'
// })
//   .then(response =>{
//     console.log(response);
//   })
//   .catch(error =>{
//     console.error(error);
//   });

module.exports = app;
