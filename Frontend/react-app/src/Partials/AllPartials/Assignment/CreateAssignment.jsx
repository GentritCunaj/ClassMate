import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../../Sidebar";
import AllAsignments from "./AllAsignments";
import "../../../assets/css/assignmet.css";

const notify = (text) => toast(text);

const CreateAssignment = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const { error, message } = useSelector((store) => store.data); // Assuming Redux state structure
    const { user } = useSelector((store) => store.auth);
    var teacherId = user.id;

    const initData = {
        title: "",
        description: "",
        teacherId: teacherId,
        dueDate: "",

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
                <Sidebar></Sidebar>
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
                    
                        <button type="submit" className="btn btn-primary">
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
           
        </>
    );
};

export default CreateAssignment;