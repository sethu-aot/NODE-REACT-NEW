/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './TaskList.css';
import editButton from '../../assets/images/edit.svg';
import deleteButton from '../../assets/images/delete.svg';

function TaskList({ tasks, handleTaskStatusChange }) {
  const activeTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div>
      <h2>Active Tasks</h2>
      {activeTasks.length === 0 ? (
        <p>No active tasks available</p>
      ) : (
        <ul className='taskContainer'>
          {activeTasks.map(task => (
            <li key={task.id} className='taskCard'>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  className='checkbox'
                  checked={task.isCompleted}
                  onChange={() => handleTaskStatusChange(task.id, !task.isCompleted)}
                />
              </div>
              <div className='taskCardContents'>
                <div className='taskCardHeader'>
                <h3>{task.taskTitle}</h3>
                <div className='taskCardButtons'>
                  <img src={editButton} alt="edit button" />
                  <img src={deleteButton} alt="delete button" />
                </div>
                </div>
                <p>{task.taskDescription}</p>
                <p>by {task.dueDate}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks available</p>
      ) : (
        <ul className='taskContainer'>
          {completedTasks.map(task => (
            <li key={task.id} className='taskCard'>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  className='checkbox'
                  checked={task.isCompleted}
                  onChange={() => handleTaskStatusChange(task.id, !task.isCompleted)}
                />
              </div>
              <div className='taskCardContents'>
                <div className='taskCardHeader'>
                <h3>{task.taskTitle}</h3>
                <div className='taskCardButtons'>
                  <img src={editButton} alt="edit button" />
                  <img src={deleteButton} alt="delete button" />
                </div>
                </div>
                <p>{task.taskDescription}</p>
                <p>by {task.dueDate}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
