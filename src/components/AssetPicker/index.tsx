import React from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { getAssets } from "../../Redux/Actions/asset";
import { getLogoAssets, getThumbnailAssets } from "../../Redux/Selectors";
import "./style.css";

interface IProps {
  getAssets: () => void;
  isOpen: boolean;
  toggle: () => void;
  assets: [any];
  onPick: (image: any) => void;
  logoAssets: boolean;
}

class AssetPicker extends React.Component<IProps> {
  componentDidMount() {
    this.props.getAssets();
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
      this.props.getAssets();
    }
  }
  onPick = (asset: any) => {
    this.props.onPick(asset);
  };
  render() {
    const { assets } = this.props;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>Select a Logo</ModalHeader>
        <ModalBody>
          <div className="wrapperAssetPicker">
            {assets &&
              assets.map((asset: any, i) => (
                <div
                  className="wrapperImgPicker"
                  onClick={() => this.onPick(asset.url)}
                  key={i}
                >
                  <img
                    ref="image"
                    crossOrigin="anonymous"
                    src={asset.url}
                    className="imgAssetPicker"
                  />
                </div>
              ))}
          </div>
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
const mapStateToProps = (state: any, ownProps: any) => {
  let assets = [];
  if (ownProps.logoAssets) {
    assets = getLogoAssets(state);
  } else {
    assets = getThumbnailAssets(state);
  }
  return {
    assets: assets
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAssets: () => dispatch(getAssets())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetPicker);
