// Quizzes.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getAllQuizzes, deleteQuiz } from "../../../Redux/data/action"; 
import { Link } from "react-router-dom"; 

const Quizzes = () => {
    const dispatch = useDispatch();
    const { quizs, loading } = useSelector((store) => store.data); 
    const { user } = useSelector((store) => store.auth); 

    const columns = [
        { id: 'quizID', name: "Quiz ID" },
        { id: 'title', name: "Title" },
        { id: 'subject', name: "Subject" },
        { id: 'noOfQuestions', name: "Number of Questions" },
        { id: 'pointPerQuestion', name: "Point Per Question" },
        { id: 'negativeMarking', name: "Negative Marking" },
        { id: 'negativeMarkingPerQuestion', name: "Negative Marking Per Question" },
        { id: 'totalTimeInMinutes', name: "Total Time (Minutes)" },
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    useEffect(() => {
        dispatch(getAllQuizzes());
    }, [dispatch]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const userQuizzes = Array.isArray(quizs) ? quizs.filter(quiz => quiz.creatorId === user.id) : [];

    const handleDeleteQuiz = async (quizID) => {
        try {
            await dispatch(deleteQuiz(quizID));
            console.log("Quiz deleted successfully.");

            dispatch(getAllQuizzes());
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const openDeleteConfirmation = (quizID) => {
        setQuizToDelete(quizID);
        setDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setQuizToDelete(null);
        setDeleteConfirmationOpen(false);
    };

    return (
        <div id="dashboardContainer" className="container pt-4">
            <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                            ))}
                            <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userQuizzes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {row[column.id]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => openDeleteConfirmation(row.quizID)}>Delete</Button>
                                        <Button component={Link} to={`/editquiz/${row.quizID}`} variant="contained" color="primary">Edit</Button>
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
                count={userQuizzes.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
                <DialogTitle>Are you sure you want to delete this quiz?</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteConfirmation} color="primary">
                        No
                    </Button>
                    <Button onClick={() => { handleDeleteQuiz(quizToDelete); closeDeleteConfirmation(); }} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Quizzes;
