import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { UserModel } from "../../features/users/userModel";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";

export const userColumns: GridColDef[] = [
    { field: 'id', headerName: Strings.id, width: 70 },
    // { field: 'firstName', headerName: Strings.firstName.toString(), width: 130 },
    // { field: 'lastName', headerName: Strings.lastName.toString(), width: 130 },
    {
      field: 'fullName',
      headerName: Strings.fullName,
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName  || ''} ${params.row.lastName || ''}`,
    },
    { field: 'email', headerName: Strings.email.toString(), width: 200 },
    { field: 'isActive', headerName: Strings.isActive.toString(), width: 130 , 
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isActive ? 'مفعل' : 'غير مفعل'}`,
  },
    { field: 'role', headerName: Strings.permission.toString(), width: 130 ,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.role == Role.Admin ? Strings.admin : Strings.normalUser}`,
  },
  ];


  
export const citizensColumns: GridColDef[] = [
  { field: 'id', headerName: Strings.id, width: 70 },
  // { field: 'firstName', headerName: Strings.firstName.toString(), width: 130 },
  // { field: 'lastName', headerName: Strings.lastName.toString(), width: 130 },
  {
    field: 'fullName',
    headerName: Strings.fullName,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName  || ''} ${params.row.lastName || ''}`,
  },
  { field: 'email', headerName: Strings.email.toString(), width: 200 },
  { field: 'phone', headerName: Strings.phone.toString(), width: 200 },
  { field: 'city', headerName: Strings.city.toString(), width: 200 },
  { field: 'isActive', headerName: Strings.isActive.toString(), width: 130 , 
  valueGetter: (params: GridValueGetterParams) =>
      `${params.row.isActive ? 'مفعل' : 'غير مفعل'}`,
},
  { field: 'location', headerName: Strings.location.toString(), width: 130 ,
  valueGetter: (params: GridValueGetterParams) =>
      `${params.row.longitude + params.row.latitude}`,
},
];
