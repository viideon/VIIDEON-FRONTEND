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
import { getMusicAsset } from "../../Redux/Actions/asset";
import "react-tabs/style/react-tabs.css";
import "./style.css";

interface IProps {
  getMusicAsset: () => void;
  isOpen: boolean;
  toggle: () => void;
  musicAssets: [any];
  onPick: (image: any) => void;
}

class AssetPicker extends React.Component<IProps> {
  state = {
    assetUrl: "",
    currenSelection: null,
  };
  componentDidMount() {
    this.props.getMusicAsset();
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
      this.setState({ assetUrl: "", currenSelection: null });
      this.props.getMusicAsset();
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
    const { musicAssets } = this.props;
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
                  musicAssets.map((asset: any, i) => (
                    <Grid item md={4} lg={4} sm={6} key={i}>
                      <div className="pickerHeaderMusic">
                        <Radio
                          checked={i === this.state.currenSelection}
                          onChange={() => this.selectAsset(asset.url, i)}
                          value={i}
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
            <TabPanel>
              <h2>Any content 2 helo</h2>
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
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getMusicAsset: () => dispatch(getMusicAsset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetPicker);
