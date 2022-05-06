import { Add } from "@mui/icons-material";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/table";
import { CitizensModel } from "../../features/citizens/citizensModel";
import { UsersModel } from "../../features/users/userModel";
import {
  deleteById,
  getAll,
  reset,
  resetSingle,
} from "../../features/reports/reportSlice";
import Strings from "../../utils/Strings";
import {
  citizensColumns,
  PoliceOfficesColumns,
  ReportColumns,
} from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { DeleteRounded, RemoveRedEye } from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { ReportsModel } from "../../features/reports/reportsModel";

interface Props {
  userData: UsersModel[];
}

function Reports() {
  const navigate = useNavigate();
  // ---------------------------------------------------------------------------------- //
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  // ---------------------------------------------------------------------------------- //

  const dispatch = useDispatch();
  const { Reports, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.report
  );

  const { user } = useSelector((state: any) => state.auth);

  let data: ReportsModel[] = Reports as ReportsModel[];
  useEffect(() => {
    if (user) {
      dispatch(getAll());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  // ---------------------------------------------------------------------------------- //
  const handleDelete = (id: number) => {
    // TODO delete from users fix delete user
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteById(id));
    dispatch(getAll());
    navigate("/reports");
  };
  // ---------------------------------------------------------------------------------- //
  // handle action [delete and view]
  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 220,
      renderCell: (params: any) => {
        return (
          <Box className="cellAction" sx={{ margin: "auto" }}>
            <Box
              component={"a"}
              sx={{
                textDecoration: "none",
                display: "inline-block",
                marginRight: 2,
                marginLeft: 2,
              }}
              target={"_blank"}
              href={
                params.row.reportFilePath != null
                  ? `${Strings.API_URL}report/upload/view/${params.row.id}`
                  : `#`
              }
            >
              <Avatar
                key={params.row.id}
                alt={Strings.reportImage}
                sx={{ width: 30, height: 30 }}
                src={
                  params.row.reportFilePath != null
                    ? `${Strings.API_URL}report/upload/view/${params.row.id}`
                    : `#`
                }
              />
            </Box>
            <Box
              component={"a"}
              sx={{ textDecoration: "none" }}
              target={"_blank"}
              href={`https://maps.google.com/?q=${params.row.latitude}, ${params.row.longitude}`}
            >
              <FmdGoodIcon sx={{ color: green[500] }} />
            </Box>
            <Link
              to={`/report/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <RemoveRedEye
                sx={{ color: green[500], marginRight: 2, marginLeft: 2 }}
              ></RemoveRedEye>
            </Link>

            <DeleteRounded
              className="deleteButton"
              sx={{ color: red[500] }}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: Strings.areYouSureToDelete,
                  subTitle: Strings.youCantUndoThisStep,
                  onConfirm: () => {
                    handleDelete(params.row.id);
                  },
                });
              }}
            >
              {Strings.delete}
            </DeleteRounded>
          </Box>
        );
      },
    },
  ];
  // ---------------------------------------------------------------------------------- //
  return (
    // check of array of user has item then return table
    <>

      <Typography variant="h5" sx={{margin: 1}}>{Strings.reports}</Typography>
      {data?.length > 0 ? (
        <DataTable row={ReportColumns} data={data} action={actionColumn} />
      ) : (
        <div>No data returned</div>
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default Reports;
