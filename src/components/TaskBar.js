import React from 'react'
import styled from "styled-components";
import TaskCard from '../TaskCard';
import { fetchUsers } from '../redux/fetchUsers';
import { useSelector, useDispatch } from 'react-redux';
import { TOKEN } from '../handlers/token';

import { descAction, dateAction, timeAction, timeZoneAction } from '../redux/formData';

const TaskContainer = styled.div`

  margin:  .65rem auto;
  max-width: 30rem;
`

function TaskBar({ setTask }) {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const handleEdit = (id, date, time, timezone, desc) => {
    dispatch(descAction(desc))
    dispatch(dateAction(date))
    dispatch(timeAction(time))
    dispatch(timeZoneAction(timezone))
    setTask(false)
    handleDelete(id)
  }

  const handleDelete = async (id) => {
    await fetch(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',          
      }
    })
    dispatch(fetchUsers())

  }

  return (
    <TaskContainer>
      {/* <TaskForm /> */}
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users.length ? (
        <>
         {user.users.map(user => (
            <div key={user.id}>           
              <TaskCard user={ user } handleEdit={handleEdit} handleDelete={ handleDelete } />
            </div>
          ))}
        </>
    ) : null}
    </TaskContainer>
  )
}

export default TaskBar