import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from "@mui/material";
import { getAllReports, deleteReport } from "../../../Redux/data/action";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const notify = (text) => toast(text);

const AllReports = () => {
    const dispatch = useDispatch();
    const { reports, loading } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);

    const columns = [
        { id: 'reportId', name: "Report ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "Creator" },
        { id: 'studyGroupId', name: "Study Group " },
        { id: 'resourceId', name: "Resource" },
        { id: 'assignmentId', name: "Assignment" },
        { id: 'quizId', name: "Quiz" },
        { id: 'userId', name: "User" },
        { id: 'chatMessageId', name: "Chat Message" },
    ];
    const chatMessageColumns = [
        { id: 'reportId', name: "Report ID" },
        { id: 'chatMessageId', name: "Chat Message ID" },
        { id: 'userId', name: "User ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "Creator" },
        
    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const [pageForOtherTables, setPageForOtherTables] = useState(
        columns.slice(4).reduce((acc, column) => ({ ...acc, [column.id]: 0 }), {})
    );
    const [rowsPerPageForOtherTables, setRowsPerPageForOtherTables] = useState(
        columns.slice(4).reduce((acc, column) => ({ ...acc, [column.id]: 3 }), {})
    );

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
        dispatch(deleteReport(reportId));
        notify("Report with ID : \"" + reportId + "\" has been deleted");
    };

    const handlePageChangeForTable = (event, newPage, id) => {
        setPageForOtherTables({ ...pageForOtherTables, [id]: newPage });
    };

    const handleRowsPerPageChangeForTable = (event, id) => {
        setRowsPerPageForOtherTables({ ...rowsPerPageForOtherTables, [id]: +event.target.value });
        setPageForOtherTables({ ...pageForOtherTables, [id]: 0 });
    };

    const userReports = reports ? reports.filter(resource => resource.creatorId === user.id) : [];
    return (
        <>
            <ToastContainer />
            {/* Additional Tables */}
            <div className="container pt-4">
    <h2>Chat Messages</h2>
    <TableContainer id="tableContainer" sx={{ width: 1000 }}>
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Report ID</TableCell>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Chat Message ID</TableCell>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>User ID</TableCell>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Title</TableCell>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Description</TableCell>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Creator ID</TableCell>
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                    {/* Other columns if needed */}
                </TableRow>
            </TableHead>
            <TableBody>
                {reports.filter(report => report.chatMessageId !== null).map((report, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{report.reportId}</TableCell>
                        <TableCell>{report.chatMessageId}</TableCell>
                        <TableCell>{report.userId}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell>{report.creatorId}</TableCell>
                        <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteReport(report.reportId)}>
                                        Delete
                                    </Button>
                                </TableCell>
                        
                        
                        {/* Render other columns if needed */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</div>
{columns.slice(4).filter(column => column.id !== 'chatMessageId').map((column, index) => (
    <div key={index} className="container pt-4">
        <h2>{column.name}</h2>
        {/* Additional Table */}
        <TableContainer id="tableContainer" sx={{ width: 1000 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Report ID</TableCell>
                        <TableCell style={{ backgroundColor: 'black', color: 'white' }}>{column.name}</TableCell>
                        <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Title</TableCell>
                        <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Description</TableCell>
                        <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Creator ID</TableCell>
                        <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports
                        .filter(report => report[column.id] !== null)
                        .slice(pageForOtherTables[column.id] * rowsPerPageForOtherTables[column.id], pageForOtherTables[column.id] * rowsPerPageForOtherTables[column.id] + rowsPerPageForOtherTables[column.id])
                        .map((report, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{report.reportId}</TableCell>
                                <TableCell>{report[column.id]}</TableCell>
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell>{report.creatorId}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteReport(report.reportId)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        {/* Additional Table Pagination */}
        <TablePagination
            rowsPerPageOptions={[3, 6, 18, 30]}
            rowsPerPage={rowsPerPageForOtherTables[column.id]}
            page={pageForOtherTables[column.id] || 0}
            component="div"
            count={reports.filter(report => report[column.id] !== null).length}
            onPageChange={(event, newPage) => handlePageChangeForTable(event, newPage, column.id)}
            onRowsPerPageChange={(event) => handleRowsPerPageChangeForTable(event, column.id)}
        />
    </div>
))}
        </>
    );
};    

export default AllReports;

