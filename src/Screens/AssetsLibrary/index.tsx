import React from "react";
import Home from "../Home/Home";
import { connect } from "react-redux";
import { RiDeleteBack2Line } from "react-icons/ri";
import DeleteDialog from "../../components/Reusable/DeleteDialogGeneric";
import { deleteAsset } from "../../Redux/Actions/asset";
import { Grid, Tooltip } from "@material-ui/core";
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
        <h4 className="assetHeading">Your Assets</h4>
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
    isDeletingAsset: state.asset.isDeletingAsset,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteAsset: (assetId: any) => dispatch(deleteAsset(assetId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetsLibray);

const Asset = ({ asset, deleteAsset, isDeletingAsset }: any) => {
  const [open, setOpen] = React.useState(false);
  const [showDeleteBtn, setDeleteBtn] = React.useState(false);

  const showDeleteButton = () => {
    setDeleteBtn(true);
  };
  const hideDeleteButton = () => {
    setDeleteBtn(false);
  };
  const deleteAction = () => {
    console.log(asset._id);
    deleteAsset(asset._id);
  };
  const openDeleteDialog = () => {
    setDeleteBtn(false);
    setOpen(true);
  };
  const closeDeleteDialog = () => {
    setOpen(false);
  };
  return (
    <div
      className="wrapperImgLib"
      onMouseEnter={showDeleteButton}
      onMouseLeave={hideDeleteButton}
    >
      <DeleteDialog
        open={open}
        closeDeleteDialog={closeDeleteDialog}
        actionDelete={deleteAction}
        isDeleting={isDeletingAsset}
        textContent="You will not be able to recover this asset once it is deleted"
      />
      {asset.type === "logo" ? (
        <img
          src={asset.url}
          crossOrigin="anonymous"
          className="imgAssetLib"
          alt="asset"
        />
      ) : (
        <img src={asset.url} className="imgAssetLib" alt="asset" />
      )}
      <button
        onClick={openDeleteDialog}
        className={showDeleteBtn ? "showDeleteBtn" : "hideDeleteBtn"}
      >
        <Tooltip placement="top" title="Delete" arrow>
          <span>
            <RiDeleteBack2Line size={"1.5em"} />
          </span>
        </Tooltip>
      </button>
    </div>
  );
};
