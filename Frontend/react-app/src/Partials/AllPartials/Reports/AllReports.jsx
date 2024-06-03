import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from "@mui/material";
import { getAllReports, deleteReport } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";

const notify = (text) => toast(text);

const AllReports = () => {
    const dispatch = useDispatch();
    const { reports, loading } = useSelector((store) => store.data);

    const columns = [
        { id: 'reportId', name: "Report ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "Creator" },
        { id: 'studyGroupId', name: "Study Group" },
        { id: 'resourceId', name: "Resource" },
        { id: 'assignmentId', name: "Assignment" },
        { id: 'quizId', name: "Quiz" },
        { id: 'userId', name: "User" },
        { id: 'chatMessageId', name: "Chat Message" },
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
        notify("Report with ID: \"" + reportId + "\" has been deleted");
    };

    const handlePageChangeForTable = (event, newPage, id) => {
        setPageForOtherTables({ ...pageForOtherTables, [id]: newPage });
    };

    const handleRowsPerPageChangeForTable = (event, id) => {
        setRowsPerPageForOtherTables({ ...rowsPerPageForOtherTables, [id]: +event.target.value });
        setPageForOtherTables({ ...pageForOtherTables, [id]: 0 });
    };

    const renderRelatedData = (report, column) => {
        switch (column.id) {
            case 'studyGroupId':
                return report.studyGroup ? report.studyGroup.groupName : 'N/A';
            case 'resourceId':
                return report.resource ? report.resource.title : 'N/A';
            case 'assignmentId':
                return report.assignment ? report.assignment.title : 'N/A';
            case 'quizId':
                return report.quiz ? report.quiz.title : 'N/A';
            case 'creatorId':
                return report.creator ? report.creator.email : 'N/A';
            case 'userId':
                return report.user ? report.user.userName : 'N/A';
            default:
                return report[column.id];
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container pt-4">
                <h2>Chat Messages</h2>
                <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Report ID</TableCell>
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Chat Message ID</TableCell>
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}>User</TableCell>
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Report Title</TableCell>
                                <TableCell style={{ backgroundColor: 'black', color: 'white',width:'30%' }}>Description</TableCell>
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Creator</TableCell>
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? reports.filter(report => report.chatMessageId !== null).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : reports.filter(report => report.chatMessageId !== null)
                            ).map((report, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{report.reportId}</TableCell>
                                    <TableCell>{report.chatMessageId}</TableCell>
                                    <TableCell>{report.user != null && report.user['username']}</TableCell>
                                    <TableCell>{report.title}</TableCell>
                                    <TableCell>{report.description}</TableCell>
                                    <TableCell>{report.creator != null && report.creator['email']}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteReport(report.reportId)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 6, 9, 12]}
                    component="div"
                    count={reports.filter(report => report.chatMessageId !== null).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
            {columns.slice(4).filter(column => column.id !== 'chatMessageId').map((column, index) => (
                <div key={index} className="container pt-4">
                    <h2>{column.name}</h2>
                    <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Report ID</TableCell>
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>{column.name} Name</TableCell>
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Report Title</TableCell>
                                    <TableCell style={{ backgroundColor: 'black', color: 'white',width:'30%' }}>Description</TableCell>
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Creator</TableCell>
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
                                            <TableCell>{renderRelatedData(report, column)}</TableCell>
                                            <TableCell>{report.title}</TableCell>
                                            <TableCell>{report.description}</TableCell>
                                            <TableCell>{report.creator != null && report.creator['email']}</TableCell>
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
