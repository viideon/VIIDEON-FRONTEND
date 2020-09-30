import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import "./style.css";

interface IProps {
  open: boolean;
  toggle: () => void;
}
class AddContact extends React.Component<IProps> {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.toggle}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <TextField
              label="First Name"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Last Name"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="E-Mail"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Stage"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Mobile Phone"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Phone"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Company"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Title"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Tags"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
            <TextField
              label="Owner"
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              style={textField}
            />
          </div>
          <TextField
            label="Notes"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            multiline
            style={{ width: "100%" }}
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="default"
            onClick={this.props.toggle}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("Save")}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const textField = {
  flexGrow: 1,
  paddingBottom: "15px"
};
export default AddContact;
