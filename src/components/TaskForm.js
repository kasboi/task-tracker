import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../style/TaskForm.module.css'
import { SUBMIT_LINK, TOKEN } from '../handlers/token';


import { useSelector, useDispatch } from 'react-redux';
import { descAction, dateAction, timeAction, timeZoneAction } from '../redux/formData';

const FormContainer = styled.form`
  display: 'block';
  background: #e6fcf5;
  box-shadow: 1px 1px 5px rgba(0,0,0, .35);
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  overflow: hidden;
`

function TaskForm({ setTask }) {
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())


  function dateConvert (date){
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();
  
    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  }

  function timeConvert (date){
    let hh = date.getHours() * 60
    let mm = date.getMinutes()
    return (hh + mm) * 60
  }
  function timeZoneConversion (date){
    return date.getTimezoneOffset() * 60 
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    dispatch(descAction(''))
    
    fetch(SUBMIT_LINK, {
      method: "POST",
      headers: {
                'Authorization': 'Bearer ' + TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json'          
              },
        body: JSON.stringify({
                      assigned_user: user_id, 
                      task_date: date,
                      task_time: time,
                      is_completed: 0,
                      time_zone: timeZone,
                      task_msg: description
                    })
    }).then(() => setTask(true))
  }

  const dispatch = useDispatch()
  const { description, date, time, timeZone, user_id } = useSelector(state => state.form)
  
  useEffect(() => {
    dispatch(dateAction(dateConvert(startDate)))
    dispatch(timeAction(timeConvert(startTime)))
    dispatch(timeZoneAction(timeZoneConversion(startTime)))

  }, [startDate, startTime])
  

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div className={styles.form__container}>
        <label htmlFor="description">Task Description</label>
        <input type="text" name="description" id="description" 
          value={description}
          onChange={(e) => dispatch(descAction(e.target.value))}
        />
      </div>
      <div className={styles.form__combined}>
        <div className={styles.form__container}>
          <label htmlFor="date">Date</label>
          <DatePicker
            selected={startDate}
            minDate={new Date()} 
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className={styles.form__container}>
          <label htmlFor="time">Time</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </div>
      <div className={styles.form__container}>
        <label htmlFor="user">Assign User</label>
        <select name="user" id="user">
          <option value={user_id}>Prem Kumar</option>
        </select>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn_cancel} onClick={() => setTask(true)}>cancel</button>
        <button className={styles.btn_submit }>submit</button>
      </div>
    </FormContainer>
  )
}

export default TaskForm