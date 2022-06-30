import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './style/TaskForm.module.css'

import { useSelector, useDispatch } from 'react-redux';
import { descAction, dateAction, timeAction, timeZoneAction } from './redux/formData';

const FormContainer = styled.form`
  display: 'block';
  background: #e6fcf5;
  box-shadow: 1px 1px 5px rgba(0,0,0, .35);
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  overflow: hidden;
`

function TaskForm({setTask}) {
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

    fetch("https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7", {
      method: "POST",
      headers: {
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY1MTM4MjksIm5iZiI6MTY1NjUxMzgyOSwianRpIjoiNzA1MDZlZjctMzllNy00ZjI5LTlhMTYtNzkzNmM2M2Q2OGU0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.XNSyFWwTpmUEGuVpGIb92uYcnUd_mfgPBsh6FdV8f1U',
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
}).then(console.log('success'))

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
          <option value={user_id}>Volvo</option>
        </select>
      </div>
      <div className="btn">
        <button className="btn btn-cancel">cancel</button>
        <button className="btn btn-submit">submit</button>
      </div>
    </FormContainer>
  )
}

export default TaskForm