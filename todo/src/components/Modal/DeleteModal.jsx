/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './DeleteModal.css';
import closeButton from '../../assets/images/x.svg';

function DeleteModal({ handleDelete, closeModal }) {
  return (
    <div className="modalContainer">
      <div className="modalHeader">
        <h3>Delete Task?</h3>
        <img src={closeButton} alt="Close" onClick={closeModal} />
      </div>
      <div className="modalContents">
        <p>Are you sure you want to delete this task?</p>
        <div className="buttonContainer">
          <button type="button" onClick={closeModal} className="cancelButton">Cancel</button>
          <button type="button" onClick={handleDelete} className="deleteButton">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
