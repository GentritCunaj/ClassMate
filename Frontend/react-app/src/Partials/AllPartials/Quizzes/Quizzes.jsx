import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import { getAllQuizzes } from "../../../Redux/data/action";

const Quizzes = () => {
    const dispatch = useDispatch();
    const { quizs, loading } = useSelector((store) => store.data); // Assuming the state property is named "quizzes"
    const { user } = useSelector((store) => store.auth); // Assuming user information is stored in Redux state

    const columns = [
        { id: 'quizID', name: "Quiz ID" },
        { id: 'title', name: "Title" },
        { id: 'subject', name: "Subject" },
        { id: 'noOfQuestions', name: "Number of Questions" },
        { id: 'pointPerQuestion', name: "Point Per Question" },
        { id: 'negativeMarking', name: "Negative Marking" },
        { id: 'negativeMarkingPerQuestion', name: "Negative Marking Per Question" },
        { id: 'totalTimeInMinutes', name: "Total Time (Minutes)" },
        // Add more columns as needed
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

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

    // Filter quizzes based on the creatorId
    const userQuizzes = quizs ? quizs.filter(quiz => quiz.creatorId === user.id) : [];

    return (
        <div id="dashboardContainer" className="container pt-4">
            <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                            ))}
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
        </div>
    );
};

export default Quizzes;