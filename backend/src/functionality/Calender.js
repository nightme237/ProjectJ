const fs = require('fs');
/*
    FUNCTIONS

    GETCALENDAR

    GETDAY

    SETDAY

    RESETCALENDAR

*/

function getCalendar() {
    const jsonData = fs.readFileSync('./src/database.json', 'utf8');
    if (jsonData === '') return {};
    const calendar = JSON.parse(jsonData);
    return calendar
}

function setCalendar(calendar) {
    const jsonData = JSON.stringify(calendar, null, 2);
    fs.writeFileSync('./src/database.json', jsonData);
}

module.exports = { getCalendar, setCalendar };