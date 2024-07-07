/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './TaskList.css';
import editButton from '../../assets/images/edit.svg';
import deleteButton from '../../assets/images/delete.svg';
import greendot from '../../assets/images/greendot.svg';
import yellowdot from '../../assets/images/yellowdot.svg';
import calendar from '../../assets/images/calendar.svg'


function TaskList({ tasks, handleTaskStatusChange, displayEditTaskModal, displayDeleteModal, clearCompletedTasks }) {
  const activeTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  const isOverdue = (dueDate) => {
    const currentDate = new Date();
    return new Date(dueDate) < currentDate;
  };

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
                  <div className='taskCardSubHeader'>
                  <h3>{task.taskTitle}</h3>
                  {task.isCompleted ? (
                    <img src={greendot} alt="Completed task" />
                  ) : (
                    <img src={yellowdot} alt="Active task" />
                  )}

                  </div>
                  <div className='taskCardButtons'>
                    <img src={editButton} alt="edit button" onClick={() => displayEditTaskModal(task)} />
                    <img src={deleteButton} alt="delete button" onClick={() => displayDeleteModal(task.id)} /> {/* Pass task ID */}
                  </div>
                </div>
                <p>{task.taskDescription}</p>

                <div className="dueDate ">
                <img src={calendar} alt="calander" />
                <p className={isOverdue(task.dueDate) ? 'overdue' : ''}>by {task.dueDate}</p>

                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className="completedTasksHeading">
        <h2>Completed Tasks</h2>
        
        <button className='clearTasksBtn' onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      </div>
      
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
                  <div className="taskCardSubHeader">
                  <h3>{task.taskTitle}</h3>
                  {task.isCompleted ? (
                    <img src={greendot} alt="Completed task" />
                  ) : (
                    <img src={yellowdot} alt="Active task" />
                  )}

                  </div>
                  <div className='taskCardButtons'>
                    <img src={editButton} alt="edit button" onClick={() => displayEditTaskModal(task)} />
                    <img src={deleteButton} alt="delete button" onClick={() => displayDeleteModal(task.id)} /> {/* Pass task ID */}
                  </div>
                </div>
                <p>{task.taskDescription}</p>

                <div className="dueDate">
                <img src={calendar} alt="calander" />
                <p>by {task.dueDate}</p>

                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
