import React from "react";
// import AWS from "aws-sdk";
import S3FileUpload from "react-s3";
import { connect } from "react-redux";
import { updateVideo } from "../../Redux/Actions/videos";
import { VideoUpdate } from "../../Redux/Types/videos";
import { config } from "../../config/aws";
import { getVideoById } from "../../Redux/Selectors";
import { Container, Row, Col } from "reactstrap";
import ThemeButton from "../../components/ThemeButton";
import VideoCard from "../../components/VideoCard/VideoCard";
import Alert from "../../components/Alert";
import "./style.css";

interface IState {
  file: File | null;
  url: string;
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
}

class Editing extends React.Component<IProps, IState> {
  state = {
    file: null,
    url: "",
    isUpdated: false
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.isVideoUpdated &&
      nextProps.isVideoUpdated !== prevState.isUpdated
    ) {
      return {
        isUpdated: true
      };
    } else {
      return null;
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
      S3FileUpload.uploadFile(file, config)
        .then((data: any) => {
          this.setState({ url: data.location });
          alert("Thumbnail Updated");
          return;
        })
        .catch((err: any) => alert(err));
    } else {
      alert("No file selected ,Try again");
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
    const { video, isVideoUpdated } = this.props;
    return (
      <div className="editingTabWrapper">
        <Container>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8">
              {isVideoUpdated && (
                <Alert text="Thumbnail Updated" color="success" />
              )}
              {isVideoUpdated === false && (
                <Alert text="Update failed" color="danger" />
              )}
              {video && (
                <VideoCard
                  title={video.title}
                  url={video.url}
                  thumbnail={video.thumbnail}
                />
              )}
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
                />
                <h4 className="thumbnaillEditMsg">Edit Thumbnail</h4>
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
    isVideoUpdated: state.video.isVideoUpdated,
    video: video
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: VideoUpdate) => dispatch(updateVideo(video))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editing);
