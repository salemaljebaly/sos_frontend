import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Direction } from "@mui/material/";
import Strings from "../utils/Strings";

const theme = createTheme({
  direction: "rtl",
  typography:{
    fontFamily :[
      'Almarai', "sans-serif"
    ].join(','),
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;