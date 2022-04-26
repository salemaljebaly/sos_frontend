import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props : any) {

  // ------------------------------------------------------------------------------- //
  // take state from props 
  const { notify, setNotify } = props;

  // ------------------------------------------------------------------------------- //
  // handle close event
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
        ...notify,
        isOpen: false
    })
  };
  // ------------------------------------------------------------------------------- //

  return (
    <Snackbar
        // className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}>
        <Alert
            severity={notify.type}
            onClose={handleClose}>
            {notify.message}
        </Alert>
    </Snackbar>
);

  
}
