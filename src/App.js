import React, { useEffect, useState } from "react";
import TaskBar from "./components/TaskBar";
import TaskForm from "./components/TaskForm";
import TaskHeader from './components/TaskHeader';
import { fetchUsers } from './redux/fetchUsers';
import { useSelector, useDispatch } from 'react-redux';
import './index.css'


function App() {
  const [task, setTask] = useState(true)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [task])

  return (
    <div className="App">
      <TaskHeader setTask={setTask} count ={user.users.length ? user.users.length : 0}/>
      {task && <TaskBar setTask={setTask} />}
      {!task && <TaskForm setTask={setTask} />}
    </div>
  );
}

export default App;
