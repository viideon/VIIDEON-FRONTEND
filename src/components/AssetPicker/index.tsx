import React from "react";
import { toast } from "react-toastify";
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
  state = {
    assetUrl: ""
  };
  componentDidMount() {
    this.props.getAssets();
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
      this.props.getAssets();
    }
  }
  onPick = () => {
    if (this.state.assetUrl === "") {
      toast.info("No asset selected");
      this.props.toggle();
      return;
    }
    this.props.onPick(this.state.assetUrl);
    this.props.toggle();
  };
  selectAsset = (url: any) => {
    this.setState({ assetUrl: url });
    toast.info("Asset selected, Click ok to proceed");
  };
  cancelSelection = () => {
    this.setState({ assetUrl: "" }, () => this.props.toggle());
  };
  render() {
    const { assets } = this.props;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>
          Select {this.props.logoAssets ? "Logo" : "Thumbnail"}
        </ModalHeader>
        <ModalBody>
          <div className="wrapperAssetPicker">
            {assets &&
              assets.map((asset: any, i) => (
                <div
                  className="wrapperImgPicker"
                  onClick={() => this.selectAsset(asset.url)}
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
            color="secondary"
            size="md"
            style={{ width: "120px", marginRight: "5px" }}
            onClick={this.cancelSelection}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            size="md"
            style={{ width: "120px" }}
            onClick={this.onPick}
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
