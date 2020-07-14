import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TextField } from "@material-ui/core";
import "./style.css";

interface IProps {
  open: boolean;
  toggle: () => void;
  logout: any;
}
class LogoutModal extends React.Component<IProps> {
  render() {
    const { open, toggle, logout } = this.props;
    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={this.props.toggle}>Log out</ModalHeader>
        <ModalBody>Are you sure you want to log out?</ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "red", border: "0px" }}
            onClick={logout}
          >
            Log out
          </Button>{" "}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default LogoutModal;
