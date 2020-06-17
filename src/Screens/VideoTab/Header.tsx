import React from "react";
import {
  Row,
  Col,
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";
import {
  FaMailBulk,
  FaPencilAlt,
  FaRegEnvelopeOpen,
  FaHandPointUp,
  FaEye,
  FaVideo,
  FaDownload
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import * as Constants from "../../constants/constants";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./style";

interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
}
interface IProps {
  videoId?: string | null;
  video: Video;
}

class VideoTabHeader extends React.Component<IProps> {
  render() {
    const { video } = this.props;
    return (
      <div>
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Row>
              <Col xs="12" sm="12" md="6">
                {video ? (
                  <VideoPlayer url={video.url} thumbnail={video.thumbnail} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center"
                    }}
                  >
                    <CircularProgress color="secondary" />
                  </div>
                )}
              </Col>
              <Col xs="12" sm="12" md="6" id="headerText">
                <h3>
                  {video && video.title}
                  <i>
                    <FaPencilAlt style={{ fontSize: "15px" }} />
                  </i>
                </h3>
                <span>
                  {Constants.ZERO} <FaRegEnvelopeOpen />
                </span>
                <span style={styles.maincontainer}>
                  {Constants.DASH}
                  {Constants.ZERO}
                  <FaHandPointUp />
                </span>
                <span style={styles.maincontainer}>
                  {Constants.DASH}
                  {Constants.ZERO}
                  <FaEye />
                </span>
                <span style={styles.maincontainer}>
                  {Constants.DASH}
                  {Constants.ZERO}
                  <FaVideo />
                </span>
                <span style={styles.maincontainer}>
                  {Constants.DASH}
                  {Constants.ZERO}
                  <MdCheckBoxOutlineBlank />
                </span>
                <div style={styles.wrapper}>
                  <span>
                    <FaDownload /> {Constants.MP4}
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs="12" sm="12" md="4" lg="4" xl="4">
            <Button
              size="lg"
              style={styles.buttonWrapper}
              onClick={() => alert("This is not functional yet")}
            >
              {Constants.SEND_SHARE}
            </Button>
            <br />
            <br />
            <InputGroup>
              <Input placeholder="https://vidionpro.com" />
              <InputGroupAddon addonType="append">
                <InputGroupText style={styles.inputContainer}>
                  <FaMailBulk style={styles.inputwrapper} />
                </InputGroupText>
                <InputGroupText style={styles.inputContainer}>
                  <FiExternalLink style={styles.inputwrapper} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  // const video = getVideoById(state, ownProps.videoId);
  return {
    video: state.video.singleVideo
  };
};

export default connect(mapStateToProps, null)(VideoTabHeader);
