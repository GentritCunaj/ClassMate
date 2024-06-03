import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../Redux/data/action";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './Report.css';  // Assuming you will add CSS for modal

const ReportQuiz = ({ isOpen, onClose, quizId }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);
    const userId = user.id;
    const initData = {
        studyGroupId: null,
        title: "",
        creatorId: userId,
        description: "",
        resourceId: null,
        assignmentId: null,
        quizId: quizId,
        userId: null,
        chatMessageId: null,
    };
    const [reportValue, setReportValue] = useState(initData);
    const [isReported, setIsReported] = useState(false); // State to manage submission status

    useEffect(() => {
        // Update quizId in reportValue when quizId prop changes
        setReportValue(prev => ({ ...prev, quizId }));
    }, [quizId]);

    const handleReportChange = (e) => {
        setReportValue({ ...reportValue, [e.target.name]: e.target.value });
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();

        // Create a ReportDto object from reportValue
        const reportDto = {
            title: reportValue.title,
            description: reportValue.description,
            creatorId: reportValue.creatorId,
            studyGroupId: reportValue.studyGroupId,
            resourceId: reportValue.resourceId,
            assignmentId: reportValue.assignmentId,
            quizId: reportValue.quizId,
            userId: reportValue.userId,
            chatMessageId: reportValue.chatMessageId
        };

        dispatch(createReport(reportDto)).then(() => {
            setReportValue(initData);
         
             setIsReported(true);
             
           
            setTimeout(() => {
                
                handleModalClose();
            }, 7000);
        });
    };

    const handleModalClose = () => {
        setIsReported(false); // Reset isReported to false
        onClose(); // Close the modal
    };

    if (!isOpen) return null;

    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className="modal-overlay">
                <div className="modal-content">
                    <button onClick={handleModalClose} className="close-button">X</button>
                    {isReported ? (
                        <div className="success-message">
                            
                            <h1>Quiz Reported</h1>
                            <p>Thank you for your report.</p>
                        </div>
                    ) : (
                        <>
                            <h1>Create Report</h1>
                            <form onSubmit={handleReportSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Title"
                                        name="title"
                                        value={reportValue.title}
                                        onChange={handleReportChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter Description"
                                        name="description"
                                        value={reportValue.description}
                                        onChange={handleReportChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                            </form>
                            {error && <div className="error-message">{error}</div>}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ReportQuiz;
