import React from 'react';
import '../assets/css/modals.css'; // Add your CSS for the modal here

const Modal = ({ show, onClose, onSubmit, onFileChange, dueDate }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modals-overlay">
            <div className="modals">
                <h2>Submit Assignment</h2>
                {dueDate && new Date(dueDate) < new Date() && (
                    <p style={{ color: 'red' }}>Due date has passed. You cannot submit the assignment.</p>
                )}
                <input type="file" onChange={onFileChange} />
                <button onClick={onSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
