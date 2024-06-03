import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAssignmentBySubjectId, submitAssignment } from '../Redux/data/action';
import Modal from './Modal'; // Import the Modal component
import ReportAssignment from './reportModals/Assignment';
import '../assets/css/subject.css';

const Assignments = ({ subjectId }) => {
    const dispatch = useDispatch();
    const { assignments, error, loading } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);

    const [selectedFile, setSelectedFile] = useState(null);
    const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
    const openReportModal = (assignmentId) => {
        setCurrentAssignmentId(assignmentId);  // Set the current resourceId
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(false);
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

        const assignment = assignments.find(assignment => assignment.assignmentId === currentAssignmentId);

        // Kontrolloni nëse duedata është kaluar
        if (isDue(assignment.dueDate)) {
            toast.error('Due date has passed. You cannot submit the assignment.');
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

    const isDue = (dueDate) => {
        return new Date(dueDate) < new Date();
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
                            <div className={`subject-card ${isDue(assignment.dueDate) ? 'overdue' : ''}`} key={assignment.assignmentId}>
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
                                    <div>
                                        <button 
                                            onClick={() => openReportModal(assignment.assignmentId)} 
                                            className="btn btn-primary"
                                        >
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No assignments found for this subject.</p>
                    )}
                </div>
            </div>
            <ReportAssignment
                isOpen={isReportModalOpen} 
                onClose={closeReportModal} 
                assignmentId={currentAssignmentId}  // Pass the resourceId to the modal
            />
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                onFileChange={handleFileChange}
                dueDate={assignments.find(assignment => assignment.assignmentId === currentAssignmentId)?.dueDate}
            />
        </>
    );
};

export default Assignments;
