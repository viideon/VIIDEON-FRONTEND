import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import ThemeButton from "../ThemeButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { getAssets } from "../../Redux/Actions/asset";
import { getLogoAssets, getThumbnailAssets } from "../../Redux/Selectors";
import Colors from "../../constants/colors";
import "./style.css";
import {Storage} from "aws-amplify";
import {thumbnailDefault} from "../../constants/constants";
import _ from 'lodash';

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
    assetUrl: "",
    currenSelection: null,
    assets: this.props.assets.map((asset: any, i: number) => {
      return (
        <div
          className={`wrapperImgPicker`}
          onClick={() => this.selectAsset(asset.url, i)}
          key={i}
        >
          {this.props.logoAssets ? (
            <img
              alt="asset"
              crossOrigin="anonymous"
              src={thumbnailDefault}
              className="imgAssetPicker"
            />
          ) : (
            <img
              alt="asset"
              src={thumbnailDefault}
              className="imgAssetPicker"
            />
          )}
        </div>
      )
    })
  };
  componentDidMount = async () => {
    this.props.getAssets();
    // this.setState({
    //   assets: this.props.assets.map(async (asset, i) => {
    //     return (
    //       <div
    //         className={`wrapperImgPicker ${
    //             i === this.state.currenSelection ? "selected" : ""
    //         }`}
    //         onClick={() => this.selectAsset(asset.url, i)}
    //         key={i}
    //       >
    //         {this.props.logoAssets ? (
    //           <img
    //             alt="asset"
    //             crossOrigin="anonymous"
    //             src={await Storage.get(asset.url, {level: "private"})}
    //             className="imgAssetPicker"
    //           />
    //         ) : (
    //           <img
    //             alt="asset"
    //             src={await Storage.get(asset.url, {level: "private"})}
    //             className="imgAssetPicker"
    //           />
    //         )}
    //       </div>
    //     )
    //   })
    // })
  }
  componentDidUpdate = async (prevProps: any) => {
    if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
      this.setState({ assetUrl: "", currenSelection: null });
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
  selectAsset = (url: any, i: any) => {
    this.setState({ assetUrl: url, currenSelection: i });
    toast.info("Asset selected, Click ok to proceed");
  };
  cancelSelection = () => {
    this.setState({ assetUrl: "", currenSelection: null }, () =>
      this.props.toggle()
    );
  };

  render() {
    const { assets, logoAssets } = this.props;
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.toggle}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          Select {this.props.logoAssets ? "Logo" : "Thumbnail"}
        </DialogTitle>
        <DialogContent>
          <div className="wrapperAssetPicker">
            {assets &&
              assets.map((asset: any, i) => (
                <div
                  className={`wrapperImgPicker ${
                    i === this.state.currenSelection ? "selected" : ""
                  }`}
                  onClick={() => this.selectAsset(asset.url, i)}
                  key={i}
                >
                  {logoAssets ? (
                    <img
                      alt="asset"
                      crossOrigin="anonymous"
                      src={asset.signedUrl}
                      className="imgAssetPicker"
                    />
                  ) : (
                    <img
                      alt="asset"
                      src={asset.signedUrl}
                      className="imgAssetPicker"
                    />
                  )}
                </div>
              ))}
            {assets && assets.length < 1 && (
              <div className="emptyAssets">
                <h2>
                  No {this.props.logoAssets ? "Logo" : "Thumbnail"} Present
                </h2>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <ThemeButton
            style={{
              width: "120px",
              marginRight: "5px",
              backgroundColor: Colors.darkGrey,
              color: Colors.white,
            }}
            onClick={this.cancelSelection}
            name="Cancel"
          />
          <ThemeButton
            style={{
              width: "120px",
              backgroundColor: Colors.themeBlue,
              color: Colors.white,
            }}
            onClick={this.onPick}
            name="OK"
          />
        </DialogActions>
      </Dialog>
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
    assets: assets,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAssets: () => dispatch(getAssets()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetPicker);
