import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "ltr",
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