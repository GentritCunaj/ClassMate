import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditAssignment,getAssignmentById } from "../../../Redux/data/action";
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../../Sidebar';

const UpdateAssignments = () => {
  const { assignmentId} = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const teacherId = user.id;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teacherId: teacherId,
    dueDate: "",
  });
  useEffect(() => {
    dispatch(getAssignmentById(assignmentId))
      .then((data) => {
        const assignmetData = data.data;
        setFormData({
          title: assignmetData.title,
          description: assignmetData.description,
          teacherId: assignmetData.teacherId,
          dueDate: assignmetData.dueDate
        });
      })
      .catch((error) => {
        console.error('Error fetching assignmet:', error);
        toast.error('Error fetching assignment. Please try again.');
      });
  }, [dispatch,assignmentId]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(EditAssignment(assignmentId, formData))
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Failed to update assignment:', error.message);
        toast.error('Error updating quiz. Please try again.')
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="assignment-container">
        <Sidebar></Sidebar>
        <div className="main-content" style={{ marginLeft: '400px' }}>
          <h1>Create Assignment</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="dueDate"
                value={formData.dueDate}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Edit Assignmet</button>
          </form>
        </div>
      </div>

    </>
  );
};

export default UpdateAssignments;
