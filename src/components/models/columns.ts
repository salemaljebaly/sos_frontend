import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Strings from "../../utils/Strings";

export const userColumns: GridColDef[] = [
    { field: 'id', headerName: Strings.id, width: 70 },
    // { field: 'firstName', headerName: Strings.firstName.toString(), width: 130 },
    // { field: 'lastName', headerName: Strings.lastName.toString(), width: 130 },
    { field: 'email', headerName: Strings.email.toString(), width: 200 },
    { field: 'isActive', headerName: Strings.isActive.toString(), width: 130 },
    { field: 'createdAt', headerName: Strings.createdAt.toString(), width: 130 },
    { field: 'updatedAt', headerName: Strings.updatedAt.toString(), width: 130 },
    { field: 'role', headerName: Strings.permission.toString(), width: 130 },
    {
      field: 'fullName',
      headerName: Strings.fullName,
    //   description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];