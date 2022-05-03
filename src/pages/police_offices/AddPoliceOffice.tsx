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
} from "../../features/police_officess/policeOfficesSlice";
import Strings from "../../utils/Strings";
import { MapRounded } from "@mui/icons-material";
import MyComponent from "../../components/Map";
import Map from "../../components/Map";

const defaultMapProps = {
  center: {
    lat: 32.36447150118714,
    lng: 15.16091104212196,
  },
  zoom: 11,
};
function AddPoliceOffice() {
  const [mapPosition, setMapPosition] = React.useState({ lat: 0, lng: 0 });
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
  const { singleOffice, isError, isSucces, isLoading, message, processDone } =
    useSelector((state: any) => state.policeOffices);
  // ----------------------------------------------------------------------------------- //
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined) {
      const singleUserObjectHasDataOrNot: boolean =
        Object.keys(singleOffice).length > 0 && true;

      dispatch(add(singleOffice));
    } else {
      // update user by id
      dispatch(updateById(singleOffice));
      // ----------------------------------------------------------------------- //
    }
  };
  // ----------------------------------------------------------------------------------- //

  // -------------------------------------------------------------- //
  // get user data from id passed when register init
  useEffect(() => {
    if (processDone) {
      navigate("/police-offices");
    }
    // ----------------------------------------------------------------------- //
    // git user by id
    if (id != undefined) {
      dispatch(findById(Number(id)));
      console.log(singleOffice["office_name"]);
      console.log(singleOffice["latitude"] + "," + singleOffice["longitude"]);
      setMapPosition({
        lat: Number.parseFloat(singleOffice["latitude"]),
        lng: Number.parseFloat(singleOffice["longitude"]),
      });
    } else {
      setMapPosition({
        lat: 32.36447150118714,
        lng: 15.16091104212196,
      });
    }
    // ----------------------------------------------------------------------- //
  }, [dispatch, processDone]);
  // ====================================================================================================== //

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
            ? Strings.edit + Strings.police_office
            : Strings.add + Strings.police_office}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{padding: 1}}>
              <TextField
                autoComplete="given-name"
                name="office_name"
                required
                fullWidth
                id="office_name"
                label={Strings.office_name}
                value={singleOffice["office_name"]}
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
                id="office_city"
                label={Strings.city}
                value={singleOffice["office_city"]}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="office_city"
                autoComplete="family-name"
              />
            </Grid>

            <Map
              currentLat={Number.isNaN(Number.parseFloat(singleOffice["latitude"])) ? mapPosition.lat : Number.parseFloat(singleOffice["latitude"])}
              currentLng={Number.isNaN(Number.parseFloat(singleOffice["longitude"])) ? mapPosition.lng : Number.parseFloat(singleOffice["longitude"])}
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

export default AddPoliceOffice;
