import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { getAllResources, deleteResource, deleteReports, getAllSubjects } from "../../../Redux/data/action";
import { Link } from 'react-router-dom';

const AllResources = () => {
    const dispatch = useDispatch();
    const { resources, subjects, loading } = useSelector((store) => store.data); // Assuming subjects are also stored in data state
    const { user } = useSelector((store) => store.auth); // Assuming user information is stored in Redux state

    const columns = [
        { id: 'resourceId', name: "Resource ID" },
        { id: 'userId', name: "Username" },
        { id: 'title', name: "Resource Title" },
        { id: 'description', name: "Resource Description" },
        { id: 'subjectId', name: "Subject" }, // Change "Subject ID" to "Subject"
        { id: 'fileUrl', name: "File" },
        
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState(null);

    useEffect(() => {
        dispatch(getAllResources());
        dispatch(getAllSubjects()); // Fetch all subjects
    }, [dispatch]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteResource = async (resourceId) => {
        try {
            dispatch(deleteReports("Resource", resourceId));
            await dispatch(deleteResource(resourceId));
            console.log("Resource deleted successfully.");
            dispatch(getAllResources());
        } catch (error) {
            console.error("Error deleting resource:", error);
        }
    };

    const openDeleteConfirmation = (resourceId) => {
        setResourceToDelete(resourceId);
        setDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setResourceToDelete(null);
        setDeleteConfirmationOpen(false);
    };

    const getSubjectName = (subjectId) => {
        const subject = subjects.find(sub => sub.subjectId === subjectId);
        return subject ? subject.name : "Unknown";
    };

    const userResources = resources ? (user.fRole === 'Admin' ? resources : resources.filter(resource => resource.userId === user.id)) : [];

    return (
        <div id="dashboardContainer" className="container pt-4">
        <TableContainer id="tableContainer" sx={{ width: 1000, overflowX: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                        ))}
                        <TableCell style={{ backgroundColor: 'black', color: 'white', width: '30%' }}>Actions</TableCell> {/* Add this for the actions column */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userResources
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <TableRow key={index}>
    {columns.map((column, colIndex) => {
        let value;
        if (column.id === 'subjectId') {
            value = getSubjectName(row[column.id]);
        } else if (column.id === 'userId') {
            value = row.user['userName'];
        } else {
            value = row[column.id];
        }

        return (
            <TableCell key={colIndex}>
                {value}
            </TableCell>
        );
    })}

    <TableCell>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button style={{ marginRight: '10px' }} component={Link} to={`/UpdateResource/${row.resourceId}`} variant="contained" color="primary">Edit</Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => openDeleteConfirmation(row.resourceId)}
            >
                Delete
            </Button>
            <Button style={{ marginLeft: '10px' }} component={Link} to={`/ReportResource/${row.resourceId}`} variant="contained" color="primary">Report</Button>
        </div>
    </TableCell>
</TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[3, 6, 18, 30]}
            rowsPerPage={rowsPerPage}
            page={page}
            component="div"
            count={userResources.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
        />
        <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
            <DialogTitle>Are you sure you want to delete this resource?</DialogTitle>
            <DialogActions>
                <Button onClick={closeDeleteConfirmation} color="primary">
                    No
                </Button>
                <Button onClick={() => { handleDeleteResource(resourceToDelete); closeDeleteConfirmation(); }} color="secondary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};

export default AllResources;
