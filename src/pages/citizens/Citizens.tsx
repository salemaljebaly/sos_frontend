import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/table";
import { CitizensModel } from "../../features/citizens/citizensModel";
import { UsersModel } from "../../features/users/userModel";
import {  deleteById, getAll, reset, resetSingle } from "../../features/citizens/citizensSlice";
import Strings from "../../utils/Strings";
import { citizensColumns } from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import {
  DeleteRounded,
  RemoveRedEye,
} from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";

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
    onConfirm : () => {}
  });
  // ---------------------------------------------------------------------------------- //

  const dispatch = useDispatch();
  const { citizens, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.citizen
  );

  const { user } = useSelector(
    (state: any) => state.auth
  );

  let citizenData: CitizensModel[] = citizens as CitizensModel[];

  console.log(citizens);
  useEffect(() => {
    if(user){
      dispatch(getAll());
    } else {
      navigate('/login')
    }
  }, [dispatch]);
  console.log(citizens);

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
      width: 100,
      renderCell: (params: any) => {
        return (
          <Box className="cellAction">
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
      <Button
        variant="outlined"
        endIcon={<Add />}
        sx={{
          maring: 16,
        }}
        onClick={() => {
          dispatch(resetSingle());
          navigate("/register");
        }}
      >
        {Strings.add + Strings.citizen }
      </Button>
      {citizenData?.length > 0 ? (
        <DataTable row={citizensColumns} data={citizenData} action={actionColumn}/>
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
