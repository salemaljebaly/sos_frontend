import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
  InfoWindow,
  InfoBox,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteById,
  getAll,
  reset,
  resetSingle,
} from "../features/reports/reportSlice";
import { ReportsModel } from "../features/reports/reportsModel";
import { ReportType } from "../utils/enum/reporttype";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { clearInterval, setInterval } from "timers";
const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "6px",
};
// --------------------------------------------------------------------------------------------- /
// params of  to center map
const center = {
  lat: 30.257677059243303,
  lng: 15.16091104212196,
};

const paths = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 },
];

const options = {
  fillColor: "red",
  fillOpacity: 0.5,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};
// --------------------------------------------------------------------------------------------- /
interface Props {
  currentLat: number;
  currentLng: number;
  onDragPin: Function;
  currentZoom: number;
  currentKey: string;
}
function DashBoardMap() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Reports, isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.report
  );

  const [InfoWindowMarkerId, setInfoWindowMarkerId] = React.useState({
    openInfoWindowMarkerId: "",
  });
  const handleToggleOpen = (markerId: string) => {
    setInfoWindowMarkerId({
      openInfoWindowMarkerId: markerId,
    });
  };

  useEffect(() => {
    dispatch(getAll());
    // const interval = setInterval(() => {
    //   console.log('change data')
    //   dispatch(getAll());
    // }, 5000);

    // return () => clearInterval(interval)
  }, [dispatch]);
  // --------------------------------------------------------------------------------------------- /
  // check if map is loaded or not
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBQsISGizyptRcOYIsgn6Dd3_4_lxgbGBY",
  });
  // --------------------------------------------------------------------------------------------- //
  const [map, setMap] = React.useState(null);

  // set center param to map when loaded
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onLoadInfoWindow = (infoWindow: any) => {
    console.log("infoWindow: ", infoWindow);
  };
  // --------------------------------------------------------------------------------------------- //
  // when map not needs set unmount
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  // --------------------------------------------------------------------------------------------- //
  // if is loaded retrun map else retrun any other component
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{
          zoom: 6,
          zoomControl: true,
          // mapTypeId : google.maps.MapTypeId.SATELLITE
        }}
        onLoad={onLoad}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {Reports.map((report: ReportsModel) => {
          console.log(report.latitude + "," + report.longitude);
          const markerID = (Math.random() * 100)
          .toString()
          .concat("_".concat(report.id!.toString()));
          return (
            <div key={markerID}>
              <Marker
                icon={`/images/icons/${report.type}.png`}
                position={{
                  lat: Number.parseFloat(report.latitude),
                  lng: Number.parseFloat(report.longitude),
                }}
                onClick={() => {
                  navigate(`/report/${report.id}`)
                }}
              >
                {/* <InfoBox key={markerID} >
                  <div
                    style={{
                      backgroundColor: "yellow",
                      opacity: 0.75,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 16 }}>{report.desc}</div>
                  </div>
                </InfoBox> */}
              </Marker>
            </div>
          );
        })}

        {/* TODO add polygon */}
        {/* <Polygon
      paths={paths}
      options={options}
    /> */}
      </GoogleMap>
    </>
  ) : (
    <>
      <div>map not loaded </div>
    </>
  );
}

export default DashBoardMap;
