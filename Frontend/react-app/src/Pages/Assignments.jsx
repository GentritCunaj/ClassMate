import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAssignmentBySubjectId } from '../Redux/data/action';
import '../assets/css/subject.css';

const Assignments = ({ subjectId }) => { // Merr ID-në e subjektit si prop
    const dispatch = useDispatch();
    const { assignments, error, loading } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);

    const studentId = user ? user.id : null;

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

    const handleSubmit = (assignmentId) => {
        console.log(`Submit button clicked for assignment ${assignmentId}`);
        toast.success('Assignment submitted successfully!');
    };

    // Funksioni për paraqitjen e duedate-së me tkuqe kur kalon data
    const formatDate = (dueDate) => {
        const now = new Date();
        const assignmentDate = new Date(dueDate);
        const diffTime = Math.abs(assignmentDate - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return "Today";
        } else if (diffDays === 1) {
            return "Tomorrow";
        } else if (diffDays < 7) {
            return `In ${diffDays} days`;
        } else {
            return dueDate; // Kthe duedate-në origjinale nëse kalon më shumë se 7 ditë
        }
    };

    // Funksion për të kthyer klasën e duhur bazuar në duedate
    const getClassForDueDate = (dueDate) => {
        const now = new Date();
        const assignmentDate = new Date(dueDate);
        return assignmentDate < now ? "overdue" : "";
    };

    if (loading) return <p>Loading assignments...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;

    return (
        <>
            <div className="subject-container">
                <h1 className="page-title">Assignments</h1>
                <div className="subject-wrapper">
                    {assignments && assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <div className="subject-card" key={assignment.id}>
                                <div className="subject-details">
                                    <h2 className="subject-title">{assignment.title.toUpperCase()}</h2>
                                    <p><strong>Description:</strong> {assignment.description}</p>
                                    <p><strong>Due Date:</strong> <span className={getClassForDueDate(assignment.dueDate)}>{formatDate(assignment.dueDate)}</span></p>
                                    <button onClick={() => handleSubmit(assignment.id)} className="submit-button">Submit</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No assignments found for this subject.</p>
                    )}
                </div>
                <p></p>
            </div>
          
        </>
    );
};

export default Assignments;
