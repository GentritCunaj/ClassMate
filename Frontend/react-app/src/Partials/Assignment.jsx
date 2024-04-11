import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAssignment } from "../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/assignmet.css";
import Sidebar from "./Sidebar";

const notify = (text) => toast(text);

const Assignment = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initData = {
        title: "",
        description: "",
        dueDate: "",
        teacherId: ""
    };

    const [assignmentValue, setAssignmentValue] = useState(initData);

    const handleAssignmentChange = (e) => {
        setAssignmentValue({ ...assignmentValue, [e.target.name]: e.target.value });
    };

    const handleAssignmentSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(createAssignment(assignmentValue)).then((res) => {
            setLoading(false);
            setAssignmentValue(initData);
            notify("Assignment Created");
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="assignment-container">
                <Sidebar style={{ minHeight: 'calc(100vh - 60px)' }} /> {/* Use the Sidebar component */}
                <div className="main-content">
                    <h1>Create Assignment</h1>
                    <form onSubmit={handleAssignmentSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter title"
                                name="title"
                                value={assignmentValue.title}
                                onChange={handleAssignmentChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter description"
                                name="description"
                                value={assignmentValue.description}
                                onChange={handleAssignmentChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dueDate"
                                value={assignmentValue.dueDate}
                                onChange={handleAssignmentChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Teacher Id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter teacher ID"
                                name="teacherId"
                                value={assignmentValue.teacherId}
                                onChange={handleAssignmentChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Assignment;
