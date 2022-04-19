import { Link, Typography } from "@mui/material";
import Strings from "../utils/Strings";

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {`${Strings.allRightsReserved}  © `}
        {/* <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '} */}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }