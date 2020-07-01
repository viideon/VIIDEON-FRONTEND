import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IProps {
  actionDelete: (id?: string) => void;
  open: boolean;
  closeDeleteDialog: () => void;
  isDeleting: boolean;
  id?: string;
  textContent: string;
}
const DeleteDialog: React.FC<IProps> = ({
  actionDelete,
  open,
  closeDeleteDialog,
  isDeleting,
  textContent,
  id
}) => {
  return (
    <Dialog
      open={open}
      onClose={closeDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>{textContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!isDeleting && (
          <Button onClick={closeDeleteDialog} color="default">
            Cancel
          </Button>
        )}

        {isDeleting ? (
          <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <CircularProgress size={30} />
          </span>
        ) : (
          <Button onClick={() => actionDelete(id)} color="primary">
            Yes,Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
