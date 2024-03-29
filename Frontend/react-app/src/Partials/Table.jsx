import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Box } from "@mui/material";
import { getAllUsers } from "../Redux/data/action";
const Tables = () => {

  const dispatch = useDispatch();
  const {teachers,students,admins,loading} = useSelector((store) => store.data);

  const columns = [
    {id:'email',name:"Email"},
    {id:'userName',name:"Username"},
  
  ]

  const handlechangepage = (event, newpage) => {
    pagechange(newpage)
  }
  const handleRowsPerPage = (event) => {
      rowperpagechange(+event.target.value)
      pagechange(0);
  }


const [page, pagechange] = useState(0);
const [rowperpage, rowperpagechange] = useState(5);

    useEffect(() => {
      dispatch(getAllUsers('Teacher'));
      dispatch(getAllUsers('Admin'));
      dispatch(getAllUsers('Student'));
    }, [dispatch]);



  return (
    <>
     <div id="dashboardContainer" class="container pt-4">
    <TableContainer id="tableContainer"  sx={{width:1000,}}>
    <Table stickyHeader>
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                ))}
                
            </TableRow>
        </TableHead>
        <TableBody>
            {teachers && teachers
                .slice(page * rowperpage, page * rowperpage + rowperpage)
                .map((row, i) => {
                    const modalKey = row[columns[0].id];
                    return (
                        <TableRow key={i}>
                           
                            {columns && columns.map((column, i) => {
                                let value = row[column.id];
                              
                                return (
                                    <>
                                    <TableCell key={i}>
                                        {value}
                                    </TableCell>
                                
                                    </>

                                )
                                
                                
                            })}
                           
                            
                        </TableRow>
                    )
                })}
        </TableBody>
    </Table>
</TableContainer>
<TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    rowsPerPage={rowperpage}
    page={page}
    count={teachers.length}
    component="div"
    onPageChange={handlechangepage}
    onRowsPerPageChange={handleRowsPerPage}

>

</TablePagination>
</div>
   </>
  );
}

export default Tables;
