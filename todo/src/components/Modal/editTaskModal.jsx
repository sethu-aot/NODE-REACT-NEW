/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import closeButton from '../../assets/images/x.svg';
import './editTaskModal.css';

function EditTaskModal({
  task,
  handleEditTitleChange,
  handleEditDescriptionChange,
  handleEditDueDateChange,
  handleEditSubmit,
  closeModal
}) {
  return (
    <div className='modalContainer'>
      <div className='modalHeader'>
        <h3>Edit Task</h3>
        <img src={closeButton} alt="Close" onClick={closeModal} />
      </div>
      <form onSubmit={handleEditSubmit}>
        <div className='modalContents'>
          <p>Title *</p>
          <input type="text" name="title" value={task.taskTitle} onChange={handleEditTitleChange} required />
          <p>Description</p>
          <textarea name="description" value={task.taskDescription} onChange={handleEditDescriptionChange}></textarea>
          <p>Due Date</p>
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleEditDueDateChange} required />
          <div className="buttonContainer">
            <button type="button" onClick={closeModal}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;
