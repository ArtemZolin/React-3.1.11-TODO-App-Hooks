import React, {useState} from "react";
import './task.css';
import { formatDistanceToNow } from "date-fns";


function Task({
  id,
  label,
  completed,
  created ,
  isCompleted,
  onToggleCompleted = () => {},
  onDeleted = () => {},
  onEditClick = () => {},
  startTimer = () => {},
  pauseTimer = () => {},
  minutes,
  seconds,
}) {

  const [isCounting, setIsCounting] = useState(false)

  const handlePlay = () => {
    setIsCounting(true)
    startTimer(id);
  };

  const handlePause = () => {
    setIsCounting(false)
    pauseTimer(id);
  };
  
  let classNames1 = 'toggle';
  let classNames = 'no-des';
  if (completed) {
    classNames += ' description';
    classNames1 += ' description';
  }

   
  return(
    <div className='view'>

      <input className={classNames1}
        type = "checkbox"
        onClick = {onToggleCompleted} 
      ></input>

      <label>
        <span className={classNames}> {label} </span>
        <button
          type="button"
          className=" icon-play"
          onClick={() => handlePlay(id)}
          disabled={isCompleted || isCounting}
        />
        <button
          type="button"
          className=" icon-pause"
          onClick={() => handlePause(id)}
          disabled={isCompleted}
        />
        <span className="timer">{minutes}:{seconds}</span>
        <span className="created">created {formatDistanceToNow(created)} ago</span>
      </label>

      <button className="icon icon-edit" onClick={onEditClick}></button>
      <button 
        className="icon icon-destroy"
        onClick={onDeleted}></button>
    </div>  
  );
}
  
export default Task