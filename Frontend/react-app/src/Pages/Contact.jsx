import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, TablePagination, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Sidebar from '../Partials/Sidebar'; // Import the Sidebar component

function Contact() {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        // Fetch contacts when the component mounts
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:5000/contacts'); // Assuming backend server is running on port 5000
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'message', name: 'Message' }
    ];

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpenDrawer(open);
    };

    return (
        <div id="dashboardContainer" className="container pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <Sidebar /> {/* Include the Sidebar component */}
            <div style={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'left', marginLeft: '10%' }}>Contact List</Typography>
                <TableContainer id="tableContainer" sx={{ width: '80%', margin: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((contact, index) => (
                                    <TableRow key={index}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id}>
                                                {contact[column.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: '10%' }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={contacts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </div>
        </div>
    );
}

export default Contact;
