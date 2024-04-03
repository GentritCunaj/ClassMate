import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getAllStudyGroupsReports } from "../Redux/data/action";

const PublicStudyGroups = () => {
    const dispatch = useDispatch();
    const { publicGroups, loading } = useSelector((store) => store.data);

    const columns = [
        { id: 'studyGroupId', name: "StudyGroupId" },
        { id: 'groupName', name: "Name" },
        { id: 'description', name: "Description" },
        { id: 'creatorId', name: "CreatorId" },
        { id: 'reports', name: "Reports" }
    ];

    useEffect(() => {
        dispatch(getAllStudyGroupsReports());
    }, [dispatch]);

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
                        {publicGroups && publicGroups.map((row, index) => (
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
        </div>
    );
};

export default PublicStudyGroups;