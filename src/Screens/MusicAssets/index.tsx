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
  render() {
    return (
      <Home>
        <h3 className="assetHeading">Music Assets</h3>
        <Grid container style={{ padding: "5px 20px 20px 20px" }}></Grid>
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

// const Asset = ({ asset, deleteAsset, isDeletingAsset }: any) => {
//   const [open, setOpen] = React.useState(false);
//   const [showDeleteBtn, setDeleteBtn] = React.useState(false);

//   const showDeleteButton = () => {
//     setDeleteBtn(true);
//   };
//   const hideDeleteButton = () => {
//     setDeleteBtn(false);
//   };
//   const deleteAction = () => {
//     deleteAsset(asset._id);
//   };
//   const openDeleteDialog = () => {
//     setDeleteBtn(false);
//     setOpen(true);
//   };
//   const closeDeleteDialog = () => {
//     setOpen(false);
//   };
//   return (
//     <div
//       className="wrapperImgLib"
//       onMouseEnter={showDeleteButton}
//       onMouseLeave={hideDeleteButton}
//     >
//       <DeleteDialog
//         open={open}
//         closeDeleteDialog={closeDeleteDialog}
//         actionDelete={deleteAction}
//         isDeleting={isDeletingAsset}
//         textContent="You will not be able to recover this asset once it is deleted"
//       />
//       {asset.type === "logo" ? (
//         <img
//           src={asset.url}
//           crossOrigin="anonymous"
//           className="imgAssetLib"
//           alt="asset"
//         />
//       ) : (
//         <img src={asset.url} className="imgAssetLib" alt="asset" />
//       )}
//       <button
//         onClick={openDeleteDialog}
//         className={showDeleteBtn ? "showDeleteBtn" : "hideDeleteBtn"}
//       >
//         <Tooltip placement="top" title="Delete" arrow>
//           <span>
//             <RiDeleteBack2Line size={"1.5em"} />
//           </span>
//         </Tooltip>
//       </button>
//     </div>
//   );
// };
