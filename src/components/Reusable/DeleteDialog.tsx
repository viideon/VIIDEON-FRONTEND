import React from "react";
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@material-ui/core"

interface IProps {
  deleteVideo: (id?: string) => void;
  open: boolean;
  closeDeleteDialog: () => void;
  deletingVideo: boolean;
  id?: string;
}
const DeleteDialog: React.FC<IProps> = ({
  deleteVideo,
  open,
  closeDeleteDialog,
  deletingVideo,
  id
}) => {
  return (
    <Dialog
      open={open}
      onClose={closeDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableScrollLock={true}
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You will not be able to recover this video once it is deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!deletingVideo && (
          <Button onClick={closeDeleteDialog} color="default">
            Cancel
          </Button>
        )}

        {deletingVideo ? (
          <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <CircularProgress size={30} />
          </span>
        ) : (
            <Button onClick={() => deleteVideo(id)} color="primary">
              Yes,Delete
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
