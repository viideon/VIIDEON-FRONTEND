import React from "react";
import "react-image-picker/dist/index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import "./style.css";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  assets: [any];
  onPick: (image: any) => void;
}

class AssetPicker extends React.Component<IProps> {
  render() {
    const { assets } = this.props;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>Select a Logo</ModalHeader>
        <ModalBody>
          <ImagePicker
            images={assets.map((asset, i) => ({ src: asset.url, value: i }))}
            onPick={this.props.onPick}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            size="md"
            style={{ width: "120px" }}
            onClick={this.props.toggle}
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    assets: state.asset.assets
  };
};
export default connect(mapStateToProps)(AssetPicker);
