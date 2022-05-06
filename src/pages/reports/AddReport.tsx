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
} from "../../features/reports/reportSlice";
import Strings from "../../utils/Strings";
import { MapRounded } from "@mui/icons-material";
import MyComponent from "../../components/Map";
import Map from "../../components/Map";
import { ReportState, ReportStateArabic, ReportType, ReportTypeArabic } from "../../utils/enum/reporttype";

function AddReport() {
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
  const { singleReport, isError, isSucces, isLoading, message, processDone } =
    useSelector((state: any) => state.report);
  // ----------------------------------------------------------------------------------- //
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined) {
      const singleUserObjectHasDataOrNot: boolean =
        Object.keys(singleReport).length > 0 && true;

      dispatch(add(singleReport));
    } else {
      // update user by id
      dispatch(updateById(singleReport));
      // ----------------------------------------------------------------------- //
    }
  };
  // ----------------------------------------------------------------------------------- //

  // -------------------------------------------------------------- //
  // get user data from id passed when register init
  useEffect(() => {
    if(processDone){
      navigate('/reports')
    }
    // ----------------------------------------------------------------------- //
    // git user by id
    if (id != undefined) {
      dispatch(findById(Number(id)));

    }
    // ----------------------------------------------------------------------- //
  }, [dispatch, processDone]);
  // -------------------------------------------------------------- //
  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <>
      {isError ? (
        <Alert severity="error">
          {Array.isArray(message) ? message[0] : message}
        </Alert>
      ) : null}

      <CssBaseline />
      <Box
        sx={{
          display: "block",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {id != undefined
            ? Strings.edit + Strings.report
            : Strings.add + Strings.report}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="desc"
                label={Strings.reportDesc}
                value={singleReport["desc"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="desc"
                disabled
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} sx={{padding: 1}}>
              <TextField
                autoComplete="given-name"
                name="reporter.firstName"
                required
                fullWidth
                id="reporter.firstName"
                label={Strings.fullName}
                value={singleReport["reporter"]['firstName'] + singleReport["reporter"]['lastName']}
                disabled
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
            </Grid> */}
            {/* TODO get name from object  */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="reporter[phone]"
                label={Strings.phone}
                value={singleReport["reporter"]["phone"]}
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
                disabled
              />
            </Grid>  */}

            
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.permission}
                </InputLabel>
                <Select
                  name="type"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    singleReport['type']
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
                <MenuItem value={ReportType.FIRE}>{ReportTypeArabic.FIRE}</MenuItem>
                  <MenuItem value={ReportType.AMBULANCE}>{ReportTypeArabic.AMBULANCE}</MenuItem>
                  <MenuItem value={ReportType.ACCIDANT}>{ReportTypeArabic.ACCIDANT}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.permission}
                </InputLabel>
                <Select
                  name="state"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    singleReport['state']
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
                <MenuItem value={ReportState.PENDING}>{ReportStateArabic.PENDING}</MenuItem>
                  <MenuItem value={ReportState.PROCESSING}>{ReportStateArabic.PROCESSING}</MenuItem>
                  <MenuItem value={ReportState.DONE}>{ReportStateArabic.DONE}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            {/* Map component */}
            <Map
              currentLat={Number.isNaN(Number.parseFloat(singleReport["latitude"])) ?  Strings.initMap.lat : Number.parseFloat(singleReport["latitude"])}
              currentLng={Number.isNaN(Number.parseFloat(singleReport["longitude"])) ? Strings.initMap.lng : Number.parseFloat(singleReport["longitude"])}
              currentZoom={6}
              currentKey={(Math.random() * 100).toString()}
              onDragPin={(e : any) => {
                // set latitude
                dispatch(
                  handleChangeData({
                    name: "latitude",
                    value: e.lat().toString(),
                  })
                )
                // set longitude
                dispatch(
                  handleChangeData({
                    name: "longitude",
                    value: e.lng().toString(),
                  })
                )
              }}
            />
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}

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

export default AddReport;
