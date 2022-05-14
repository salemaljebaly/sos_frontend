import { Add } from "@mui/icons-material";
import { Button , Grid, Typography} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userColumns } from "../../components/models/columns";
import DataTable from "../../components/table";
import { UsersModel } from "../../features/users/userModel";
import {  deleteUserById, getAllUser, reset, resetSingleUser } from "../../features/users/userSlice";
import Strings from "../../utils/Strings";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import {
  DeleteForeverOutlined,
  DeleteForeverRounded,
  DeleteOutlineRounded,
  DeleteRounded,
  RemoveRedEye,
} from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";

interface Props {
  userData: UsersModel[];
}

function Users() {
  
  const navigate = useNavigate();
  // ---------------------------------------------------------------------------------- //
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm : () => {}
  });
  // ---------------------------------------------------------------------------------- //
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { users, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.users
  );

  const { user } = useSelector(
    (state: any) => state.auth
  );

  let userData: UsersModel[] = users as UsersModel[];

  useEffect(() => {
    if(user){
      dispatch(getAllUser());
    } else {
      navigator('/login')
    }
  }, [dispatch]);
  // ---------------------------------------------------------------------------------- //
  const handleDelete = (id: number) => {
    // TODO delete from users fix delete user
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteUserById(id));
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
              to={`/user/${params.row.id}`}
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
            {Strings.users}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="">
        {user.role == 'Admin' ?
          <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{
              maring: 16,
              textAlign: "end",
              float: "right",
            }}
            onClick={() => {
              dispatch(resetSingleUser());
              navigator("/register");
            }}
          >
          {Strings.add + Strings.user}
          </Button> : null}
        </Grid>
      </Grid>
      {userData?.length > 0 ? (
        <DataTable row={userColumns} data={userData} action={actionColumn} />
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

export default Users;
