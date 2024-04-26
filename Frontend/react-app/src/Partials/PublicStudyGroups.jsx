import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, Button } from "@mui/material";
import { getAllPublicRooms } from "../Redux/data/action";
import { reportRoom } from "../Redux/data/action";
import { Link } from 'react-router-dom';
const PublicStudyGroups = () => {
    const dispatch = useDispatch();
    const { publicGroups, loading, reportStudyRoom } = useSelector((store) => store.data);

    const columns = [
        { id: 'studyGroupId', name: "StudyGroupId" },
        { id: 'groupName', name: "Name" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "CreatorId" },
        { id: 'reports', name: "Reports" },
        { id: 'report', name: "Report" } // New column for report button
    ];

    const handlechangepage = (event, newpage) => {
        pagechange(newpage);
    };

    

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    };

    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    useEffect(() => {
        dispatch(getAllPublicRooms());
    }, [dispatch]);

    return (
        <div id="dashboardContainer" className="container pt-4">
            <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                <h1>Public Study Groups</h1>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {publicGroups && publicGroups
                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, colIndex) => {
                                        let value = row[column.id];
                                        if (column.id === 'report') {
                                            // Render a button for reporting
                                            return (
                                                
                                                <TableCell key={colIndex}>
                                                    <Button component={Link} to={`/ReportStudyGroup/${row.studyGroupId}`} variant="contained" color="primary">Report</Button>
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={colIndex}>
                                                    {value}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowperpage}
                page={page}
                component="div"
                count={publicGroups ? publicGroups.length : 0}
                onPageChange={handlechangepage}
                onRowsPerPageChange={handleRowsPerPage}
            />
        </div>
    );
};

export default PublicStudyGroups;
