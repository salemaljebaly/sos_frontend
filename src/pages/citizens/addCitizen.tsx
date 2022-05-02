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
    handleChangeData,
    add,
    findById,
    updateById,
  } from "../../features/citizens/citizensSlice";
  import { Role } from "../../utils/enum/role.enum";
  import Strings from "../../utils/Strings";
  
  function AddCitizen() {
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
    const { singleCitizen, isError, isSucces, isLoading, message, processDone } = useSelector(
      (state: any) => state.citizen
    );
    // ----------------------------------------------------------------------------------- //
    // handle submit form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (id === undefined) {
        const singleUserObjectHasDataOrNot: boolean =
          Object.keys(singleCitizen).length > 0 && true;
  
        dispatch(add(singleCitizen));
      } else {
        // update user by id
        dispatch(updateById(singleCitizen));
        // ----------------------------------------------------------------------- //
      }
    };
    // ----------------------------------------------------------------------------------- //
  
    // -------------------------------------------------------------- //
    // get user data from id passed when register init
    useEffect(() => {
      if(processDone){
        navigate('/citizens')
      }
      // ----------------------------------------------------------------------- //
      // git user by id
      if (id != undefined) {
        dispatch(findById(Number(id)));
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
        
        {isError ? <Alert severity="error" >{Array.isArray(message) ?  message[0] : message}</Alert> : null}
        
  
        <CssBaseline />
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {id != undefined ? Strings.edit + Strings.citizen : Strings.add + Strings.citizen }
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
                  value={singleCitizen["firstName"]}
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
                  value={singleCitizen["lastName"]}
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label={Strings.city}
                  value={singleCitizen["city"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label={Strings.phone}
                  value={singleCitizen["phone"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  name="phone"
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
                  value={singleCitizen["username"]}
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
                  value={singleCitizen["email"]}
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
                  value={singleCitizen["password"]}
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
                {/* TODO check check box boolean */}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isActive"
                      checked={singleCitizen["isActive"]}
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
  
  export default AddCitizen;
  