import React, {useState} from "react";
import './new-task-form.css';

function NewTaskForm({
  onTaskAdded = ()=>{},
  minutes ='' ,
  seconds = '',
}) {

  const [newLabel, setLabel] = useState('')
  const [newMinValue, setMinValue] = useState(minutes)
  const [newSecValue, setSecValue] = useState(seconds)


  const onLabelChange = (e) => {
    if (e.target.value!==' '){
      if(e.target.name === 'label'){
        setLabel(e.target.value.replace(/ +/g, ' '))
      }
    
      if(e.target.name === 'minValue'){
        setMinValue(e.target.value)        
      }

      if(e.target.name === 'secValue'){
        setSecValue(e.target.value)
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (newLabel===''){
      setLabel('Имя задачи не задано.')
    }
    else {
      onTaskAdded(newLabel, newMinValue, newSecValue);
      setLabel('')
      setMinValue('')
      setSecValue('')
    }
  };


  return (
    <form className="new-task-form"
      onSubmit={onSubmit}>
      <input 
        className="new-todo"
        name="label"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelChange}
        value={newLabel}
      />

      <input
        type="text"
        pattern="\d*"
        className="new-todo-form__timer"
        name="minValue"
        placeholder="Min"
        onChange={onLabelChange}
        value={newMinValue}
      />

      <input
        type="text"
        pattern="\d*"
        className="new-todo-form__timer"
        name="secValue"
        placeholder="Sec"
        onChange={onLabelChange}
        value={newSecValue}
      />
      <button type="submit" />
    </form>
  );
}

export default NewTaskForm