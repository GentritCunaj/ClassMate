import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from "@mui/material";
import { getAllStudyGroupsReports } from "../Redux/data/action";
import { deleteStudyGroup,deleteReports,deleteResources } from "../Redux/data/action";

const StudyGroupsReports = () => {
    const dispatch = useDispatch();
    const { studyGroupReports, loading } = useSelector((store) => store.data);

    const columns = [
        { id: 'studyGroupId', name: "StudyGroupId" },
        { id: 'groupName', name: "Name" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "CreatorId" },
        { id: 'reports', name: "Reports" }
    ];

    const handlechangepage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getAllStudyGroupsReports());
    }, [dispatch]);

    const handleDeleteStudyGroup = async (studyGroupId) => {
        debugger;
        try {
            // Dispatch deleteReports action first
            const deleteReportsResponse = await dispatch(deleteReports("StudyGroup", studyGroupId));
            console.log("Reports deleted successfully.", deleteReportsResponse);

            const deleteResourcesResponse = await dispatch(deleteResources(studyGroupId));
            console.log("Resources deleted successfully.", deleteResourcesResponse);
            // If the deletion of reports was successful, proceed with deleting the study group
            if (deleteReportsResponse.success && deleteResourcesResponse.success) {
                const deleteStudyGroupResponse = await dispatch(deleteStudyGroup(studyGroupId));
                console.log("Study group deleted successfully.", deleteStudyGroupResponse);
    
                // After successful deletion, fetch the updated list of study group reports
                dispatch(getAllStudyGroupsReports());
            } else {
                console.error("Error deleting reports:", deleteReportsResponse.message);
            }
        } catch (error) {
            console.error("Error deleting study group:", error);
        }
    };
    

    return (
        <div id="dashboardContainer" className="container pt-4">
            <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                <h1>Study Groups with Reports</h1>
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
                        {studyGroupReports && studyGroupReports
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
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteStudyGroup(row.studyGroupId)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowsPerPage}
                page={page}
                component="div"
                count={studyGroupReports ? studyGroupReports.length : 0}
                onPageChange={handlechangepage}
                onRowsPerPageChange={handleRowsPerPage}
            />
        </div>
    );
};

export default StudyGroupsReports;