import React, { useState, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import arrowLeft from './arrowleft.png';

import './Calendar.css'
const { BACKEND_PORT } = require('./config.json');
function Calendar () {

  const [data, setData] = useState(null);
  const [colorSelect, setColorSelect] = useState(null);
  const [monthNum, setmonthNum] = useState(7);
  const [yearNum, setyearNum] = useState(2024);

	const loadData = async () => {
    // try {
    //   const response = await fetch(`http://localhost:${BACKEND_PORT}/getCalendar`);
    //   const data = await response.json();
    //   setData(data);
    // } catch (error) {
    //   alert(error);
    //   newData();
    // }
    newData();
	}

  const saveData = async (data) => {
    // try {
    //   const response = await fetch(`http://localhost:${BACKEND_PORT}/setCalendar`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    //   })
    // } catch (error) {
    //   alert(error);
    // }
  }

  const newData = async () => {
    const data = createData();
    setData(data);
  }

  const createData = () => {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const data = {};
    data[currentYear] = {};
    data[currentYear][currentMonth + 1] = createMonth(currentYear, currentMonth);
    console.log(data);
    return data;
  }

  const FormatMonth  = ({month, monthNum, yearNum}) => {
    let total = 0;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const monthName = months[monthNum - 1];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const totalNumDays = Object.keys(month).length;
    if (totalNumDays === 0) return;
    const start = days.indexOf(month[1].day) % 7
    const dayArray = [];
    const divArray = [];
    // add days from prev month
    for (let j = 0; j < start; j++) {
      const temp = getDay(data, yearNum, monthNum, j - start + 1);
      dayArray.push(temp);
      total++
    }

    // add days from curr month
    for (let i = 1; i < totalNumDays + 1; i++) {
      dayArray.push(month[i]);
      total++;
    }

    // do we have too many rows
    let k = 0
    while (dayArray.length > 35) {
      let last = dayArray[dayArray.length - 1];
      dayArray[k] = last;
      k++;
      dayArray.pop();
    }
    // add days from next month
    if (!k) {
      total = total % 7;
      if (total) {
        total = 7 - total;
        for (let i = 1; i < total + 1; i++) {
          const temp = getDay(data, yearNum, monthNum + 1, i);
          dayArray.push(temp);
        }
      }
    }

    for (const day of dayArray) {
      // if of this month
      if (day.month === monthNum) {
        // if selected
        if (day.color === 'true') {
          // if at the start or end
          if (getDay(data, yearNum, day.month, day.index - 1 ).color === 'false' || getDay(data, yearNum, day.month, day.index + 1).color === 'false') {
            let newDiv = <div onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox blogger selectedBlack" key={`${day.month}${day.index}`} data={`${day.month}/${day.index}`}>
              {day.index}
              <div className='text'>{day.text}</div>
            </div>
            divArray.push(newDiv);
          } else {
            let newDiv = <div onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox blogger selected" key={`${day.month}${day.index}`} data={`${day.month}/${day.index}`}>
              {day.index}
              <div className='text'>{day.text}</div>
            </div>
            divArray.push(newDiv);
          }
        // if not selected
        } else {
          let newDiv = <div onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox blogger" key={`${day.month}${day.index}`} data={`${day.month}/${day.index}`}>
            {day.index}
            <div className='text'>{day.text}</div>
          </div>
          divArray.push(newDiv);
        }
      // if not of this month
      } else {
        if (day.color === 'true') {
          let newDiv = <div onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox blogger nonFocus selectednonFocus" key={`${day.month}${day.index}`} data={`${day.month}/${day.index}`}>
            <div className='text'>{day.text}</div>
          </div>
          divArray.push(newDiv);
        } else {
          let newDiv = <div onClick={(e) => changeColor(e.target, colorSelect)} className="dayBox blogger nonFocus" key={`${day.month}${day.index}`} data={`${day.month}/${day.index}`}>
            {day.index}
            <div className='text'>{day.text}</div>
          </div>
          divArray.push(newDiv);
        }
      }
    }
    return (
      <>
        <div className="detailsGrid">
          <div className="monthName blogger">
            <div className="test">{monthName}</div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="yearName blogger">{yearNum}</div>
        </div>
        <div className="titleGrid">
          <div className='titleBox blogger'>MON</div>
          <div className='titleBox blogger'>TUE</div>
          <div className='titleBox blogger'>WED</div>
          <div className='titleBox blogger'>THR</div>
          <div className='titleBox blogger'>FRI</div>
          <div className='titleBox blogger'>SAT</div>
          <div className='titleBox blogger'>SUN</div>
        </div>
        <div key={`${monthName}`} className="monthBox">{divArray}</div>
        <div className="controls">
          <div className="control" onClick={() => goLeft()}>
            <img className="arrowLeft" src={arrowLeft}/>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="control" onClick={() => goRight()}>
            <img className="arrowRight" src={arrowLeft}/>
          </div>
        </div>
      </>
    );
  }

  const changeColor = (target, color) => {
    let dayData = target.getAttribute('data');
    if (!dayData) {
      dayData = target.parentElement.getAttribute('data');
      let [monthNum, dayNum] = dayData.split('/');
      const parent = target.parentElement;
      const classList = Array.from(parent.classList)
      console.log(classList)
      if (classList.includes('selectedBlack') || classList.includes('selected') ) {
        console.log('yo')
        const inputBox = document.createElement('input')
        inputBox.className = 'input'
        console.log(target);
        inputBox.addEventListener('keydown', (event) => {
          if (event.keyCode === 13) {
            const newData = { ...data };
            if (inputBox.value  === '') inputBox.value = 'TEXT'
            newData[yearNum][monthNum][dayNum].text = inputBox.value.toUpperCase();
            setData(newData);
          }
        })
        parent.replaceChild(inputBox, target);
        inputBox.focus()
        return;
      }
    }
    let [monthNum, dayNum] = dayData.split('/');
    const newData = { ...data };
    if (data[yearNum][monthNum][dayNum].color === 'false') {
      newData[yearNum][monthNum][dayNum].color = 'true';
      setData(newData);
      // target.style.backgroundColor = 'white';
      console.log('changed ' + dayData)
      return;
    }
    newData[yearNum][monthNum][dayNum].color = 'false';
    setData(newData);
  }

  const getDay = (data, yearNum, monthNum, dayNum) => {
    const currNumDays = Object.keys(getMonth(data, yearNum, monthNum)).length;
    if (dayNum > currNumDays) {
      return getDay(data, yearNum, monthNum + 1, dayNum - currNumDays);
    }
    if (dayNum <= 0) {
      const numDays = Object.keys(getMonth(data, yearNum, monthNum - 1)).length;
      return getDay(data, yearNum, monthNum - 1, numDays + dayNum);
    }
    return getMonth(data, yearNum, monthNum)[dayNum];
  }

  const getMonth = (data, yearNum, monthNum) => {
    if (monthNum > 12) {
      getYear(data, yearNum + 1)[monthNum - 12] = createMonth(yearNum + 1, monthNum - 13);
      return getMonth(data, yearNum + 1, monthNum - 12)
    } else if (monthNum < 1) {
      getYear(data, yearNum - 1)[monthNum + 12] = createMonth(yearNum - 1, monthNum + 11);
      return getMonth(data, yearNum - 1, monthNum + 12)
    }
    getYear(data, yearNum);
    if (data[yearNum][monthNum] === undefined) {
      data[yearNum][monthNum] = createMonth(yearNum, monthNum - 1);
    }
    return data[yearNum][monthNum];
  }

  const getYear = (data, yearNum) => {
    if (data[yearNum] === undefined) {
      data[yearNum] = {};
    }
    return data[yearNum];
  }

  const createMonth = (yearNum, monthIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const newMonth = {};
      let date = new Date(yearNum, monthIndex, 1);
      let dayNum = 1;
      while (date.getMonth() === monthIndex) {
        newMonth[dayNum] = {
          month: monthIndex + 1,
          day: daysOfWeek[date.getDay()],
          index: dayNum,
          text: 'TEXT',
          color: 'false',
        };
        date.setDate(date.getDate() + 1);
        dayNum++;
      }
    return newMonth;
  }

  const goRight = () => {
    if (data[yearNum][monthNum + 1] === undefined) data[yearNum][monthNum + 1] = createMonth(yearNum, monthNum);
    if (monthNum === 12) {
      setyearNum(y => y + 1);
      setmonthNum(1);
    } else {
      setmonthNum(s => s + 1);
    }
  }

  const goLeft = () => {
    if (data[yearNum][monthNum - 1] === undefined) data[yearNum][monthNum - 1] = createMonth(yearNum, monthNum - 2);
    if (monthNum === 1) {
      setyearNum(y => y - 1);
      setmonthNum(12);
    } else {
      setmonthNum(s => s - 1);
    }
  }

	useEffect(() => {
    loadData();
    // setData(createData());
    let currentDate = new Date();
    setmonthNum(currentDate.getMonth() + 1);
	}, [])

  if (!data || !monthNum) {
    return (
      <>Loading...</>
    )
  }


	return (
    <>
      <FormatMonth month={getMonth(data, yearNum, monthNum)} monthNum={monthNum} yearNum={yearNum}/>
      <div className="buttons">
        <Button variant="contained" onClick={newData} style={{ backgroundColor: '#333', color: '#fff' }}>
          RESET
        </Button>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <Button variant="contained" onClick={() => saveData(data)} style={{ backgroundColor: '#333', color: '#fff' }}>
          SAVE
        </Button>
      </div>
    </>
	)
}

export default Calendar;