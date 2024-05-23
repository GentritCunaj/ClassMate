import React from 'react';
import '../assets/css/modals.css'; // Add your CSS for the modal here

const Modal = ({ show, onClose, onSubmit, onFileChange }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modals-overlay">
            <div className="modals">
                <h2>Submit Assignment</h2>
                <input type="file" onChange={onFileChange} />
                <button onClick={onSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
