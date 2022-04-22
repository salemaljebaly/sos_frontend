import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Helper } from "../utils/Helper";

export enum Severity {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

// alert props
interface Props {
  message: String;
  severity: Severity;
}

export default function TransitionAlerts(props: Props) {
  //
  const { message, severity } = props;
  const [open, setOpen] = React.useState(true);

  const sleep = async () => {
    await new Promise((r) => setTimeout(r, 4000));
    setOpen(false);
  };
  // sleep();
  // React.useEffect(() => {
  //   sleep();
  // }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
