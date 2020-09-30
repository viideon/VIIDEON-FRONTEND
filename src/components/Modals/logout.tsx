import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  DialogActions,
  Button
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Colors from "../../constants/colors";
import "./style.css"

interface IProps {
  open: boolean;
  toggle: () => void;
  logout: any;
}
class LogoutModal extends React.Component<IProps> {
  render() {
    const { open, toggle, logout } = this.props;
    return (
      <Dialog open={open} onClose={toggle} maxWidth="sm" fullWidth >
        <DialogTitle>  <div className="headerStyle">
          <h4 style={{ color: "#000" }}>Logout</h4>
          <IconButton onClick={toggle}>
            <Close />
          </IconButton>
        </div></DialogTitle>
        <DialogContent>
          <Typography variant="h6">Are you sure you want to logout ?</Typography>
        </DialogContent>

        <DialogActions> <Button onClick={logout} variant="contained" style={{ backgroundColor: Colors.red, color: Colors.white }}>
          Log out
          </Button>
          <Button onClick={toggle} variant="contained" style={{ backgroundColor: Colors.darkGrey, color: Colors.white }} >
            Cancel
           </Button></DialogActions>

      </Dialog>
    );
  }
}

export default LogoutModal;
