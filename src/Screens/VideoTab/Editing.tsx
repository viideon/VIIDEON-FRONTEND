import React from "react";
import S3FileUpload from "react-s3";
import { Container, Row, Col } from "reactstrap";
import AssetPicker from "../../components/AssetPicker";
import { Tooltip, TextField } from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { connect } from "react-redux";
import { addAsset } from "../../Redux/Actions/asset";
import { updateVideo } from "../../Redux/Actions/videos";
import { VideoUpdate } from "../../Redux/Types/videos";
import CanvasPlayer from "../../components/CanvasPlayer/EditingCanvas";
import { config } from "../../config/aws";
import ThemeButton from "../../components/ThemeButton";
import VideoPlayer from "../../components/VideoPlayer/index";
import { toast } from "react-toastify";
import "./style.css";

interface IState {
  file: File | null;
  url: string;
  uploading: boolean;
  showVideo: boolean;
  isAssetPicker: boolean;
  newVideoTitle: string;
}
interface Video {
  url: string;
  title: string;
  thumbnail?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  recordingEdit?: boolean;
}
interface IProps {
  updateVideo: (video: VideoUpdate) => void;
  addAsset: (asset: any) => void;
  isVideoUpdated: boolean;
  videoId?: string | null;
  video: Video;
  isVideoUpdating: boolean;
}

class Editing extends React.Component<IProps, IState> {
  _isMounted: any;
  constructor(props: any) {
    super(props);
    this.state = {
      file: null,
      url: "",
      uploading: false,
      showVideo: true,
      isAssetPicker: false,
      newVideoTitle: ""
    };
    this._isMounted = false;
  }
  container: any;
  componentDidMount() {
    this._isMounted = true;
    this.container = this.refs.container;
    this._isMounted &&
      setTimeout(() => this.setState({ showVideo: true }), 1000);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillReceiveProps(nextProps: any) {
    const { video } = nextProps;
    if (video && !video.campaign && !video.recordingEdit) {
      this.container.style.display = "none";
    }
  }
  upload: any;
  setInputRef = (ref: any) => {
    this.upload = ref;
  };
  triggerFileUploadBtn = () => {
    this.upload.click();
  };
  toggleAssetPicker = () => {
    this.setState({ isAssetPicker: !this.state.isAssetPicker });
  };
  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      let file = e.target.files![0];
      this.setState({ uploading: true });
      S3FileUpload.uploadFile(file, config)
        .then((data: any) => {
          this.setState({ url: data.location, uploading: false }, () =>
            this.props.addAsset({ type: "thumbnail", url: this.state.url })
          );
          this.saveChanges();
          return;
        })
        .catch((err: any) => {
          this.setState({ uploading: false });
          toast.error(err);
        });
    } else {
      toast.error("No file selected");
    }
  };
  onAssetPick = (path: any) => {
    this.setState({ url: path }, () => {
      toast.info("Saving your changes");
      this.saveChanges();
    });
  };
  saveChanges = () => {
    if (this.state.url === "") {
      toast.error("Failed to add thumbnail, Please try again");
      return;
    }
    const video = {
      id: this.props.videoId,
      thumbnail: this.state.url
    };
    this.props.updateVideo(video);
    this.setState({ url: "" });
  };
  changeTitle = (e: any) => {
    this.setState({ newVideoTitle: e.target.value });
  };
  updateTitle = () => {
    if (this.state.newVideoTitle === "") {
      toast.error("Please add an title befor updating");
      return;
    }
    const video = {
      id: this.props.videoId,
      title: this.state.newVideoTitle
    };
    this.props.updateVideo(video);
    this.setState({ newVideoTitle: "" });
  };
  render() {
    const { video, isVideoUpdating } = this.props;
    const { showVideo } = this.state;
    return (
      <div className="editingTabWrapper">
        <Container>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8">
              {video &&
                !video.campaign &&
                !video.recordingEdit &&
                showVideo && (
                  <VideoPlayer
                    url={video.url}
                    thumbnail={video.thumbnail}
                    height={370}
                  />
                )}
              <div
                ref="container"
                style={{
                  height: "400px",
                  width: "100%",
                  visibility: showVideo ? "visible" : "hidden"
                }}
              >
                {((video && video.campaign) ||
                  (video && video.recordingEdit)) && (
                  <CanvasPlayer
                    muted={false}
                    autoPlay={false}
                    loop={false}
                    src={video.url}
                    logoProps={video.logoProps}
                    textProps={video.textProps}
                    thumbnail={video.thumbnail}
                  />
                )}
              </div>
              {showVideo === false && (
                <div style={{ position: "absolute", left: "48%", top: "40%" }}>
                  <Loading />
                </div>
              )}
            </Col>
            <Col xs="1" md="2"></Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8">
              <div className="wrapperEditThumbnail">
                <input
                  id="uploadInput"
                  type="file"
                  onChange={this.onFileChange}
                  ref={this.setInputRef}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <h4 className="thumbnaillEditMsg">
                  Customize Thumbnail
                  <Tooltip
                    title="upload a thumbnail for your video"
                    placement="top"
                    arrow
                    style={{ marginLeft: "3px" }}
                  >
                    <HelpIcon />
                  </Tooltip>
                </h4>
                <div className="progressEditing">
                  {this.state.uploading && <Loading />}
                </div>
                <div className="progressEditing">
                  {isVideoUpdating && <Loading />}
                </div>
                <AssetPicker
                  isOpen={this.state.isAssetPicker}
                  toggle={this.toggleAssetPicker}
                  logoAssets={false}
                  onPick={this.onAssetPick}
                />
                <div className="btnEditThumbnailWrapper">
                  <ThemeButton
                    name="Upload File"
                    onClick={this.triggerFileUploadBtn}
                    style={{
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)",
                      marginBottom: "2px",
                      outline: "none"
                    }}
                  />
                  <ThemeButton
                    name="Select from assets"
                    onClick={this.toggleAssetPicker}
                    style={{
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)",
                      marginBottom: "2px",
                      outline: "none"
                    }}
                  />
                </div>
                <div className="wrapperEditTitle">
                  <h4 className="thumbnaillEditMsg">
                    Customize Title
                    <Tooltip
                      title="Customize  title for this video"
                      placement="top"
                      arrow
                      style={{ marginLeft: "3px" }}
                    >
                      <HelpIcon />
                    </Tooltip>
                  </h4>
                  <TextField
                    placeholder="Add new title"
                    fullWidth
                    type="text"
                    value={this.state.newVideoTitle}
                    name="recieverEmail"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.changeTitle}
                  />
                  <ThemeButton
                    name="Update title"
                    onClick={this.updateTitle}
                    style={{
                      border: "none",
                      background: "#16B272",
                      color: "rgb(255, 255, 255)",
                      marginTop: "20px",
                      marginBottom: "2px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col xs="1" md="2"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  // const video = getVideoById(state, ownProps.videoId);
  return {
    video: state.video.singleVideo,
    isVideoUpdating: state.video.isVideoUpdating
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: VideoUpdate) => dispatch(updateVideo(video)),
    addAsset: (asset: any) => dispatch(addAsset(asset))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
