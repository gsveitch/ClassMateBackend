/* eslint-disable */

const cronofy = require('cronofy');

const getCalendar = (client, calendarName) => {
    
    var options = {
        tzid: 'Etc/UTC'
    };

    client.listCalendars(options)
    .then(function (response) {
        console.log('calendars available for list');
    })
    .catch(err => {
        console.log(err);
    });

    client.readEvents(options)
    .then(function (response) {
        console.log('calendar events available');
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports.getCalendar = getCalendar;
