/*
    FUNCTIONS

    GETCALENDAR

    GETDAY

    SETDAY

    RESETCALENDAR

*/

function getCalendar() {
    const jsonData = fs.readFileSync('../database.json', 'utf8');
    const calendar = JSON.parse(jsonData);
    return calendar
}