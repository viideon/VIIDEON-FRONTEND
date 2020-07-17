import React from "react";
import { FormGroup, Label, Input, Col, Form, Button } from "reactstrap";
import { Grid, Tooltip, TextField } from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ChipInput from "material-ui-chip-input";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import {
  sendVideoToEmail,
  sendMultipleEmails,
  updateVideo
} from "../../Redux/Actions/videos";
import { EmailVideo, MultiEmail } from "../../Redux/Types/videos";

interface IProps {
  sendMultipleEmail: (emailVideoOnj: any) => void;
  sendVideoToEmail: (email: any) => void;
  updateVideo: (video: any) => void;
  isVideoUpdating: boolean;
  progressEmail: boolean;
  loading: boolean;
  match: any;
  video: any;
}

class Detail extends React.Component<IProps> {
  state = {
    recieverEmail: "",
    emails: [],
    description: "",
    typingTimeout: 0,
    descriptionLoaded: false
  };

  componentDidUpdate() {
    if (
      this.props.video &&
      this.props.video.description &&
      this.state.descriptionLoaded === false
    ) {
      this.setState({
        description: this.props.video.description,
        descriptionLoaded: true
      });
    }
  }

  emailHandler = (event: any) => {
    this.setState({
      recieverEmail: event.target.value
    });
  };

  handleChipAdd = (email: any) => {
    if (reg.test(email) === false) {
      toast.error("Not a valid email");
      return;
    }
    this.setState({ emails: [...this.state.emails, email] });
  };

  handleDeleteChip = (delEmail: any) => {
    this.setState({
      emails: this.state.emails.filter((email: string) => email !== delEmail)
    });
  };
  submitEmail = () => {
    const { id } = this.props.match.params;
    if (id === "") {
      return toast.warn("No video to share");
    } else if (this.state.recieverEmail === "") {
      return toast.warn("Add an Email");
    } else if (reg.test(this.state.recieverEmail) === false) {
      return toast.warn("Invalid Email");
    } else {
      const recieverEmail = this.state.recieverEmail;
      const video = {
        videoId: id,
        recieverEmail
      };
      this.props.sendVideoToEmail(video);
      this.setState({ recieverEmail: "" });
    }
  };
  sendMultipleEmail = () => {
    const { id } = this.props.match.params;
    if (this.state.emails.length === 0) {
      toast.error("No email provided");
      return;
    } else if (!id) {
      toast.error("No video saved try again");
      return;
    } else {
      const emails = this.state.emails.join();
      const emailVideoObj = {
        recieverEmail: emails,
        videoId: id
      };
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };
  updateDescription = (e: any) => {
    let that = this;
    clearTimeout(this.state.typingTimeout);
    this.setState({
      description: e.target.value,
      typingTimeout: setTimeout(function() {
        that.triggerUpdate(that.state.description);
      }, 2000)
    });
  };
  triggerUpdate = (value: any) => {
    const { id } = this.props.match.params;
    const video = {
      id: id,
      description: value
    };
    this.props.updateVideo(video);
  };
  render() {
    const { loading, progressEmail } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={1} sm={1} md={3}></Grid>

          <Grid item xs={10} sm={10} md={6}>
            <div style={{ marginTop: "30px" }}>
              <div style={{ marginLeft: "48%" }}>
                {loading && <Loading />}
                {progressEmail && <Loading />}
              </div>
              <FormGroup>
                <Label className="labelUploadSection">
                  {Constants.SENDER_ADDRESS}
                  <span>
                    <Tooltip
                      title="connect your gmail account in confguration to send email's on your behalf"
                      placement="top"
                      arrow
                    >
                      <HelpIcon />
                    </Tooltip>
                  </span>
                </Label>
                <TextField
                  placeholder="Enter email address"
                  fullWidth
                  type="text"
                  value={this.state.recieverEmail}
                  name="recieverEmail"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.emailHandler}
                />
              </FormGroup>
              <Button
                style={{
                  border: "none",
                  background: "#16B272",
                  color: "rgb(255, 255, 255)"
                }}
                size="lg"
                onClick={this.submitEmail}
              >
                {Constants.SEND_THROUGH_EMAIL}
              </Button>
              <FormGroup className="formGroupMultiple">
                <Label className="labelUploadSection">
                  Broadcast
                  <span>
                    <Tooltip
                      title="connect your gmail account in confguration to send email's on your behalf"
                      placement="top"
                      arrow
                    >
                      <HelpIcon />
                    </Tooltip>
                  </span>
                </Label>
                <ChipInput
                  value={this.state.emails}
                  placeholder="Enter email and press enter"
                  fullWidth
                  onAdd={chips => this.handleChipAdd(chips)}
                  onDelete={chip => this.handleDeleteChip(chip)}
                />
              </FormGroup>
              <Button
                style={{
                  border: "none",
                  background: "#16B272",
                  color: "#fff"
                }}
                size="lg"
                onClick={this.sendMultipleEmail}
              >
                Broadcast
              </Button>
            </div>
            <Grid item xs={1} sm={1} md={3}></Grid>
          </Grid>
        </Grid>
        <Form>
          <FormGroup row style={{ margin: "30px" }}>
            <Col xs={3} md={2} className="colDetailTab">
              <Label for="exampleText" id="descriptionLabel">
                {Constants.DESCRIPTION}
              </Label>
            </Col>
            <Col>
              <Input
                type="textarea"
                name="text"
                value={this.state.description}
                style={{ minHeight: "150px" }}
                onChange={this.updateDescription}
              />

              <p>
                {Constants.ADD_TEXT}
                <i>
                  <Tooltip title="Appears on video page" placement="top" arrow>
                    <span>
                      <HelpIcon />
                    </span>
                  </Tooltip>
                </i>
              </p>
            </Col>
          </FormGroup>
          {/* <FormGroup row style={{ margin: "30px" }}>
            <Col xs={3} md={2} className="colDetailTab">
              <Label for="exampleText" id="descriptionLabel">
                {Constants.TAG}
              </Label>
            </Col>
            <Col>
              <Input type="text" name="text" id="exampleTextAddTags" />
              <p>
                {Constants.ADD_TAGS}
                <i>
                  <Tooltip
                    title="Organize your videos with tags to enable videos to be filtered in dashboard"
                    placement="top"
                    arrow
                  >
                    <span>
                      <GoInfo />
                    </span>
                  </Tooltip>
                </i>
              </p>
            </Col>
          </FormGroup> */}
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    progressEmail: state.video.progressEmail,
    loading: state.video.loading,
    isVideoUpdating: state.video.isVideoUpdating,
    video: state.video.singleVideo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj)),
    updateVideo: (video: any) => dispatch(updateVideo(video))
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Detail)
);
