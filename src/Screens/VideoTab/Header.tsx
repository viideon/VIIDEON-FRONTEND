import React from "react";
import {
  Row,
  Col,
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import {
  FaMailBulk,
  FaPencilAlt,
  FaRegEnvelopeOpen,
  FaHandPointUp,
  FaEye,
  FaVideo,
  FaDownload,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import * as Constants from "../../constants/constants";
import VideoPlayer from "../../components/VideoPlayer";
import CanvasPlayer from "../../components/CanvasPlayer";
import styles from "./style";

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
}
interface IProps {
  video?: Video;
}

class VideoTabHeader extends React.Component<IProps> {
  container: any;
  componentDidMount() {
    this.container = this.refs.container;
  }
  componentWillReceiveProps(nextProps: any) {
    if (
      (nextProps.video && nextProps.video.campaign === false) ||
      (nextProps.video && nextProps.video.campaign === undefined)
    ) {
      this.container.style.display = "none";
    }
  }

  render() {
    const { video } = this.props;
    return (
      <div className="headerTab">
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Row>
              <Col xs="12" sm="12" md="6">
                {!video && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <CircularProgress color="primary" />
                  </div>
                )}
                {video && !video.campaign && (
                  <VideoPlayer url={video.url} thumbnail={video.thumbnail} />
                )}
                <div ref="container" style={{ height: "220px", width: "100%" }}>
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
              </Col>

              <Col xs="12" sm="12" md="6" id="headerText">
                <h3>
                  {video && video.title}
                  <i>
                    <FaPencilAlt style={{ fontSize: "15px" }} />
                  </i>
                </h3>
                <Tooltip title="Email Opens" enterDelay={0}>
                  <span>
                    {Constants.ZERO} <FaRegEnvelopeOpen />
                  </span>
                </Tooltip>
                <Tooltip title="Email Clicks" enterDelay={0}>
                  <span style={styles.maincontainer}>
                    {Constants.DASH}
                    {video?.emailShareCount ? video.emailShareCount : "0"}
                    <FaHandPointUp />
                  </span>
                </Tooltip>
                <Tooltip title="Views" enterDelay={0}>
                  <span style={styles.maincontainer}>
                    {Constants.DASH}
                    {video?.views ? video.views : "0"}
                    <FaEye />
                  </span>
                </Tooltip>
                <Tooltip title="Watches" enterDelay={0}>
                  <span style={styles.maincontainer}>
                    {Constants.DASH}
                    {video?.watch ? video.watch : "0"}
                    <FaVideo />
                  </span>
                </Tooltip>
                <Tooltip title="CTA Clicks" enterDelay={0}>
                  <span style={styles.maincontainer}>
                    {Constants.DASH}
                    {Constants.ZERO}
                    <MdCheckBoxOutlineBlank />
                  </span>
                </Tooltip>
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

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo,
  };
};

export default connect(mapStateToProps, null)(VideoTabHeader);
