const { getCalendar, setCalendar } = require('./functionality/Calender.js'); // Using require for getCalendar
const express = require('express');
const { BACKEND_PORT } = require('../../calendar/src/config.json');

const app = express();
app.use(express.json());

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

app.post('/setCalendar', (req, res) => {
  res.send(setCalendar(req.body));
});

app.listen(BACKEND_PORT, () => {
  console.log(`Backend listening on port ${BACKEND_PORT}`);
});
