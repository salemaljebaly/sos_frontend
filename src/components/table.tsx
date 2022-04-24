import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {  UsersModel } from '../features/users/userModel';
import { userColumns } from './models/columns';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { DeleteForeverOutlined, DeleteForeverRounded, DeleteOutlineRounded, DeleteRounded, RemoveRedEye } from '@mui/icons-material';
import Strings from '../utils/Strings';
import { Box } from '@mui/system';
import { green, red } from '@mui/material/colors';



// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

interface Props{
  data: UsersModel[];
}

// ---------------------------------------------------------------------------------- //
// handle delete button
const handleDelete = (id : number) => {
  // TODO delete from users
  alert('userDeleted' + id);
};
// ---------------------------------------------------------------------------------- //
// handle action [delete and view]
const actionColumn = [
  {
    field: "action",
    headerName: "التحكم",
    width: 100,
    renderCell: (params: any) => {
      return (
        <Box className="cellAction" >
          
          <Link to={`/users/edit/${params.row.id}`}
            style={{ textDecoration: "none" }}>
            
            <RemoveRedEye sx={{color: green[500], marginRight: 2, marginLeft: 2}} >
              
            </RemoveRedEye>
          </Link>
          
          <DeleteRounded
            className="deleteButton"
            sx={{color: red[500]}} 
            onClick={() => handleDelete(params.row.id)}
          >
            {Strings.delete}
          </DeleteRounded>
        </Box>
      );
    },
  },
];
// ---------------------------------------------------------------------------------- //
export default function DataTable({data} : Props) {
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}

