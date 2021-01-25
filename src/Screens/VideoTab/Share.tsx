import React from "react";
import { Grid, TextField } from "@material-ui/core";
import ThemeButton from "../../components/ThemeButton";
import EmailInstruction from "../../components/Reusable/EmailInstruction";
import Colors from "../../constants/colors";
import Loading from "../../components/Loading";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ChipInput from "material-ui-chip-input";
import * as Constants from "../../constants/constants";
import { reg } from "../../constants/emailRegEx";
import {
  sendVideoToEmail,
  sendMultipleEmails,
} from "../../Redux/Actions/videos";
import { EmailVideo, MultiEmail } from "../../Redux/Types/videos";
import "./style.css";

interface IProps {
  sendMultipleEmail: (emailVideoOnj: any) => void;
  sendVideoToEmail: (email: any) => void;
  progressEmail: boolean;
  loading: boolean;
  match: any;
  video: any;
}

class Share extends React.Component<IProps> {
  state = {
    recieverEmail: "",
    emails: [],
  };

  emailHandler = (event: any) => {
    this.setState({
      recieverEmail: event.target.value,
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
      emails: this.state.emails.filter((email: string) => email !== delEmail),
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
        recieverEmail,
      };
      // console.log("receiver Email", video);
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
      // console.log("email in state", this.state.emails);
      const emails = this.state.emails.join();
      // console.log("emails after join", emails);
      const emailVideoObj = {
        recieverEmail: emails,
        videoId: id,
      };
      // console.log("emailObject", emailVideoObj);
      this.props.sendMultipleEmail(emailVideoObj);
      this.setState({ emails: [] });
    }
  };

  render() {
    const { loading, progressEmail } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={1} sm={1} md={3}></Grid>
          <Grid item xs={10} sm={10} md={6}>
            <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <div className="progressEditing">
                {loading && <Loading />}
                {progressEmail && <Loading />}
              </div>
              <div>
                <EmailInstruction heading="Reciever Email" />
                <TextField
                  placeholder="Enter email address"
                  fullWidth
                  type="text"
                  value={this.state.recieverEmail}
                  name="recieverEmail"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.emailHandler}
                />
              </div>
              <ThemeButton
                style={{
                  background: Colors.themeGreen,
                  color: Colors.white,
                  marginTop: "15px",
                }}
                onClick={this.submitEmail}
                name={Constants.SEND_THROUGH_EMAIL}
              />
              <div className="formGroupMultiple">
                <EmailInstruction heading="Broadcast" />
                <ChipInput
                  value={this.state.emails}
                  placeholder="Enter email and press enter"
                  fullWidth
                  onAdd={(chips) => this.handleChipAdd(chips)}
                  onDelete={(chip) => this.handleDeleteChip(chip)}
                />
              </div>

              <ThemeButton
                style={{
                  background: Colors.themeGreen,
                  color: Colors.white,
                  marginTop: "15px",
                }}
                onClick={this.sendMultipleEmail}
                name="Broadcast"
              />
            </div>
            <Grid item xs={1} sm={1} md={3}></Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    progressEmail: state.video.progressEmail,
    loading: state.video.loading,
    isVideoUpdating: state.video.isVideoUpdating,
    video: state.video.singleVideo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendVideoToEmail: (video: EmailVideo) => dispatch(sendVideoToEmail(video)),
    sendMultipleEmail: (emailVideoObj: MultiEmail) =>
      dispatch(sendMultipleEmails(emailVideoObj)),
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Share)
);
