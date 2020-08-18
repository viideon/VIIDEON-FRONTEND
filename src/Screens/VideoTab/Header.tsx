import React from "react";
import {
  Row,
  Col,
  Button
  // Input,
  // InputGroupAddon,
  // InputGroupText,
  // InputGroup
  // Tooltip as StrapTooltip
} from "reactstrap";
// import { FaMailBulk, FaPencilAlt, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import VideoInfo from "../../components/VideoInfo";
// import { FiExternalLink } from "react-icons/fi";
import { connect } from "react-redux";
// import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
// import * as Constants from "../../constants/constants";
import CanvasPlayer from "../../components/CanvasPlayer";
import styles from "./style";

interface Video {
  url: string;
  thumbnail?: string;
  title?: string;
  campaign?: boolean;
  logoProps?: any;
  textProps?: any;
  _id: string;
  views?: number;
  watch?: number;
  emailShareCount?: number;
  recordingEdit?: boolean;
}
interface IProps {
  video?: Video;
}

class VideoTabHeader extends React.Component<IProps> {
  container: any;
  componentDidMount() {
    this.container = this.refs.container;
  }

  copyUrl = () => {
    const { video } = this.props;
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_DOMAIN}/watch/${video && video._id}`
    );
    toast.info("Url copied to clipboard");
  };

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
                      textAlign: "center"
                    }}
                  >
                    <CircularProgress color="primary" />
                  </div>
                )}

                <div ref="container" style={{ height: "220px", width: "100%" }}>
                  {video && (
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
                  {/* <i>
                    <FaPencilAlt
                      style={{ fontSize: "15px", marginLeft: "4px" }}
                    />
                  </i> */}
                </h3>
                <VideoInfo video={video} />
                {/* <div style={styles.wrapper}>
                  <span>
                    <FaDownload /> {Constants.MP4}
                  </span>
                </div> */}
              </Col>
            </Row>
          </Col>
          <Col xs="12" sm="12" md="4" lg="4" xl="4">
            <Button
              size="lg"
              style={styles.buttonWrapper}
              onClick={this.copyUrl}
            >
              Copy URL
            </Button>
            <br />
            <br />
            {/* <InputGroup>
              <Input
                ref="urlInput"
                value={`https://vidionpro.000webhostapp.com/watch/${video &&
                  video._id}`}
                disabled={true}
              /> */}
            {/* <InputGroupAddon addonType="append">
                <InputGroupText
                  style={styles.inputContainer}
                  className="share-icons"
                  id="TooltipExample" //here i am using react starp tooltip because  material tooltip not working with reactstrap component
                  onClick={() => alert("This is not functional yet")}
                >
                  <FaMailBulk style={styles.inputwrapper} />
                </InputGroupText>

                <InputGroupText
                  style={styles.inputContainer}
                  className="share-icons"
                  id="TooltipExample"
                  onClick={() => alert("This is not functional yet")}
                >
                  <FiExternalLink style={styles.inputwrapper} />
                </InputGroupText>

                <StrapTooltip
                  placement="bottom"
                  isOpen={this.state.tooltipOpen}
                  target="TooltipExample"
                  toggle={this.toggle}
                >
                  Under Progress
                </StrapTooltip>
              </InputGroupAddon>
             */}
            {/* </InputGroup> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    video: state.video.singleVideo
  };
};

export default connect(mapStateToProps, null)(VideoTabHeader);
