/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './TaskList.css';

function TaskList({ tasks }) {
  return (
    <div>
      <h2>Active Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.taskTitle}</h3>
              <p>{task.taskDescription}</p>
              <p>Due Date: {task.dueDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
