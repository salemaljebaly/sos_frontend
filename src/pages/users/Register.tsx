import {
  Alert,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../components/common/Notification";
import {
  reset,
  handleChangeData,
  register,
  findUserById,
  updateUserById,
} from "../../features/users/userSlice";
import { Role } from "../../utils/enum/role.enum";
import Strings from "../../utils/Strings";

function Register() {
  // ------------------------------------------------------------------------------- //
  // take state from props
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // ----------------------------------------------------------------------------------- //
  // get param from user url
  const { id } = useParams();
  // ----------------------------------------------------------------------------------- //
  // dispatch to get and executer function from slices
  const dispatch = useDispatch();
  // ----------------------------------------------------------------------------------- //
  // use to navigate to another components
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------- //
  // desctruct memebers from user state [ userSlice]
  const { singleUser, isError, isSucces, isLoading, message , processDone} = useSelector(
    (state: any) => state.users
  );
  // ----------------------------------------------------------------------------------- //
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined) {
      const singleUserObjectHasDataOrNot: boolean =
        Object.keys(singleUser).length > 0 && true;

      dispatch(register(singleUser));
    } else {
      // update user by id
      dispatch(updateUserById(singleUser));
      // ----------------------------------------------------------------------- //
    }
    dispatch(reset)
  };
  // ----------------------------------------------------------------------------------- //

  // -------------------------------------------------------------- //
  useEffect(() => {
    if(processDone){
      navigate('/users')
    }
    // ----------------------------------------------------------------------- //
    // git user by id
    if (id != undefined) {
      dispatch(findUserById(Number(id)));
    }
    // ----------------------------------------------------------------------- //
  }, [dispatch, processDone]);
  // ====================================================================================================== //

  // -------------------------------------------------------------- //
  if (isLoading) {
    return (
      <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    )
  }
  return (
    <>
      
      {isError && message != '' ? <Alert severity="error" >{Array.isArray(message) ?  message[0] : message}</Alert> : null}
      

      <CssBaseline />
      <Box
        sx={{
          display: "block",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
            {id != undefined ? Strings.edit + Strings.user : Strings.add + Strings.user }
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
                  value={
                    singleUser["role"] == Role.Admin ? Role.Admin : Role.User
                  }
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
                    checked={singleUser["isActive"]}
                    // value={singleUser["isActive"]}
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
            {id != undefined ? Strings.edit : Strings.add}
          </Button>
        </Box>
      </Box>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
  // ====================================================================================================== //
}

export default Register;
