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
            event.startTime = convertTime(calEvents[i].start);
            event.endTime = convertTime(calEvents[i].end);
            event.location = calEvents[i].location.description;
            returnEvents.push(event);
        }
        return returnEvents;
    })
    .catch(err => {
        console.log(err);
    });
};

// '2018-01-23T14:00:00Z'

const convertTime = (timeString) =>{
    const timeSplit = timeString.split('T');
    const date = timeSplit[0];
    let time = timeSplit[1];
    time = time.slice(0,8);
    let hours = time.slice(0,2);
    hours = JSON.parse(hours);
    hours = hours - 6;
    if(hours > 12){
        hours = hours - 12;
    }
    hours = hours.toString();
    time = hours+time.slice(2);
    return {date: date, time: time}
}

module.exports.getCalendar = getCalendar;
