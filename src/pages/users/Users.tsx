import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/table";
import { UsersModel } from "../../features/users/userModel";
import { getAllUser, reset } from "../../features/users/userSlice";
import Strings from "../../utils/Strings";

interface Props {
  userData: UsersModel[];
}

function Users() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { users, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.users
  );

  let userData: UsersModel[] = users as UsersModel[];

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

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
          dispatch(reset);
          navigator("/register");
        }}
      >
        {Strings.addUser}
      </Button>
      {userData.length > 0 ? (
        <DataTable data={userData} />
      ) : (
        <div>No data returned</div>
      )}
    </>
  );
}

export default Users;
