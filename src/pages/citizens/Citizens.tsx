import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/table";
import { CitizensModel } from "../../features/citizens/citizensModel";
import { UsersModel } from "../../features/users/userModel";
import {  getAllCitizens, reset, resetSingleCitizen } from "../../features/citizens/citizensSlice";
import Strings from "../../utils/Strings";

interface Props {
  userData: UsersModel[];
}

function Citizens() {
  const navigator = useNavigate();
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
      dispatch(getAllCitizens());
    } else {
      navigator('/login')
    }
  }, [dispatch]);
  console.log(citizens);

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
          dispatch(resetSingleCitizen());
          navigator("/register");
        }}
      >
        {Strings.addUser}
      </Button>
      {citizenData?.length > 0 ? (
        <DataTable data={citizenData} />
      ) : (
        <div>No data returned</div>
      )}
    </>
  );
}

export default Citizens;
