import React from 'react'
import styled from "styled-components";
import { IoAdd } from "react-icons/io5";

const TaskBtn = styled.div`
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
  background: #f8f9fa;
  box-shadow: 1px 2px 3px rgba(0,0,0, .4);
  margin-top: 2rem;

  .tasks{
    margin-right: auto;
  }

  .task__btn {
    font-size: 2rem;
    border: none;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    border-radius: 100%;
    background-color: transparent;
    transition: all .2s;

    :hover {
      border-radius: 100%;
      background-color: #dee2e6;
    }
  }
`

function TaskHeader({ count, setTask }) {

  return (
    <TaskBtn>
      <p className="tasks">Tasks - {count}</p>
      <IoAdd className="task__btn" onClick={() => setTask(false)}/>
  </TaskBtn>
  )
}

export default TaskHeader