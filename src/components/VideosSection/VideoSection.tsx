import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Grid,
  // Checkbox,
  Tooltip
  // OutlinedInput,
} from "@material-ui/core";
import DeleteDialog from "../Reusable/DeleteDialog";
import {
  getUserVideos,
  resetPage,
  searchUserVideos,
  deleteVideo,
  emptyPage
} from "../../Redux/Actions/videos";
import { thumbnailDefault } from "../../constants/constants";
import VideoCard from "../VideoCard/VideoCard";
import Loading from "../Loading";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import "./styles.css";

type IProps = {
  history: any;
  getUserVideos?: any;
  searchUserVideos: (title: any) => void;
  resetPage: () => void;
  userVideos: object[];
  loadingVideos: boolean;
  loadMore: boolean;
  deleteVideo: (id: any) => void;
  emptyPage: () => void;
  deletingVideo: boolean;
  showDeleteDialog: boolean;
  videoType: string;
};

class VideoSection extends Component<IProps> {
  state = {
    searchText: "",
    gridView: true,
    deleteDialog: false
  };
  constructor(props: any) {
    super(props);
    this.props.resetPage();
  }
  componentDidMount() {
    this.props.getUserVideos(this.props.videoType);
  }

  componentWillUnmount() {
    this.props.resetPage();
  }
  static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.showDeleteDialog === false) {
      return { deleteDialog: false };
    } else return null;
  }
  loadMore = () => {
    this.props.getUserVideos(this.props.videoType);
  };
  navigateToVideoTab = (id: string) => {
    this.props.history.push(`/videotab/${id}`);
  };
  deleteVideo = (id?: string) => {
    this.props.deleteVideo(id);
  };
  searchVideos = (e: any) => {
    if (e.target.value) {
      this.props.searchUserVideos({
        title: e.target.value,
        videoType: this.props.videoType
      });
    } else {
      this.props.emptyPage();
      this.props.getUserVideos(this.props.videoType);
    }
  };
  toggleView = () => {
    this.setState({ gridView: !this.state.gridView });
  };
  createVideo = () => {
    if (this.props.videoType === "allVideos") {
      this.props.history.push("/video/create");
    } else {
      this.props.history.push("/campaign/new");
    }
  };
  calculateDays = (date: any) => {
    let currentTime = moment(moment().toDate());
    let videoAddedTime = moment(date).format("YYYY-MM-DD HH:mm");
    return currentTime.diff(videoAddedTime, "day");
  };
  openDeleteDialog = () => {
    this.setState({ deleteDialog: true });
  };
  closeDeleteDialog = () => {
    this.setState({ deleteDialog: false });
  };
  render() {
    const { userVideos, loadingVideos } = this.props;
    const { gridView } = this.state;
    let videoTitle;
    if (this.props.videoType === "allVideos") {
      videoTitle = "MY VIDEOS";
    } else {
      videoTitle = "CAMPAIGN";
    }
    return (
      <div className="VideoComponent">
        <div className="mainHeadingWrapper">
          <div style={{ display: "flex" }}>
            <span className="Header">{videoTitle}</span>

            <div className="sb-example-3">
              <div className="search__container">
                <input
                  className="search__input"
                  type="text"
                  onChange={this.searchVideos}
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="ovalBtnWrap">
            <Tooltip title="Create new  Video">
              <button
                className="ovalBtn over-add-btn "
                onClick={this.createVideo}
              >
                <AddIcon />
              </button>
            </Tooltip>
            <Tooltip title={gridView ? "List View" : "Grid View"}>
              <button className="ovalBtn" onClick={this.toggleView}>
                {gridView ? <ListIcon /> : <AppsIcon fontSize="small" />}
              </button>
            </Tooltip>
          </div>
        </div>

        {gridView ? (
          <Grid container spacing={3}>
            {userVideos &&
              userVideos.map((video: any) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={video._id}>
                  <VideoCard
                    title={video.title}
                    url={video.url}
                    thumbnail={video.thumbnail}
                    id={video._id}
                    deleteVideo={this.deleteVideo}
                    date={video.date}
                    video={video}
                    onClick={() => this.navigateToVideoTab(video._id)}
                  />
                </Grid>
              ))}
          </Grid>
        ) : (
          <div className="listWrapper">
            <table className="tableList">
              <thead>
                <tr>
                  {/* <th>
                    <Checkbox color="primary" />
                  </th> */}
                  <th>Video</th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Created at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userVideos &&
                  userVideos.map((video: any) => (
                    <ListViewCard
                      key={video._id}
                      date={video.date}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      deletingVideo={this.props.deletingVideo}
                      deleteVideo={this.deleteVideo}
                      id={video._id}
                      navigateToVideo={this.navigateToVideoTab}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="loadMoreWrapper">{loadingVideos && <Loading />}</div>
        <div className="loadMoreWrapper">
          {this.props.loadMore && (
            <button className="loadMore" onClick={this.loadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    userVideos: state.video.videos,
    loadingVideos: state.video.loadingVideos,
    loadMore: state.video.loadMore,
    deletingVideo: state.video.deletingVideo,
    showDeleteDialog: state.video.showDeleteDialog
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserVideos: (videoType: any) => dispatch(getUserVideos(videoType)),
    resetPage: () => dispatch(resetPage()),
    deleteVideo: (id: any) => dispatch(deleteVideo(id)),
    searchUserVideos: (title: any) => dispatch(searchUserVideos(title)),
    emptyPage: () => dispatch(emptyPage())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoSection);

interface IPropsListCard {
  title: string;
  thumbnail?: string;
  id: string;
  deleteVideo: (id: string) => void;
  date: any;
  deletingVideo: boolean;
  navigateToVideo: (id: string) => void;
}

const ListViewCard: React.FC<IPropsListCard> = ({
  title,
  thumbnail,
  deleteVideo,
  id,
  date,
  deletingVideo,
  navigateToVideo
}) => {
  const [open, setOpen] = React.useState(false);
  const deleteAction = () => {
    deleteVideo(id);
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
  return (
    <tr>
      <DeleteDialog
        open={open}
        closeDeleteDialog={closeDeleteDialog}
        deletingVideo={deletingVideo}
        deleteVideo={deleteAction}
      />

      {/* <td>
        <Checkbox color="primary" />
      </td> */}
      <td className="centerContent">
        <img
          className="previewList"
          src={thumbnail ? thumbnail : thumbnailDefault}
          alt="thumbnail"
        />
      </td>
      <td>{title}</td>
      <td></td>
      <td> added {calculateDays()} days ago</td>
      <td>
        <div>
          <button className="squareBtn" onClick={() => navigateToVideo(id)}>
            <CreateIcon fontSize="small" htmlColor="#fff" />
          </button>
          <button className="squareBtn red" onClick={openDeleteDialog}>
            <DeleteIcon fontSize="small" htmlColor="#fff" />
          </button>
        </div>
      </td>
    </tr>
  );
};
