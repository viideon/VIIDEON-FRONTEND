import React, { FC, useState } from "react";
import { connect } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid, Menu, MenuItem } from "@material-ui/core";
import { toast, Flip } from "react-toastify";
import VideoInfo from "../VideoInfo";
import DeleteDialog from "../Reusable/DeleteDialog";
import { thumbnailDefault } from "../../constants/constants";
import moment from "moment";
import "./styles.css";
interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  views?: number;
  watch?: number;
  emailShareCount?: number;
  isChatvid?: boolean;
}
type IProps = {
  title: string;
  url?: string;
  onClick?: any;
  thumbnail?: string;
  id: string;
  deleteVideo: (id: string) => void;
  date: any;
  deletingVideo: boolean;
  video?: Video;
};
const VideoCard: FC<IProps> = ({
  title,
  thumbnail,
  onClick,
  deleteVideo,
  id,
  date,
  deletingVideo,
  video,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
    setOpen(true);
  };
  const closeDeleteDialog = () => {
    setOpen(false);
  };
  const deleteAction = () => {
    deleteVideo(id);
    // toast.error(`Video Deleted successfully of title ${title} `)
    // if(video?.isChatvid) {
    //   return toast.error(`Can't delete chatvid! of title ${title} `)
    // }
    // deleteVideo(id);
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_DOMAIN}/watch/${id}`
    );
    toast("Url copied to clipboard", {
      autoClose: 1000,
      transition: Flip,
      hideProgressBar: true,
      // className: "toasts",
    });
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
      <Grid container style={{ padding: "10px 0px 0px 10px" }}>
        <Grid item xs={10}>
          <h5 className="titleVideo">{title}</h5>
        </Grid>
        <Grid item xs={2}>
          <span className="vertIcon" onClick={handleClick}>
            <MoreVertIcon />
          </span>
          <Menu
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
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <VideoInfo video={video} />
          <span className="addedVideoInfo">
            added {calculateDays()} days ago
          </span>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    deletingVideo: state.video.deletingVideo,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    // deleteVideo: (title: any) => dispatch(deleteVideo(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
