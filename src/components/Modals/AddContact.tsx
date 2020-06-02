import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TextField } from "@material-ui/core";
import "./style.css";

interface IProps {
  open: boolean;
  toggle: () => void;
}
class AddContact extends React.Component<IProps> {
  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Add Contact</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>
            Close
          </Button>
          <Button color="primary" onClick={() => alert("Save")}>
            Save
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}
const textField = {
  flexGrow: 1,
  paddingBottom: "15px"
};
export default AddContact;
