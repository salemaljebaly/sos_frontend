import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Strings from "../../utils/Strings";

interface Dialog {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfrim : Function;
}

interface Props {
  confirmDialog: Partial<Dialog>;
  setConfirmDialog : Partial<Dialog>;
}


export default function AlertDialog(props: any) {
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <div>
      <Dialog
        open={confirmDialog.isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmDialog.subTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
          >
            {Strings.no}
          </Button>
          <Button
            onClick={confirmDialog.onConfirm}
            autoFocus
            variant="contained"
            color="error"
          >
            {Strings.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
