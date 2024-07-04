/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import closeButton from '../../assets/images/x.svg';
import './AddTaskModal.css';

function AddTaskModal({
    handleTitleChange,
    handleDescriptionChange,
    handleDueDateChange,
    handleSubmit,
    closeModal
}) {
    return (
        <div className='modalContainer'>
            <div className='modalHeader'>
                <h3>Add Task</h3>
                <img src={closeButton} alt="Close" onClick={closeModal} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='modalContents'>
                    <p>Title *</p>
                    <input type="text" name="title" required onChange={handleTitleChange} />
                    <p>Description</p>
                    <textarea name="description" id="description" onChange={handleDescriptionChange}></textarea>
                    <p>Due Date</p>
                    <input type="date" name="dueDate" required onChange={handleDueDateChange} />
                    <div className="buttonContainer">
                        <button type="button" onClick={closeModal}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTaskModal;
