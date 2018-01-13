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
const jwt = require('jsonwebtoken');
const db = require('../app/seeders/db.js');
 
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
        let JWT = jwt.sign({
          user: user.id
        },
        'secret', {
          expiresIn: 24 * 60 * 60
        });
        res.status(201).send(payload);
      }
    }
  );
});

module.exports = app;
