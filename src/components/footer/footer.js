import React from "react";

import TasksFilter from "../tasks-filter";

import './footer.css'

function Footer({items, clearCompleted, filter, onFilterChange}) {
  return (
    <footer className="footer">
      <span className="todo-count">{items} items left</span>
      <TasksFilter 
        filter = {filter}
        onFilterChange = {onFilterChange}/>
      <button 
        className="clear-completed"
        onClick = {clearCompleted}>Clear completed</button>
    </footer>
  );
}

export default Footer;