import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { UserModel } from "../../features/users/userModel";
import { ReportState, ReportStateArabic, ReportType, ReportTypeArabic } from "../../utils/enum/reporttype";
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
  }
  ];

  
export const PoliceOfficesColumns: GridColDef[] = [
  { field: 'id', headerName: Strings.id, width: 70 },
  { field: 'office_name', headerName: Strings.office_name.toString(), width: 200 },
  { field: 'office_city', headerName: Strings.city.toString(), width: 200 },
];



export const AboutColumns: GridColDef[] = [
  { field: 'id', headerName: Strings.id, width: 70 },
  { field: 'key', headerName: Strings.fieldName.toString(), width: 300 },
  { field: 'value', headerName: Strings.fieldValue.toString(), width: 300 },
];



export const ReportColumns: GridColDef[] = [
  { field: 'id', headerName: Strings.id, width: 70 },
  {
    field: 'fullName',
    headerName: Strings.repoterName,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.reporter.firstName  || ''} ${params.row.reporter.lastName || ''}`,
  },
  { field: 'phone', headerName: Strings.phone.toString(), width: 150,
  valueGetter: (params: GridValueGetterParams) =>
      `${params.row.reporter.phone}`,
},
  { field: 'desc', headerName: Strings.reportDesc.toString(), width: 300 },
  { field: 'type', headerName: Strings.reportType.toString(), width: 80   ,
  valueGetter: (params: GridValueGetterParams) => {
    switch(params.row.type){
      case ReportType.FIRE:
      return ReportTypeArabic.FIRE
      case ReportType.AMBULANCE:
      return ReportTypeArabic.AMBULANCE
      case ReportType.ACCIDANT:
      return ReportTypeArabic.ACCIDANT
    }
  }
},

  { field: 'state', headerName: Strings.reprortState.toString(), width: 150 ,
  valueGetter: (params: GridValueGetterParams) => {
    switch(params.row.state){
      case ReportState.PENDING:
      return ReportStateArabic.PENDING
      case ReportState.PROCESSING:
      return ReportStateArabic.PROCESSING
      case ReportState.DONE:
      return ReportStateArabic.DONE
    }
  }
}
];