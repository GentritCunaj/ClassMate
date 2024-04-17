import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,Button } from "@mui/material";
import { getAllAssignment } from "../../../Redux/data/action";

const AllAsignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading } = useSelector((store) => store.data); // Assuming the state property is named "quizzes"
    const { user } = useSelector((store) => store.auth); // Assuming user information is stored in Redux state

    const columns = [
        { id: 'assignmentId', name: "Assignment ID" },
        { id: 'title', name: "Title" },
        { id: 'description', name: "Description" },
        { id: 'dueDate', name: "Date" },

    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

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
    

    // Filter quizzes based on the creatorId
    const userAssignment =  assignments ? assignments || assignments.filter(assignment => assignment.teacherId === user.id) : [];

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
                        {userAssignment && userAssignment
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
                                        <Button style={{marginRight:'10px'}}variant="contained" color="primary" >Update</Button>
                                        <Button variant="contained" color="secondary" >Delete</Button>
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
                count={userAssignment.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
};

export default AllAsignments;