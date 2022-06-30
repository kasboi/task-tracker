import React, { useEffect } from 'react'
import styled from "styled-components";
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskHeader from './TaskHeader';
import { fetchUsers } from './redux/fetchUsers';
import { useSelector, useDispatch } from 'react-redux';

const TaskContainer = styled.div`
  /* border: 1px solid #999; */
  /* padding: 5px 10px; */
  margin:  5rem auto;
  max-width: 30rem;
`

function TaskBar({setTask}) {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    await fetch(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY1MTM4MjksIm5iZiI6MTY1NjUxMzgyOSwianRpIjoiNzA1MDZlZjctMzllNy00ZjI5LTlhMTYtNzkzNmM2M2Q2OGU0IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.XNSyFWwTpmUEGuVpGIb92uYcnUd_mfgPBsh6FdV8f1U',
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
              <TaskCard user={ user } handleDelete={ handleDelete } />
            </div>
          ))}
        </>
    ) : null}
    </TaskContainer>
  )
}

export default TaskBar