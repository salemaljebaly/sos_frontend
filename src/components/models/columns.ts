import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { UserModel } from "../../features/users/userModel";
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


  interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
  }
  
  function createData(
    id: number,
    email: string,
    firstName: string,
    isActive: boolean,
    lastName: string,
    password: string,
    role: string,
    username: string,
  ): UserModel {
    return {
      id,
      email,
      firstName,
      isActive,
      lastName,
      password,
      role,
      username,
    };
  }
  
  interface HeadCell {
    disablePadding: boolean;
    id: keyof UserModel;
    label: string;
  }

export const headCells: readonly HeadCell[] = [
    {
      id: 'id',
      disablePadding: true,
      label:  Strings.id,
    },
    {
      id: 'firstName',
      disablePadding: true,
      label:  Strings.fullName,
    },
    {
      id: 'email',
      disablePadding: true,
      label:  Strings.email.toString(),
    },
    {
      id: 'isActive',
      disablePadding: true,
      label:  Strings.isActive.toString(),
    },
    {
      id: 'role',
      disablePadding: true,
      label:  Strings.permission.toString(),
    },
  ];