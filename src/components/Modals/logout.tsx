import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
          <Button color="danger" onClick={logout}>
            Log out
          </Button>
          <Button onClick={toggle} color="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default LogoutModal;
