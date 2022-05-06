import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
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
} from "../../features/about/aboutSlice";
import Strings from "../../utils/Strings";
import {
  AboutColumns,
  citizensColumns,
  PoliceOfficesColumns,
} from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { DeleteRounded, RemoveRedEye } from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import { AboutModel } from "../../features/about/aboutModel";

function Abouts() {
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
  const { Abouts, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.about
  );

  const { user } = useSelector((state: any) => state.auth);

  let data: AboutModel[] = Abouts as AboutModel[];

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
          <Box className="cellAction">
            <Link
              to={`/about/${params.row.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(resetSingle())}
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
      <Grid
        container
        justifyContent="space-between"
        justifyItems="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ margin: 1 }}>
            {Strings.abouts}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="">
          <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{
              maring: 16,
              textAlign: "end",
              float: "right",
            }}
            onClick={() => {
              dispatch(resetSingle());
              navigate("/about");
            }}
          >
            {Strings.add + Strings.about}
          </Button>
        </Grid>
      </Grid>

      {data?.length > 0 ? (
        <DataTable row={AboutColumns} data={data} action={actionColumn} />
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

export default Abouts;
