import React from "react";
import Home from "../Home/Home";
import { connect } from "react-redux";
import DeleteDialog from "../../components/Reusable/DeleteDialogGeneric";
import { deleteAsset } from "../../Redux/Actions/asset";
import { Grid } from "@material-ui/core";
import "./style.css";

interface IProps {
  assets: [any];
  deleteAsset: (assetId: any) => void;
  isDeletingAsset: boolean;
}
class AssetsLibray extends React.Component<IProps> {
  render() {
    const { assets } = this.props;
    return (
      <Home>
        <h3 className="assetHeading">Your Assets</h3>
        <Grid container style={{ padding: "5px 20px 20px 20px" }}>
          {assets &&
            assets.map((asset: any) => (
              <Grid item xs={12} sm={12} md={3} lg={3} key={asset._id}>
                <Asset
                  asset={asset}
                  deleteAsset={this.props.deleteAsset}
                  isDeletingAsset={this.props.isDeletingAsset}
                />
              </Grid>
            ))}
        </Grid>
      </Home>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    assets: state.asset.assets,
    isDeletingAsset: state.asset.isDeletingAsset
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteAsset: (assetId: any) => dispatch(deleteAsset(assetId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetsLibray);

const Asset = ({ asset, deleteAsset, isDeletingAsset }: any) => {
  const [open, setOpen] = React.useState(false);
  const deleteAction = (id: any) => {
    deleteAsset(id);
  };
  const openDeleteDialog = () => {
    setOpen(true);
  };
  const closeDeleteDialog = () => {
    setOpen(false);
  };
  return (
    <div className="wrapperImgLib">
      <DeleteDialog
        open={open}
        closeDeleteDialog={closeDeleteDialog}
        actionDelete={deleteAction}
        isDeleting={isDeletingAsset}
        id={asset.id}
        textContent="You will not be able to recover this asset once it is deleted"
      />
      <img
        src={asset.url}
        crossOrigin="anonymous"
        className="imgAssetLib"
        alt="asset"
      />
      <button
        style={{ position: "absolute", top: "0px", right: "0px" }}
        onClick={openDeleteDialog}
      >
        Delete
      </button>
    </div>
  );
};
