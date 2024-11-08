import React, { useState } from 'react';
import './changeTaskForm.css';

function ChangeTaskForm({description, onChangeDescription, id}) {
  
  const [newDescription, setNewDescription] = useState(description)

  const onDescriptionChange = (event) => {
    setNewDescription(event.target.value.replace(/ +/g, ' '))
  };

  const onKeyPress = (event) => { 
    if (event.key === 'Enter') {
      if (newDescription === ' ' || newDescription === '') {
        onChangeDescription(id, description);
      } else {
        onChangeDescription(id, newDescription);
      }
    }
  };

  return (
    <input
      type="text"
      className="edite"
      value={newDescription}
      onChange={onDescriptionChange}
      onKeyPress={onKeyPress}
      autoFocus
    ></input>
  );
}


export default ChangeTaskForm