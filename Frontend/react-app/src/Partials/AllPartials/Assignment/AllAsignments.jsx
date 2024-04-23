import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { deleteAssignment, getAllAssignment } from "../../../Redux/data/action";
import { Link } from 'react-router-dom';

const AllAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading } = useSelector((store) => store.data); 
    const { user } = useSelector((store) => store.auth); 

    const columns = [
        { id: 'assignmentId', name: "Assignment ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'dueDate', name: "Due Date" },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);

    useEffect(() => {
        dispatch(getAllAssignment());
    }, [dispatch]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const userAssignments = Array.isArray(assignments) ? assignments.filter(assignment => assignment.teacherId === user.id) : [];

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await dispatch(deleteAssignment(assignmentId));
            console.log("Assignment deleted successfully.");
            dispatch(getAllAssignment());
        } catch (error) {
            console.error("Error deleting assignment:", error);
        }
    };

    const openDeleteConfirmation = (assignmentId) => {
        setAssignmentToDelete(assignmentId);
        setDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setAssignmentToDelete(null);
        setDeleteConfirmationOpen(false);
    };

    return (
        <div id="dashboardContainer" className="container pt-4">
            <TableContainer id="tableContainer">
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}key={column.id}>{column.name}</TableCell>
                            ))}
                            <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userAssignments
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((assignment) => (
                                <TableRow key={assignment.assignmentId}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            {assignment[column.id]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Button style={{marginRight:'10px'}} component={Link} to={`/UpdateAssignments/${assignment.assignmentId}`} variant="contained" color="primary">Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={() => openDeleteConfirmation(assignment.assignmentId)}>Delete</Button>
                                        <Button style={{marginLeft:'10px'}} component={Link} to={`/ReportAssignment/${assignment.assignmentId}`} variant="contained" color="primary">Report</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[3, 6, 9]}
                component="div"
                count={userAssignments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
                <DialogTitle>Are you sure you want to delete this assignment?</DialogTitle>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmation} color="primary">
                        No
                    </Button>
                    <Button onClick={() => { handleDeleteAssignment(assignmentToDelete); closeDeleteConfirmation(); }} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllAssignments;
