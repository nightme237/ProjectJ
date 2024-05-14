import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import './Calendar.css'
const { BACKEND_PORT } = require('./config.json');
function Calendar () {

  const [calendar, setCalendar] = useState(null);
  const [colorSelect, setColorSelect] = useState(null);

	const loadCalendar = async () => {
    try {
      const response = await fetch(`http://localhost:${BACKEND_PORT}/getCalendar`);
      const data = await response.json();
      setCalendar(data.calendar);
    } catch (error) {
      alert(error);
    }
	}

  const saveCalendar = async (calendar) => {
    try {
      const response = await fetch(`http://localhost:${BACKEND_PORT}/setCalendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ calendar: calendar })
      })
    } catch (error) {
      alert(error);
    }
  }

  const newCalendar = async () => {
    const calendar = createCalendar();
    console.log(calendar);
    setCalendar(calendar);
  }

  const createCalendar = () => {
    const year = (new Date()).getFullYear();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const calendar = [];

    for (let month = 0; month < 12; month++) {
      const monthCalendar = [];
      const date = new Date(year, month, 1);
      let dayIndex = 1;
      while (date.getMonth() === month) {
        const day = {
          day: daysOfWeek[date.getDay()],
          index: dayIndex,
          color: 'white',
        };
        monthCalendar.push(day); // Push a new Date object to avoid mutating the original date
        date.setDate(date.getDate() + 1);
        dayIndex++;
      }
      calendar.push(monthCalendar);
    }
    return calendar;
  }

  const FormatMonth  = (month, monthIndex) => {
    // month = month.month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const monthName = months[monthIndex];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const start = days.indexOf(month[1].day)
    const father = <div className="monthBox"></div>
    const array = [];
    for (let i = 0; i < start; i++) {
      const newDiv = <div key={`${monthName}${i - start}`} onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox">
      </div>
      array.push(newDiv);
    }
    for (const day of month) {
      const newDiv = <div onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox" key={`${monthName}${day.index}`} style={ { backgroundColor: `${day.color}` } } data={`${monthIndex}/${day.index - 1}`}>
        {day.index}
      </div>
      array.push(newDiv);
    }
    return (
      <>
        <h1>{monthName}</h1>
        <div key={`${monthName}`} className="monthBox">{array}</div>
      </>
    );
  }

  const FormatYear = (calendar) => {
    const year = calendar.calendar;
    const array = [];
    for (let i = 0; i < year.length; i++) {
      const newDiv = FormatMonth(year[i], i);
      array.push(<div key={i}>{newDiv}</div>);
    }
    return (
      <>
        {array}
      </>
    );
  };
  const changeColor = (target, color) => {
    const data = target.getAttribute('data');
    const [monthIndex, dayIndex] = data.split('/');
    const newCalendar = [ ...calendar ];
    if (target.style.backgroundColor === color) {
      newCalendar[monthIndex][dayIndex].color = 'white';
      setCalendar(newCalendar)
      // target.style.backgroundColor = 'white';
      return;
    }
    // target.style.backgroundColor = color;
    newCalendar[monthIndex][dayIndex].color = color;
    setCalendar(newCalendar)
  }

	useEffect(() => {
    loadCalendar();
	}, [])

  if (!calendar) {
    return (
      <>Loading...</>
    )
  }


	return (
    <>
      <Button variant="contained" onClick={createCalendar}>TEST</Button>
      <Button variant="contained" onClick={newCalendar}>RESET</Button>
      <Button variant="contained" onClick={() => saveCalendar(calendar)}>SAVE</Button>
      <Button variant="contained" onClick={(e) => { setColorSelect('rgb(173, 216, 230)'); } }>
        <FitnessCenterIcon></FitnessCenterIcon>
      </Button>
      <div className="titleGrid">
        <div className='titleBox'>Monday</div>
        <div className='titleBox'>Tuesday</div>
        <div className='titleBox'>Wednesday</div>
        <div className='titleBox'>Thursday</div>
        <div className='titleBox'>Friday</div>
        <div className='titleBox'>Saturday</div>
        <div className='titleBox'>Sunday</div>
      </div>
      {/* <FormatMonth month={calendar[4]} monthIndex={4}/> */}
      <FormatYear calendar={calendar}></FormatYear>
    </>
	)
}

export default Calendar;