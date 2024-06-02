import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { getAllSubjects, createSubject, deleteSubject } from "../Redux/data/action";

const Subjects = () => {
    const dispatch = useDispatch();
    const { subjects, loading } = useSelector((store) => store.data);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const columns = [
        { id: 'subjectId', name: "SubjectId" },
        { id: 'name', name: "Name" },
        { id: 'description', name: "Description" },
        { id: 'delete', name: 'Delete' }
    ];

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleDelete = (id) => {
        dispatch(deleteSubject(id));
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(createSubject({ name, description }));
        handleClose();
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getAllSubjects());
    }, [dispatch]);

    return (
        <div id="dashboardContainer" className="container pt-4">
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Subject</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Subject</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form to add a new subject.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
            <TableContainer id="tableContainer" sx={{ width: 1000 }}>
                <h1>Subjects</h1>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects && subjects
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, colIndex) => {
                                        let value = row[column.id];
                                        if (column.id === 'delete') {
                                            return (
                                                <TableCell key={colIndex}>
                                                    <Button onClick={() => handleDelete(row.subjectId)} variant="contained" color="primary">Delete</Button>
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
                rowsPerPage={rowsPerPage}
                page={page}
                component="div"
                count={subjects ? subjects.length : 0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
};

export default Subjects;
