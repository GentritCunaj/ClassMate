import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditResource, getResourceById, getAllSubjects } from "../../../Redux/data/action";
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../../Sidebar';

const UpdateResources = () => {
  const { resourceId } = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const userId = user.id;
  const { subjects } = useSelector((store) => store.data);

  const [formData, setFormData] = useState({
    subjectId: "",
    title: "",
    userId: userId,
    description: "",
    fileInput: null,
  });

  useEffect(() => {
    dispatch(getResourceById(resourceId))
      .then((data) => {
        const resource = data.data;
        setFormData({
          subjectId: resource.subjectId,
          title: resource.title,
          userId: resource.userId,
          description: resource.description,
          fileInput: null,
        });
      })
      .catch((error) => {
        console.error('Error fetching resource:', error);
        toast.error('Error fetching resource. Please try again.');
      });
  }, [dispatch, resourceId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, fileInput: e.target.files[0] });
  };

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("subjectId", formData.subjectId);
    updatedFormData.append("title", formData.title);
    updatedFormData.append("userId", formData.userId);
    updatedFormData.append("description", formData.description);
    if (formData.fileInput) {
      updatedFormData.append("fileInput", formData.fileInput);
    }

    dispatch(EditResource(resourceId, updatedFormData))
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.error('Failed to update resource:', error.message);
        toast.error('Error updating resource. Please try again.');
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="assignment-container">
        <Sidebar />
        <div className="main-content" style={{ marginLeft: '400px' }}>
          <h1>Update Resource</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Select Subject</label>
              <select
                className="form-control"
                name="subjectId"
                value={formData.subjectId}
                onChange={onChange}
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
              <label>File Input</label>
              <input
                type="file"
                className="form-control"
                name="fileInput"
                onChange={onFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Edit Resource</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateResources;
