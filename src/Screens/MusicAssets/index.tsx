import React from "react";
import Home from "../Home/Home";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BackspaceIcon from "@material-ui/icons/Backspace";
// import { RiDeleteBack2Line } from "react-icons/ri";
import DeleteDialog from "../../components/Reusable/DeleteDialogGeneric";
import {
  deleteAsset,
  getPublicMusicAsset,
  deleteMusicAsset,
} from "../../Redux/Actions/asset";
import { Grid, Button } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import "./style.css";

interface IProps {
  musicAssets: [any];
  publicMusic: any;
  // deleteAsset: (assetId: any) => void;
  deleteMusicAsset: (assetId: any) => void;
  getPublicMusicAsset: () => void;
  // isDeletingAsset: boolean;
}

class MusicAssets extends React.Component<IProps> {
  state = {
    deleteDialog: false,
  };
  componentDidMount() {
    this.props.getPublicMusicAsset();
  }
  handleDelete = (asset: any) => {
    console.log(asset._id);
    this.props.deleteMusicAsset(asset._id);
  };

  render() {
    const { musicAssets, publicMusic } = this.props;
    return (
      <Home>
        <h4 className="assetHeading">Music Assets</h4>
        <Tabs>
          <TabList>
            <Tab>Private Music</Tab>
            <Tab>Public Music</Tab>
          </TabList>

          <TabPanel>
            <Grid container className="wrapperMusicAssets">
              {musicAssets &&
                musicAssets.map((asset: any) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={asset._id}>
                    <BackspaceIcon
                      className="delIcon"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure,you want to delete this music asset?"
                          )
                        ) {
                          this.handleDelete(asset);
                        }
                      }}
                    />
                    <MusicAsset
                      asset={asset}
                      handleDelete={this.handleDelete}
                    />
                  </Grid>
                ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid container className="wrapperMusicAssets">
              {publicMusic &&
                publicMusic.map((asset: any) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={asset._id}>
                    <MusicAsset asset={asset} />
                  </Grid>
                ))}
            </Grid>
          </TabPanel>
        </Tabs>
      </Home>
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
    deleteMusicAsset: (assetId: any) => dispatch(deleteMusicAsset(assetId)),
    deleteAsset: (assetId: any) => dispatch(deleteAsset(assetId)),
    getPublicMusicAsset: () => dispatch(getPublicMusicAsset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicAssets);

const MusicAsset = ({ asset, handleDelete }: any) => {
  // const [open, setOpen] = React.useState(false);
  // const [showDeleteBtn, setDeleteBtn] = React.useState(false);

  // const showDeleteButton = () => {
  //   setDeleteBtn(true);
  // };
  // const hideDeleteButton = () => {
  //   setDeleteBtn(false);
  // };
  // const deleteAction = () => {
  //   deleteAsset(asset._id);
  // };
  // const openDeleteDialog = () => {
  //   setDeleteBtn(false);
  //   setOpen(true);
  // };
  // const closeDeleteDialog = () => {
  //   setOpen(false);
  // };
  return (
    <div className="wrapperAudioLib">
      <h5>{asset.title}</h5>
      <audio src={asset.url} controls style={{ outline: "none" }} />
    </div>
  );
};
