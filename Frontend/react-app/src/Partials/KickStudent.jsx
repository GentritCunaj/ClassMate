import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination, TextField, Box } from "@mui/material";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [studyGroupId, setStudyGroupId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');

  // Function to fetch students by study group ID
  const fetchStudentsByStudyGroupId = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (!studyGroupId) {
        setStudents([]);
        return;
      }

      const response = await axios.get(`https://localhost:7168/Auth/students?studyGroupId=${studyGroupId}`);
      setStudents(response.data.data);
    } catch (error) {
      setError('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  // Function to remove student from study group
  const removeStudentFromStudyGroup = async (studentId) => {
    try {
      await axios.delete(`https://localhost:7168/Auth/students/${studentId}?studyGroupId=${studyGroupId}`, {
        data: { studyGroupId, studentId } // Pass studyGroupId and studentId as data in the request body
      });
      setSuccessMessage('Student removed from the group successfully.');
    } catch (error) {
      console.error('Error removing student:', error.response?.data?.message);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStudentsByStudyGroupId();
  };

  // Example usage
  useEffect(() => {
    // Fetch students when component mounts
    fetchStudentsByStudyGroupId();
  }, []);

  const handleOpenDialog = (studentId) => {
    setSelectedStudentId(studentId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: 'studentId', name: "Student ID" },
    { id: 'userName', name: "Name" },
    { id: 'email', name: "Email" },
  ];

  return (
    <Box id="dashboardContainer" className="container pt-4">
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Enter Study Group ID"
          variant="outlined"
          value={studyGroupId}
          onChange={(e) => setStudyGroupId(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Fetch Students
        </Button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {studyGroupId && students.length === 0 && !loading && <div>No students found in the group.</div>}
      
      {students.length > 0 && (
        <div>
          <TableContainer id="tableContainer" sx={{ width: 1000 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={columns.length + 1} style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Students in Study Group</TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                  ))}
                  <TableCell style={{ backgroundColor: 'black', color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students && students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column, colIndex) => (
                        <TableCell key={colIndex}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(row.studentId)}>Kick Student</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to kick this student from the group?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={() => removeStudentFromStudyGroup(selectedStudentId)} color="secondary" autoFocus>
                Kick
              </Button>
            </DialogActions>
          </Dialog>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students ? students.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}

      {successMessage && <div>{successMessage}</div>}
    </Box>
  );
};

export default StudentTable;
