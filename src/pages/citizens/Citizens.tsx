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
} from "../../features/citizens/citizensSlice";
import Strings from "../../utils/Strings";
import { citizensColumns } from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { DeleteRounded, RemoveRedEye } from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

interface Props {
  userData: UsersModel[];
}

function Citizens() {
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
  const { citizens, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.citizen
  );

  const { user } = useSelector((state: any) => state.auth);

  let citizenData: CitizensModel[] = citizens as CitizensModel[];

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
    navigate("/users");
  };
  // ---------------------------------------------------------------------------------- //
  // handle action [delete and view]
  const actionColumn = [
    {
      field: "action",
      headerName: "التحكم",
      width: 200,
      renderCell: (params: any) => {
        return (
          <Box className="cellAction">
            <Box
              component={"a"}
              sx={{ textDecoration: "none" }}
              target={"_blank"}
              href={`https://maps.google.com/?q=${params.row.latitude}, ${params.row.longitude}`}
            >
              <FmdGoodIcon sx={{ color: green[500] }} />
            </Box>
            <Link
              to={`/citizen/${params.row.id}`}
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
      <Grid
        container
        justifyContent="space-between"
        justifyItems="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ margin: 1 }}>
            {Strings.citizens}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="" >
          <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{
              maring: 16,
              textAlign : 'end',
              float : 'right'
            }}
            onClick={() => {
              dispatch(resetSingle());
              navigate("/citizen");
            }}
          >
            {Strings.add + Strings.citizen}
          </Button>
        </Grid>
      </Grid>

      {citizenData?.length > 0 ? (
        <DataTable
          row={citizensColumns}
          data={citizenData}
          action={actionColumn}
        />
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

export default Citizens;
