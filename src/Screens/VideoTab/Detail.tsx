import React from "react";
import { FormGroup, Label, Input, Col, Form } from "reactstrap";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ChipInput from "material-ui-chip-input";
import { GoInfo } from "react-icons/go";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import {
  sendVideoToEmail,
  sendMultipleEmails
} from "../../Redux/Actions/videos";
import { EmailVideo, MultiEmail } from "../../Redux/Types/videos";

interface IProps {
  sendMultipleEmail: (emailVideoOnj: any) => void;
  sendVideoToEmail: (email: any) => void;
  progressEmail: boolean;
  loading: boolean;
  match: any;
}
class Detail extends React.Component<IProps> {
  state = {
    recieverEmail: "",
    emails: []
  };
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
      const emailVideoObj = {
        emails: this.state.emails,
        videoId: id
      };
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={1} sm={1} md={3}></Grid>

          <Grid item xs={10} sm={10} md={6}>
            <div style={{ marginTop: "30px" }}>
              <div style={{ marginLeft: "48%" }}>
                {this.props.loading && <CircularProgress />}
                {this.props.progressEmail && <CircularProgress />}
              </div>
              <FormGroup>
                <Label className="labelUploadSection">
                  {Constants.SENDER_ADDRESS}
                </Label>
                <Input
                  type="text"
                  name="recieverEmail"
                  id="typeInput"
                  placeholder="Enter email address"
                  value={this.state.recieverEmail}
                  onChange={this.emailHandler}
                  required
                />
              </FormGroup>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.submitEmail}
              >
                {Constants.SEND_THROUGH_EMAIL}
              </Button>
              <FormGroup className="formGroupMultiple">
                <Label className="labelUploadSection">Broadcast</Label>
                <ChipInput
                  value={this.state.emails}
                  placeholder="Enter email and press enter"
                  fullWidth
                  onAdd={chips => this.handleChipAdd(chips)}
                  onDelete={chip => this.handleDeleteChip(chip)}
                />
              </FormGroup>
              <Button
                color="secondary"
                variant="contained"
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
                id="exampleTextAdd"
                style={{ minHeight: "150px" }}
              />
              <p>
                {Constants.ADD_TEXT}{" "}
                <i>
                  <GoInfo />
                </i>
              </p>
            </Col>
          </FormGroup>
          <FormGroup row style={{ margin: "30px" }}>
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
                  <GoInfo />
                </i>
              </p>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    progressEmail: state.video.progressEmail,
    loading: state.video.loading
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj))
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Detail)
);
