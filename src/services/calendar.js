/* eslint-disable */

const cronofy = require('cronofy');

const calEvents = [];
const returnEvents = [];

const getCalendar = (client, calendarName) => {
    
    var options = {
        tzid: 'America/Chicago'
    };

    return client.readEvents(options)
    .then(function (events) {
        for(let i=0; i<events.events.length; i++){
            if(events.events[i].summary === calendarName){
                calEvents.push(events.events[i]);
            }
        }
        for(let i=0; i<calEvents.length; i++){
            let event = {
                summary: '',
                description: '',
                startTime: '',
                endTime: '',
                location: '',
            }
            event.summary = calEvents[i].summary;
            event.description = calEvents[i].description;
            event.startTime = calEvents[i].start;
            event.endTime = calEvents[i].end;
            event.location = calEvents[i].location.description;
            returnEvents.push(event);
        }
        return returnEvents;
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports.getCalendar = getCalendar;
