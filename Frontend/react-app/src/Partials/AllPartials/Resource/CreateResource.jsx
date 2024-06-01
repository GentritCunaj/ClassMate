import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createResource ,getAllSubjects } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from '../../Sidebar';

const notify = (text) => toast(text);

const CreateResource = () => {
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((store) => store.data); // Assuming Redux state structure
    const {user} = useSelector((store) => store.auth);
    var userId = user.id;
    const { subjects } = useSelector((store) => store.data); // Subjects from Redux state
    const initData = {
        subjectId: "",
        title: "",
        userId:userId,
        description: "",
        fileInput: null

    };
const [resourceValue, setResourceValue] = useState(initData);
    const handleResourceChange = (e) => {
        setResourceValue({ ...resourceValue, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        dispatch(getAllSubjects());
    }, []);

    const handleFileChange = (e) => {
        console.log(resourceValue);
        setResourceValue({ ...resourceValue, fileInput: e.target.files[0] });
    };

    const handleResourceSubmit = (e) => {
        e.preventDefault();
        dispatch(createResource(resourceValue)).then((res) => {
            setResourceValue(initData);
            notify("Resource Created");
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="assignment-container">
                <Sidebar style={{ minHeight: 'calc(100vh - 60px)' }} />
                <div className="main-content" style={{marginLeft:'400px'}}>
                    <h1>Create Resource</h1>
                    <form onSubmit={handleResourceSubmit}>
                    <div className="form-group">
                            <label>Select Subject</label>
                            <select
                                className="form-control"
                                name="subjectId"
                                value={resourceValue.subjectId}
                                onChange={handleResourceChange}
                                required
                            >
                                <option value="">Select a Subject</option>
                                {subjects.map(subject => (
                                    <option key={subject.subjectId} value={subject.subjectId}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                name="title"
                                value={resourceValue.title}
                                onChange={handleResourceChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter Description"
                                name="description"
                                value={resourceValue.description}
                                onChange={handleResourceChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>File</label>
                            <input
                                type="file"
                                className="form-control"
                                name="fileInput"
                                onChange={handleFileChange}
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

export default CreateResource;
