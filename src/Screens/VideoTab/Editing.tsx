import React from "react";
import S3FileUpload from "react-s3";
// import { RdxVideo, Overlay, Controls } from "react-html5-video-editor";
import { connect } from "react-redux";
import { updateVideo } from "../../Redux/Actions/videos";
import { VideoUpdate } from "../../Redux/Types/videos";
import { config } from "../../config/aws";
import { getVideoById } from "../../Redux/Selectors";
import { Container, Row, Col } from "reactstrap";
import ThemeButton from "../../components/ThemeButton";
import VideoPlayer from "../../components/VideoPlayer/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import "./style.css";

interface IState {
  file: File | null;
  url: string;
  uploading: boolean;
}
interface Video {
  url: string;
  title: string;
  thumbnail?: string;
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
    isUpdated: false,
    uploading: false
  };

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
          toast.success("Thumbnail Updated , Apply changes to update");
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
    const video = {
      id: this.props.videoId,
      thumbnail: this.state.url
    };
    this.props.updateVideo(video);
  };
  render() {
    const { video, isVideoUpdating } = this.props;
    return (
      <div className="editingTabWrapper">
        <Container>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8">
              {video && (
                <VideoPlayer url={video.url} thumbnail={video.thumbnail} />
              )}
              {/* {video && (
                <RdxVideo autoPlay loop muted>
                  <Overlay type="video/webm" />
                  <Controls type="video/webm" />
                  <source src={video.url} type="video/webm" />
                </RdxVideo>
              )} */}
            </Col>
            <Col xs="1" md="2"></Col>
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
                <h4 className="thumbnaillEditMsg">Edit Thumbnail</h4>
                <div className="progressEditing">
                  {this.state.uploading && <CircularProgress />}
                </div>
                <div className="progressEditing">
                  {isVideoUpdating && <CircularProgress />}
                </div>

                <div className="btnEditThumbnailWrapper">
                  <ThemeButton
                    name="Upload File"
                    onClick={this.triggerFileUploadBtn}
                  />

                  <ThemeButton
                    name="Apply Editing Changes"
                    onClick={this.saveChanges}
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
  const video = getVideoById(state, ownProps.videoId);
  return {
    video: video,
    isVideoUpdating: state.video.isVideoUpdating
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: VideoUpdate) => dispatch(updateVideo(video))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
