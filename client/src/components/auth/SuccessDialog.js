import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function SuccessDialog({ open, signupResponse, onClose }) {
  const handleClose = () => {
    onClose(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{signupResponse}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessDialog;
