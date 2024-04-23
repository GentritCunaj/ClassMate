import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar';

const notify = (text) => toast(text);

const CreateReport = () => {
    const { quizId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((store) => store.data);
    const {user} = useSelector((store) => store.auth);
    var userId = user.id;
    const [reportValue, setReportValue] = useState({
        studyGroupId: null,
        title: null,
        creatorId:userId,
        description: null,
        resourceId:null,
        assignmentId:null,
        quizId:quizId,
        userId:null,
        chatMessageId:null,
    });

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
    
        dispatch(createReport(reportDto));
        window.location.reload();
    };

    return (
        <>
            <ToastContainer />
            <div className="assignment-container">
                <Sidebar style={{ minHeight: 'calc(100vh - 60px)' }} />
                <div className="main-content" style={{marginLeft:'400px'}}>
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
                    {message && <div className="success-message">{message}</div>}
                </div>
            </div>
        </>
    );
};

export default CreateReport;
