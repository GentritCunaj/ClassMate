import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAssignmentBySubjectId, submitAssignment } from '../Redux/data/action';
import Modal from './Modal'; // Import the Modal component
import '../assets/css/subject.css';

const Assignments = ({ subjectId }) => {
    const dispatch = useDispatch();
    const { assignments, error, loading } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);

    const [selectedFile, setSelectedFile] = useState(null);
    const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                await dispatch(getAssignmentBySubjectId(subjectId));
            } catch (error) {
                console.error('Error fetching assignment:', error);
                toast.error('Error fetching assignment. Please try again.');
            }
        };

        if (subjectId) {
            fetchAssignments();
        }
    }, [dispatch, subjectId]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            toast.error('Please select a file to upload.');
            return;
        }

        if (!currentAssignmentId) {
            toast.error('Assignment ID is not set.');
            return;
        }

        const formData = new FormData();
        formData.append('submittedFile', selectedFile);
        formData.append('assignmentId', currentAssignmentId);

        try {
            await dispatch(submitAssignment(formData));
            setShowModal(false);
            toast.success('Assignment submitted successfully!');
        } catch (error) {
            console.error('Error submitting assignment:', error);
            toast.error('Error submitting assignment. Please try again.');
        }
    };

    return (
        <>
            <div className="subject-container">
                {loading && <p>Loading assignments...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                <h1 className="page-title">Assignments</h1>
                <div className="subject-wrapper">
                    {assignments && assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <div className="subject-card" key={assignment.assignmentId}>
                                <div className="subject-details">
                                    <h2 className="subject-title">{assignment.title.toUpperCase()}</h2>
                                    <p><strong>Description:</strong> {assignment.description}</p>
                                    <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleString()}</p>
                                    <button 
                                        onClick={() => {
                                            setCurrentAssignmentId(assignment.assignmentId);
                                            setShowModal(true);
                                        }} 
                                        className="submit-button"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No assignments found for this subject.</p>
                    )}
                </div>
            </div>
            <Modal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                onSubmit={handleSubmit} 
                onFileChange={handleFileChange} 
            />
        </>
    );
};

export default Assignments;
