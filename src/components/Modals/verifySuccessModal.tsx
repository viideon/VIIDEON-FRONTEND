import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import "./style.css";

interface IProps {
  open: boolean;
  toggle: () => void;
}
class VerifySuccessModal extends React.Component<IProps> {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.toggle} maxWidth="sm" fullWidth>
        <DialogTitle >Email Verified</DialogTitle>
        <DialogContent><Typography variant="h6">Your Email has been Verified, Please Login</Typography></DialogContent>
      </Dialog>
    );
  }
}
export default VerifySuccessModal;
