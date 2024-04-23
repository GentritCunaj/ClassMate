import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditResource,getResourceById } from "../../../Redux/data/action";
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../../Sidebar';

const UpdateResources = () => {
  const { resourceId } = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const userId = user.id;
  const [formData, setFormData] = useState({
    studyGroupId: "",
    title: "",
    userId: userId,
    description: "",
    fileInput: null, // Remove this from the initial state
  });

  useEffect(() => {
    dispatch(getResourceById(resourceId))
      .then((data) => {
        const resource = data.data;
        setFormData({
          studyGroupId: resource.studyGroupId,
          title: resource.title,
          userId: resource.userId,
          description: resource.description,
        });
      })
      .catch((error) => {
        console.error('Error fetching resource :', error);
        toast.error('Error fetching resource. Please try again.');
      });
  }, [dispatch, resourceId]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, fileInput: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('studyGroupId', formData.studyGroupId);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('fileInput', formData.fileInput);

    dispatch(EditResource(resourceId, formDataToSend))
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.error('Failed to update resource:', error.message);
        toast.error('Error updating quiz. Please try again.');
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
              <label>Study Group</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter studygroupId"
                name="studyGroupId"
                value={formData.studyGroupId}
                onChange={onChange}
                required
              />
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
                onChange={handleFileChange}
                required
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
