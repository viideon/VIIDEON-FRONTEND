import React from "react";
import Home from "../Home/Home";
// import { connect } from "react-redux";
// import { RiDeleteBack2Line } from "react-icons/ri";
// import DeleteDialog from "../../components/Reusable/DeleteDialogGeneric";
// import { deleteAsset } from "../../Redux/Actions/asset";
import { Grid, Tooltip } from "@material-ui/core";
import "./style.css";

interface IProps {
  assets: [any];
  deleteAsset: (assetId: any) => void;
  isDeletingAsset: boolean;
}

class MusicAssets extends React.Component<IProps> {
  state = {
    dummyMusic: [
      "https://videonpro.s3-us-west-1.amazonaws.com/assets/musicasset1.mp3",
      "https://videonpro.s3-us-west-1.amazonaws.com/assets/musicasset2.mp3"
    ]
  };
  render() {
    return (
      <Home>
        <h3 className="assetHeading">Music Assets</h3>
        <Grid container style={{ padding: "5px 20px 20px 20px" }}>
          {this.state.dummyMusic.map((audioUrl: string, index: number) => (
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
              <MusicAsset audioUrl={audioUrl} />
            </Grid>
          ))}
        </Grid>
      </Home>
    );
  }
}
// const mapStateToProps = (state: any) => {
//   return {
//     assets: state.asset.assets,
//     isDeletingAsset: state.asset.isDeletingAsset
//   };
// };
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     deleteAsset: (assetId: any) => dispatch(deleteAsset(assetId))
//   };
// };
export default MusicAssets;

const MusicAsset = ({ audioUrl }: any) => {
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
      <audio src={audioUrl} controls />
    </div>
  );
};
