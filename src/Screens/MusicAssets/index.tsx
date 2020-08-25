import React from "react";
import Home from "../Home/Home";
import { connect } from "react-redux";
// import { RiDeleteBack2Line } from "react-icons/ri";
// import DeleteDialog from "../../components/Reusable/DeleteDialogGeneric";
// import { deleteAsset } from "../../Redux/Actions/asset";
import { Grid } from "@material-ui/core";
import "./style.css";

interface IProps {
  musicAssets: [any];
  // deleteAsset: (assetId: any) => void;
  // isDeletingAsset: boolean;
}

class MusicAssets extends React.Component<IProps> {
  state = {
    dummyMusic: [
      "https://videonpro.s3-us-west-1.amazonaws.com/assets/musicasset1.mp3",
      "https://videonpro.s3-us-west-1.amazonaws.com/assets/musicasset2.mp3"
    ]
  };
  render() {
    const { musicAssets } = this.props;
    console.log("music assets", musicAssets);
    return (
      <Home>
        <h3 className="assetHeading">Music Assets</h3>
        <Grid container style={{ padding: "20px" }}>
          {musicAssets.map((asset: any) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={asset._id}>
              <MusicAsset asset={asset} />
            </Grid>
          ))}
        </Grid>
      </Home>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    musicAssets: state.asset.musicAssets,
  };
};
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     deleteAsset: (assetId: any) => dispatch(deleteAsset(assetId))
//   };
// };
export default connect(mapStateToProps)(MusicAssets);

const MusicAsset = ({ asset }: any) => {
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
      <audio src={asset.url} controls />
    </div>
  );
};
