import React from "react";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import ThemeButton from "../ThemeButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import Colors from "../../constants/colors";
import { Grid, Radio } from "@material-ui/core";
import { getMusicAsset, getPublicMusicAsset } from "../../Redux/Actions/asset";
import "react-tabs/style/react-tabs.css";
import "./style.css";

interface IProps {
  getMusicAsset: () => void;
  getPublicMusicAsset: () => void;
  isOpen: boolean;
  toggle: () => void;
  musicAssets: [any];
  publicMusic: any;
  onPick: (image: any) => void;
}

class AssetPicker extends React.Component<IProps> {
  state = {
    assetUrl: "",
    currenSelection: null,
  };
  componentDidMount() {
    this.props.getMusicAsset();
    this.props.getPublicMusicAsset();
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
      this.setState({ assetUrl: "", currenSelection: null });
      this.props.getMusicAsset();
      this.props.getPublicMusicAsset();
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
  selectAsset = (url: any, id: any) => {
    this.setState({ assetUrl: url, currenSelection: id });
    console.log("url", url);
    console.log("id", id);
    toast.info("Asset selected, Click ok to proceed");
  };
  cancelSelection = () => {
    this.setState({ assetUrl: "", currenSelection: null }, () =>
      this.props.toggle()
    );
  };
  render() {
    const { musicAssets, publicMusic } = this.props;
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.toggle}
        scroll="paper"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select Music Asset</DialogTitle>
        <DialogContent>
          <Tabs>
            <TabList>
              <Tab>Private Assets</Tab>
              <Tab>Public Assets</Tab>
            </TabList>

            <TabPanel>
              <Grid container>
                {musicAssets &&
                  musicAssets.map((asset: any, i: any) => (
                    <Grid item md={4} lg={4} sm={6} key={i}>
                      <div className="pickerHeaderMusic">
                        <Radio
                          checked={asset._id === this.state.currenSelection}
                          onChange={() =>
                            this.selectAsset(asset.url, asset._id)
                          }
                          value={asset._id}
                          color="default"
                          size="small"
                        />
                        <h5
                          className={
                            asset._id === this.state.currenSelection
                              ? "selectedMusicHeading"
                              : "musicHeading"
                          }
                        >
                          {asset.title}
                        </h5>
                      </div>
                      <audio
                        src={asset.url}
                        controls
                        style={{ outline: "none" }}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid container>
                {publicMusic &&
                  publicMusic.map((asset: any, i: any) => (
                    <Grid item md={4} lg={4} sm={6} key={i}>
                      <div className="pickerHeaderMusic">
                        <Radio
                          checked={asset._id === this.state.currenSelection}
                          onChange={() =>
                            this.selectAsset(asset.url, asset._id)
                          }
                          value={asset._id}
                          color="default"
                          size="small"
                        />
                        <h5
                          className={
                            i === this.state.currenSelection
                              ? "selectedMusicHeading"
                              : "musicHeading"
                          }
                        >
                          {asset.title}
                        </h5>
                      </div>
                      <audio
                        src={asset.url}
                        controls
                        style={{ outline: "none" }}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabPanel>
          </Tabs>
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
const mapStateToProps = (state: any) => {
  return {
    musicAssets: state.asset.musicAssets,
    publicMusic: state.asset.publicAssets,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getMusicAsset: () => dispatch(getMusicAsset()),
    getPublicMusicAsset: () => dispatch(getPublicMusicAsset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetPicker);
