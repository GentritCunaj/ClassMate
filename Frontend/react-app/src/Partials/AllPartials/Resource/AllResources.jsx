import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getAllResources,deleteResource,deleteReports } from "../../../Redux/data/action";
import { Link } from 'react-router-dom';


const AllResources = () => {
    const dispatch = useDispatch();
    const { resources, loading } = useSelector((store) => store.data); // Assuming the state property is named "quizzes"
    const { user } = useSelector((store) => store.auth); // Assuming user information is stored in Redux state

    const columns = [
        { id: 'resourceId', name: "Resource ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'fileUrl', name: "File",},
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState(null);

    useEffect(() => {
        dispatch(getAllResources());
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
            dispatch(deleteReports("Resource",resourceId));
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
    
    // Filter quizzes based on the creatorId
    const userResources =  resources ? resources || resources.filter(resource => resource.userId === user.id) : [];

    return (
        <div id="dashboardContainer" className="container pt-4">
            <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                            ))}
                            <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell> {/* Add this for the actions column */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userResources && userResources
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, colIndex) => {
                                        let value = row[column.id];
                                        return (
                                            <TableCell key={colIndex}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                    <Button style={{marginRight:'10px'}} component={Link} to={`/UpdateResource/${row.resourceId}`} variant="contained" color="primary">Edit</Button>
                                        
                                        <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => openDeleteConfirmation(row.resourceId)} // Call deleteResource with the resourceId
                    >
                        Delete
                    </Button>
                    <Button style={{marginLeft:'10px'}} component={Link} to={`/ReportResource/${row.resourceId}`} variant="contained" color="primary">Report</Button>
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