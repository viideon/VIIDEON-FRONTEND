import React from "react";
import { Button } from "@material-ui/core";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import { updateVideo } from "../../Redux/Actions/videos";
import { VideoUpdate } from "../../Redux/Types/videos";
import { config } from "../../config/aws";
import { getVideoById } from "../../Redux/Selectors";
import { Container, Row, Col } from "reactstrap";
import ThemeButton from "../../components/ThemeButton";
import VideoCard from "../../components/VideoCard/VideoCard";
import "./style.css";

interface IState {
  file: File | string;
  url: string;
}
interface Video {
  url: string;
  title: string;
}
interface IProps {
  updateVideo: (video: VideoUpdate) => void;
  isVideoUpdated: boolean;
  videoId?: string | null;
  video: Video;
}

class Editing extends React.Component<IProps, IState> {
  state = {
    file: "",
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
      this.setState({ file: e.target.files![0] });
    }
    const that = this;
    let s3 = new AWS.S3(config);

    const options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString(),
      Body: this.state.file
    };

    s3.upload(options, function(err: any, data: any) {
      if (err) {
        throw err;
      }
      that.setState({ url: data.Location });
    });
  };
  saveChanges = () => {
    const video = {
      id: this.props.videoId,
      thumbnail: this.state.url
    };
    this.props.updateVideo(video);
  };
  render() {
    const { video } = this.props;

    return (
      <div className="editingTabWrapper">
        <Container>
          <Row>
            <Col xs="1" md="2"></Col>
            <Col xs="10" md="8">
              {video && <VideoCard title={video.title} url={video.url} />}
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
