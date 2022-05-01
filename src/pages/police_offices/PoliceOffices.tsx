import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/table";
import { CitizensModel } from "../../features/citizens/citizensModel";
import { UsersModel } from "../../features/users/userModel";
import {  deleteById, getAll, reset, resetSingle } from "../../features/police_officess/policeOfficesSlice";
import Strings from "../../utils/Strings";
import { citizensColumns, PoliceOfficesColumns } from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import {
  DeleteRounded,
  RemoveRedEye,
} from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import { PoliceOfficesModel } from "../../features/police_officess/policeOfficesModel";

interface Props {
  userData: UsersModel[];
}

function PoliceOffices() {
  
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
  const { PoliceOffices, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.policeOffices
  );

  const { user } = useSelector(
    (state: any) => state.auth
  );

  let data: PoliceOfficesModel[] = PoliceOffices as PoliceOfficesModel[];

  useEffect(() => {
    if(user){
      dispatch(getAll());
    } else {
      navigate('/login')
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
    navigate("/police-offices");
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
              to={`/police-office/${params.row.id}`}
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
          navigate("/police-office");
        }}
      >
        {Strings.add + Strings.citizen }
      </Button>
      {data?.length > 0 ? (
        <DataTable row={PoliceOfficesColumns} data={data} action={actionColumn}/>
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

export default PoliceOffices;
