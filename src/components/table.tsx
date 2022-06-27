import * as React from "react";
import { DataGrid, GridColDef, GridEditModes, GridValueGetterParams } from "@mui/x-data-grid";
import { UsersModel } from "../features/users/userModel";
import Strings from "../utils/Strings";
import { useDispatch, useSelector } from "react-redux";
import { CitizensModel } from "../features/citizens/citizensModel";
import { PolicOfficeModel } from "../features/police_officess/policeOfficesModel";
import { AboutModel } from "../features/about/aboutModel";
import { ReportsModel } from "../features/reports/reportsModel";

interface Props {
  data: UsersModel[] | CitizensModel[] | PolicOfficeModel[] | AboutModel[] | ReportsModel[];
  row : GridColDef[];
  action : any;
}

export default function DataTable({  row, data, action }: Props) {
  const dispatch = useDispatch();
  // TODO fix navigate when user delete
  const localizedTextsMap = {
    columnMenuUnsort: Strings.columnMenuUnsort,
    columnMenuSortAsc: Strings.columnMenuSortAsc,
    columnMenuSortDesc: Strings.columnMenuSortDesc,
    columnMenuFilter: Strings.columnMenuFilter,
    columnMenuHideColumn: Strings.columnMenuHideColumn,
    columnMenuShowColumns: Strings.columnMenuShowColumns
  }
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
          },
          }}
          localeText={localizedTextsMap}
          autoPageSize={true}
          rows={data}
          columns={row.concat(action)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          editMode={GridEditModes.Row}
          // checkboxSelection
        />
      </div>


    </>
  );
}
