import React, { FC, useState } from "react";
import { connect } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { toast } from "react-toastify";
import VideoInfo from "../VideoInfo";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteDialog from "../Reusable/DeleteDialog";
import { thumbnailDefault } from "../../constants/constants";
import moment from "moment";
import "./styles.css";

type IProps = {
  title: string;
  url?: string;
  onClick?: any;
  thumbnail?: string;
  id: string;
  deleteVideo: (id: string) => void;
  date: any;
  deletingVideo: boolean;
};
const VideoCard: FC<IProps> = ({
  title,
  thumbnail,
  onClick,
  deleteVideo,
  id,
  date,
  deletingVideo
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const calculateDays = () => {
    let currentTime = moment(moment().toDate());
    let videoAddedTime = moment(date).format("YYYY-MM-DD HH:mm");
    return currentTime.diff(videoAddedTime, "day");
  };

  const openDeleteDialog = () => {
    handleClose();
    setOpen(true);
  };
  const closeDeleteDialog = () => {
    setOpen(false);
  };
  const deleteAction = () => {
    deleteVideo(id);
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(
      `https://vidionpro.000webhostapp.com/watch/${id}`
    );
    toast.info("Url copied to clipboard");
  };
  return (
    <div className="wrapperVideoCard">
      <div className="videoPreview" onClick={onClick}>
        <img
          style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
          src={thumbnail ? thumbnail : thumbnailDefault}
          alt="preview"
        />
      </div>
      <div className="row" id="rowCardTitle">
        <div className="col-10">
          <h5 className="titleVideo">{title}</h5>
        </div>
        <div className="col-2">
          <span className="vertIcon" onClick={handleClick}>
            <MoreVertIcon />
          </span>
          <Menu
            disableScrollLock={true}
            id="menuVideoCard"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onClick}>View</MenuItem>
            <MenuItem onClick={onClick}>Edit</MenuItem>
            <MenuItem onClick={copyUrl}>Copy url</MenuItem>
            <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
          </Menu>
          <DeleteDialog
            open={open}
            deletingVideo={deletingVideo}
            deleteVideo={deleteAction}
            closeDeleteDialog={closeDeleteDialog}
          />
        </div>
      </div>
      <div className="row" id="rowCardInfo">
        <div className="col-xs-12">
          <VideoInfo />
          <span className="addedVideoInfo">
            added {calculateDays()} days ago
          </span>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    deletingVideo: state.video.deletingVideo
  };
};
export default connect(mapStateToProps)(VideoCard);
