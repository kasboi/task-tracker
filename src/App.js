import React, { useEffect, useState } from "react";
import TaskBar from "./TaskBar";
import TaskForm from "./TaskForm";
import TaskHeader from './TaskHeader';
import { fetchUsers } from './redux/fetchUsers';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const [task, setTask] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
      <div className="App">
        <TaskHeader count ={user.users.length ? user.users.length : 0}/>
        {task ? <TaskBar setTask={setTask} /> : <TaskForm setTask={setTask} />}
      </div>
  );
}

export default App;
