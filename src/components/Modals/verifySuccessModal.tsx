import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./style.css";

interface IProps {
  open: boolean;
  toggle: () => void;
}
class VerifySuccessModal extends React.Component<IProps> {
  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Email Verified</ModalHeader>
        <ModalBody>Your Email has been Verified , Please Login</ModalBody>
      </Modal>
    );
  }
}
export default VerifySuccessModal;
