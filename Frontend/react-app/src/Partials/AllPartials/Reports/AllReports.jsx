import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,Button } from "@mui/material";
import { getAllReports,deleteReport } from "../../../Redux/data/action";
import { Link } from 'react-router-dom';


const AllReports = () => {
    const dispatch = useDispatch();
    const { reports, loading } = useSelector((store) => store.data); // Assuming the state property is named "quizzes"
    const { user } = useSelector((store) => store.auth); // Assuming user information is stored in Redux state

    const columns = [
        { id: 'reportId', name: "Report ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "Creator"},
        { id: 'studyGroupId', name: "Study Group "},
        { id: 'resourceId', name: "Resource"},
        { id: 'assignmentId', name: "Assignment"},
        { id: 'quizId', name: "Quiz"},
        { id: 'userId', name: "User"},
        { id: 'chatMessageId', name: "Chat Message"},

    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    useEffect(() => {
        dispatch(getAllReports());
    }, [dispatch]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDeleteReport = (reportId) => {

        dispatch(deleteReport(reportId)); // Dispatch deleteResource action with the resourceId
    };

    // Filter quizzes based on the creatorId
    const userReports =  reports ? reports || reports.filter(resource => resource.creatorId === user.id) : [];

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
                        {userReports && userReports
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
                                    <Button style={{marginRight:'10px'}} component={Link} to={`/UpdateReport/${row.reportId}`} variant="contained" color="primary">Edit</Button>
                                    <Button  
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDeleteReport(row.reportId)} // Call deleteResource with the resourceId
                    >
                        Delete
                    </Button>
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
                count={userReports.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
};

export default AllReports;