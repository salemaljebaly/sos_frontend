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
import { login, register, getAllUser, reset, deleteUserById, updateUserById } from "../../features/users/userSlice";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";

function Register() {
  
  const {id} = useParams();

  console.log("get param register" + id);
  // -------------------------------------------------------------- //
  // handle check box state
  const [activiateChecked, setChecked] = React.useState(true);

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // -------------------------------------------------------------- //
  // handle role state
  const [userRole, setRole] = React.useState(Role.User.toString());
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  // -------------------------------------------------------------- //
  // handle formData
  const [formData, setFormData] = useState({
    //TODO register user field
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    isActive: activiateChecked,
    role: userRole,
  });
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFormData({
      firstName: data.get("firstName")!.toString(),
      lastName: data.get("lastName")!.toString(),
      username: data.get("username")!.toString(),
      email: data.get("email")!.toString(),
      password: data.get("password")!.toString(),
      isActive: activiateChecked,
      role: userRole,
    });
    
    // register user done need to fix ui
    // dispatch(register(formData));
    // dispatch(reset);

    // login user done need to fix ui
    // dispatch(login({
    //   username: 'string', 
    //   password: 'string'
    // }))

    // get all user done need to fix ui
    // TODO fix store data after refreshing
    // dispatch(getAllUser())

    // dispatch(deleteUserById(26))

    // dispatch(updateUserById({
    //   id:27,
    //   email: "5555@salem.com"
    // }))
    
    // dispatch(reset);
  };
  // -------------------------------------------------------------- //
  const dispatch = useDispatch();
  const { auth, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    // if (isError) {
    //   console.log(message)
    // }

    console.log("params : " + id);
    if (isSucces || auth) {
      // TODO navigate
    }

    dispatch(reset);
  }, [auth, isError, isSucces, isLoading, message]);

  if (isLoading) {
    console.log("loading > > > ");
  }
  // get value on every change in inputs
  const onChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // -------------------------------------------------------------- //

  return (
    <>
      {/* {
        isError ?
          message.map((err: string, index : number) => {
            return <TransitionAlerts key={index} message={err} severity={Severity.Error} />
          })
          : <TransitionAlerts  message={Strings.userCreated} severity={Severity.Success} />
      } */}

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
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={Strings.lastName}
                name="lastName"
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={Strings.password}
                type="password"
                id="password"
                onChange={onChange}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.permission}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userRole}
                  label={Strings.permission}
                  onChange={handleRoleChange}
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
                    checked={activiateChecked}
                    onChange={handleActiveChange}
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
}

export default Register;
