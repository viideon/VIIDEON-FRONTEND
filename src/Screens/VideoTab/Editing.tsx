import React from "react";
import S3FileUpload from "react-s3";
import { Container, Row, Col } from "reactstrap";
import { Tooltip } from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { connect } from "react-redux";
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
}
interface Video {
  url: string;
  title: string;
  thumbnail?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
}
interface IProps {
  updateVideo: (video: VideoUpdate) => void;
  isVideoUpdated: boolean;
  videoId?: string | null;
  video: Video;
  isVideoUpdating: boolean;
}

class Editing extends React.Component<IProps, IState> {
  state = {
    file: null,
    url: "",
    uploading: false,
    showVideo: false
  };
  container: any;
  componentDidMount() {
    this.container = this.refs.container;
    setTimeout(() => this.setState({ showVideo: true }), 5000);
  }
  componentWillReceiveProps(nextProps: any) {
    if (
      (nextProps.video && nextProps.video.campaign === false) ||
      (nextProps.video && nextProps.video.campaign === undefined)
    ) {
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

  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0] !== null) {
      let file = e.target.files![0];
      this.setState({ uploading: true });
      S3FileUpload.uploadFile(file, config)
        .then((data: any) => {
          this.setState({ url: data.location, uploading: false });
          toast.info("Thumbnail Updated , Apply changes to update");
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

  saveChanges = () => {
    if (this.state.url === "") {
      toast.error("Please upload a thumbnail");
      return;
    }
    const video = {
      id: this.props.videoId,
      thumbnail: this.state.url
    };
    this.props.updateVideo(video);
    this.setState({ url: "" });
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
              {video && !video.campaign && showVideo && (
                <VideoPlayer
                  url={video.url}
                  thumbnail={video.thumbnail}
                  height={300}
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
                {video && video.campaign && (
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

                <div className="btnEditThumbnailWrapper">
                  <ThemeButton
                    name="Upload File"
                    onClick={this.triggerFileUploadBtn}
                    style={{ border: "2px solid #22B9FF", marginBottom: "2px" }}
                  />

                  <ThemeButton
                    name="Apply Editing Changes"
                    onClick={this.saveChanges}
                    style={{ border: "2px solid #22B9FF" }}
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
    updateVideo: (video: VideoUpdate) => dispatch(updateVideo(video))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
