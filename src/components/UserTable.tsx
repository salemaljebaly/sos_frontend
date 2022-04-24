import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Strings from '../utils/Strings';
import { UsersModel } from '../features/users/userModel';
import { RemoveRedEye } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

interface Column {
  id: 'id' | 'firstName' | 'lastName' | 'email' | 'isActive' | 'role' | 'username';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: Strings.id, minWidth: 170 },
  { id: 'firstName', label: Strings.fullName, minWidth: 100 , 

},
  {
    id: 'email',
    label: Strings.email,
    minWidth: 200,
    align: 'right'
  },
  {
    id: 'username',
    label: Strings.userName,
    minWidth: 170,
    align: 'right',
    // format: (value: string) => ,
  },
  {
    id: 'role',
    label: Strings.permission,
    minWidth: 170,
    align: 'right',
    // format: (value: string) =>  value == 'Admin' ? "tueeee" : "falssse"
  },
];


interface Props{
  data: UsersModel[];
}


export default function StickyHeadTable({data} : Props) {
  // use navigate from react router dom 
  let navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'string'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                     <TableCell >
                     <RemoveRedEye sx={{color: green[500], marginRight: 2, marginLeft: 2}} onClick={() => {navigate(`/user/${row.id}`)}} />
                        </TableCell>
                    
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
