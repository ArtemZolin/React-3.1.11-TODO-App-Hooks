/* eslint-disable consistent-return */
import React, { useState } from 'react';

import Footer from '../footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

import './app.css';

function App() {

  const maxId = () => Math.floor(Math.random() * 1000);

  const createTodoTask = (label, created, minutes, seconds,timerId,isTimerOn )=>{
    let minValueNumber = +minutes;
    let secValueNumber = +seconds;
    if (secValueNumber >60 ){
      minValueNumber +=Math.trunc(secValueNumber/60)
      secValueNumber -= Math.trunc(secValueNumber/60)*60
    }
            
    return {
      label,
      created,
      id: maxId(),
      editing: false,
      minutes: String(minValueNumber).padStart(2,'0') ,
      seconds: String(secValueNumber).padStart(2,'0'),
      timerId,
      isTimerOn
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoTask('Completed task', new Date('2024-09-21T10:00:00'), 15,0 ),
    createTodoTask('Editing task', new Date('2024-09-21T10:00:00'), 15,0),
    createTodoTask('Active task', new Date('2024-09-21T10:00:00'), 15,0),]);

  const [filter, setFilter] = useState('all');

  
  const onDeleted = (id) =>{
    const idx = todoData.findIndex((el) => el.id===id);
    const newArray = [
      ...todoData.slice(0, idx),
      ...todoData.slice(idx + 1)
    ]
    setTodoData(newArray);
  };

  const clearCompleted = () => {
    for(const data of todoData){
      if (data.completed === true){
        onDeleted(data.id)
      };
    };
  };

  const onFilterChange = (filterr) => {
    setFilter(filterr)
  };

  const filters = (items, filterr) =>{
    switch(filterr){
    case 'all':
      return items;
    case 'active':
      return items.filter((item) =>!item.completed);
    case 'completed':
      return (items.filter((item) =>item.completed));
    default:
      return items;
    };
  };

  const addTask = (label, minutes, seconds,timerId,isTimerOn) =>{
    const newItem = createTodoTask(label,  Date.now(), minutes, seconds,timerId,isTimerOn)
    const newArr = [
      ...todoData,
      newItem
    ];
    setTodoData(newArr);
  };

  const toggleProperty = (arr, id, propName)=>{
    const idx = arr.findIndex((el)=> el.id===id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [
      ...arr.slice(0,idx),
      newItem, 
      ...arr.slice(idx+1)
    ]
  };

  const onEditClick = (id) => {
    const newDataStream = todoData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          editing: true,
        };
      }
      return el;
    });
    setTodoData(newDataStream);
  };

  const changeDescription = (id, label) => {
    const newDataStream = todoData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          label,
          compleeted: false,
          editing: false,
        };
      }
      return el;
    });
    setTodoData(newDataStream);
  };

  const pauseTimer = (id) => {
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;
    const index = todoData.findIndex((el) => el.id === id);
    
    const newTask = {
      ...task,
      timerId: clearInterval(task.timerId),
      isTimerOn: false,
    };
    const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
    setTodoData(newArray);
  };

  const onToggleCompleted = (id) =>{
    pauseTimer(id)
    setTodoData(toggleProperty(todoData, id, 'completed'))
  };

  const startTimer = (id) => {
   
    const setTimer = setInterval(() => {
      setTodoData((setTodo) => {
        const currentTask = setTodo.filter((todo) => todo.id === id);
        const index = setTodo.findIndex((el) => el.id === id);
        const [task] = currentTask;
        if(Number(task.seconds)===1 && Number(task.minutes) ===0 ){
          onToggleCompleted(id)
        }
        if(Number(task.seconds)===0 && Number(task.minutes) ===0 ){
          pauseTimer(id)
        } else {
          const newTask = {
            ...task,
            minutes: String(
              Number(task.minutes) !== 0 && Number(task.seconds) === 0 ? Number(task.minutes) - 1 : Number(task.minutes))
              .padStart(2,'0'),
            seconds: String( Number(task.seconds) !== 0 ? Number(task.seconds) - 1 : '59').padStart(2,'0'),
            timerId: [Number(task.minutes) === 0 && Number(task.seconds) === 1 ? clearInterval(task.timerId) : setTimer],
            isTimerOn: true,
            completed: Number(task.minutes) === 0 && Number(task.seconds) === 1 ? true : null,
          };
          const newArray = [...setTodo.slice(0, index), newTask, ...setTodo.slice(index + 1)];

          return newArray
        }
      })
    
    }, 1000);
  };


  const visibleItems = filters(
    todoData, filter);
  const count = todoData.length - todoData
    .filter((el)=>el.completed).length;
  return( 
    <section className="todoapp">
      <header className="header">
        <h1>todos final</h1>
        <NewTaskForm onTaskAdded = {addTask}/>
      </header>
      <section className="main">
        <TaskList
          startTimer = {startTimer}
          pauseTimer = {pauseTimer}
          todos = {visibleItems}
          onToggleCompleted = {onToggleCompleted}
          onDeleted = {onDeleted}
          onEditClick={onEditClick}
          onChangeDescription={changeDescription}
        />
        <Footer 
          items = {count}
          clearCompleted = {clearCompleted}
          filter = {filter}
          onFilterChange = {onFilterChange} />
      </section>
    </section>)
}

export default App