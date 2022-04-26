import {
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Severity } from "../../components/SnackBar";
import TransitionAlerts from "../../components/TransitionAlert";
import {
  login,
  handleChangeData,
  register,
  getAllUser,
  reset,
  findUserById,
  deleteUserById,
  updateUserById,
} from "../../features/users/userSlice";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";

function Register() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { users, singleUser,  isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.users
  );

  // -------------------------------------------------------------- //
  // handle formData
  const [formData, setFormData] = useState({
    //TODO register user field
    // TODO fix that and use state in whole screen
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isActive: false,
    role: Role.User,
  });
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    if (id === undefined) {
      const singleUserObjectHasDataOrNot : boolean = Object.keys(singleUser).length > 0 && true; 
      if(isError && singleUserObjectHasDataOrNot ){
        console.log(isError)
        console.log(message)
        message.map((err: string, index: number) => {
          console.log(err);
        });
      } else {
        dispatch(register(singleUser));
      }
    }
     else {
      // update user by id
      dispatch(updateUserById(singleUser));
      // ----------------------------------------------------------------------- //
    }

    // {
    //   // check user errors
    //   isError ? (
    //     message.map((err: string, index: number) => {
    //       return (
    //         <TransitionAlerts
    //           key={index}
    //           message={err}
    //           severity={Severity.Error}
    //         />
    //       );
    //     })
    //   ) : (
    //     <TransitionAlerts
    //       message={Strings.userCreated}
    //       severity={Severity.Success}
    //     />
    //   )
    // }
  };

  // -------------------------------------------------------------- //
  if (isLoading) {
    console.log("loading > > > ");
  }
  // -------------------------------------------------------------- //
  // get user data from id passed when register init
  useEffect(() => {
    // ----------------------------------------------------------------------- //
    // git user by id
    if (id != undefined) {
      dispatch(findUserById(Number(id)));
    } else{
      dispatch(reset)
      // console.log(users)
    }
    // ----------------------------------------------------------------------- //
  }, []);
  // ====================================================================================================== //
  return (
    <>


      <CssBaseline />
      <Box
        sx={{
          display: "block",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {Strings.addUser}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={Strings.firstName}
                value={singleUser["firstName"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={Strings.lastName}
                value={singleUser["lastName"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label={Strings.userName}
                name="username"
                value={singleUser["username"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={Strings.email}
                name="email"
                value={singleUser["email"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={Strings.password}
                value={singleUser["password"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.permission}
                </InputLabel>
                <Select
                  name="role"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={singleUser["role"] == Role.Admin ? Role.Admin : Role.User}
                  label={Strings.permission}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <MenuItem value={Role.User}>{Strings.normalUser}</MenuItem>
                  <MenuItem value={Role.Admin}>{Strings.admin}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {/* TODO check check box boolean */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="isActive"
                    // checked={singleUser["isActive"]}
                    value={singleUser["isActive"]}
                    onChange={(e) =>
                      dispatch(
                        handleChangeData({
                          name: e.target.name,
                          value: e.target.checked,
                        })
                      )
                    }
                  />
                }
                label={Strings.activeUser}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {Strings.addUser}
          </Button>
        </Box>
      </Box>
    </>
  );
  // ====================================================================================================== //
}

export default Register;
