const { getCalendar } = require('./functionality/Calender'); // Using require for getCalendar
const express = require('express');
const app = express();
const { BACKEND_PORT } = require('../../frontend/src/config.json');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getCalendar', (req, res) => {
  res.send(getCalendar());
});

app.listen(BACKEND_PORT, () => {
  console.log(`Backend listening on port ${BACKEND_PORT}`);
});
