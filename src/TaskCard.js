import React from 'react'
import { IoPencilOutline, IoTrashSharp, IoPersonCircle } from 'react-icons/io5'
import './style/TaskCard.css'

function TaskCard({ user, handleDelete, handleEdit }) {

  return (
    <div className="note__container">
      <IoPersonCircle style={{fontSize: '2rem', marginRight: '1rem'}}/>
      <div className="note__details">
        <p className="note__description">Task: {user.task_msg}</p>
        <p className="note__date">Due date: {user.task_date}</p>
      </div>
      <div className="note__action">
        <button className="note__btn" onClick={() => handleEdit(user.id, user.task_date, user.task_time, user.time_zone, user.task_msg)}>
          <IoPencilOutline />
        </button>
        <button className="note__btn" onClick={() => handleDelete(user.id)}>
          <IoTrashSharp />
        </button>
      </div>
    </div>
  )
}

export default TaskCard