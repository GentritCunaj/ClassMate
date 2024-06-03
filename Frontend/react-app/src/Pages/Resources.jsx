import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getResourceBySubjectId } from '../Redux/data/action';
import ReportResource from './reportModals/Resource';  // Correct the import path
import Modal from './Modal'; // Import the Modal component
import '../assets/css/subject.css';

const Resources = ({ subjectId }) => {
    const dispatch = useDispatch();
    const { resources, error, loading } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);

    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentResourceId, setCurrentResourceId] = useState(null); // State to store the current resourceId

    useEffect(() => {
        const fetchResources = async () => {
            try {
                await dispatch(getResourceBySubjectId(subjectId));
            } catch (error) {
                console.error('Error fetching assignment:', error);
                toast.error('Error fetching assignment. Please try again.');
            }
        };

        if (subjectId) {
            fetchResources();
        }
    }, [dispatch, subjectId]);

    const openModal = (resourceId) => {
        setCurrentResourceId(resourceId);  // Set the current resourceId
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDownload = (fileUrl) => {
        // Create a link element, set its href to the file URL, and trigger a click to download the file
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop(); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="subject-container">
                {loading && <p>Loading resources...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                <h1 className="page-title">Resources</h1>
                <div className="subject-wrapper">
                    {resources && resources.length > 0 ? (
                        resources.map((resource) => (
                            <div className="subject-card" key={resource.resourceId}>
                                <div className="subject-details">
                                    <h2 className="subject-title">{resource.title.toUpperCase()}</h2>
                                    
                                    <p><strong>Description:</strong> {resource.description}</p>
                                    {resource.fileUrl && (
                                        <button 
                                            className="download-button" 
                                            onClick={() => handleDownload(resource.fileUrl)}
                                        >
                                            Download Resource
                                        </button>
                                    )}
                                    <div>
                                        <button 
                                            onClick={() => openModal(resource.resourceId)} 
                                            className="btn btn-primary"
                                        >
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No resources found for this subject.</p>
                    )}
                </div>
            </div>
            <ReportResource 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                resourceId={currentResourceId}  // Pass the resourceId to the modal
            />
            <Modal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                onFileChange={handleFileChange} 
            />
        </>
    );
};

export default Resources;
