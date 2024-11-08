import React from "react";

import Task from "../task";
import ChangeTaskForm from '../changeTaskForm';
import './task-list.css'

function TaskList({todos, onToggleCompleted, onDeleted,onEditClick,onChangeDescription, startTimer,pauseTimer}) {

  const elements = todos.map((item)=>{
  
    const {id, ...itemProps} = item;
    return (
      <li className="completed" key = {id}>
        <Task 
          {...itemProps}
          onToggleCompleted = {()=> onToggleCompleted(id)}
          onDeleted = {() => onDeleted(id)}
          onEditClick={() => onEditClick(id)}
          startTimer = {()=>startTimer(id)}
          pauseTimer = {()=>pauseTimer(id)}
        />
        {item.editing ? (
          <ChangeTaskForm id={id} description={item.label} onChangeDescription={onChangeDescription} />
        ) : null}
      </li>
    )
  })
  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
}

export default TaskList;


