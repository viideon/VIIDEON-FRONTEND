import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import { Grid, Typography, Button } from "@material-ui/core";

import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ListIcon from "@material-ui/icons/List";
import EventNoteIcon from "@material-ui/icons/EventNote";

import CancelIcon from "@material-ui/icons/Cancel";

import PreviewTab from "./preview";
import "react-tabs/style/react-tabs.css";
import "../style.css";

class ResponseType extends Component<any> {
  componentDidMount() {}
  state = {
    isClicked: false,
  };

  handleNext = (type: string) => {
    this.props.onChange({ target: { name: "responseType", value: type } });
    if (type === "Open-ended") {
      this.props.history.location.pathname !== "/chatvid" &&
        this.setState({ isClicked: true });
      return this.props.moveToFinal();
    } else if (type === "Multiple-Choice") {
      return this.props.moveToNextStep();
    } else return this.props.moveToCalendar();
  };
  handleBack = () => {
    const { isClicked } = this.state;
    if (!isClicked) {
      return this.props.moveBack;
    }
  };

  render() {
    return (
      <Grid container className="overLayWrapperTab">
        <Grid container xs={12} sm={12} md={8} lg={8}>
          <PreviewTab {...this.props} {...this.state} />
        </Grid>
        <Grid container xs={12} sm={12} md={4} lg={4}>
          <div className="actionTab">
            <CancelIcon
              className="tabCancelHead"
              onClick={() => this.props.history.push("/")}
            />
            <Typography variant="h6" className="QuestionHeading">
              Alright! How would you like people to respond to this ChatVid?
            </Typography>

            <Grid
              container
              className="optionCardWrapper"
              style={{ backgroundColor: "#f0cc79" }}
              onClick={() => this.handleNext("Open-ended")}
            >
              <Grid item sm={2} md={2} lg={2}>
                <PhotoLibraryIcon className="cardImg" />
              </Grid>
              <Grid item sm={10} md={10} lg={10} className="cardBody">
                <Typography variant="h6">Video, Audio, or Text</Typography>
                <Typography variant="subtitle1">
                  Collect video, audio, text
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className="optionCardWrapper"
              onClick={() => this.handleNext("Multiple-Choice")}
            >
              <Grid item sm={2} md={2} lg={2}>
                <ListIcon className="cardImg" />
              </Grid>
              <Grid item sm={10} md={10} lg={10} className="cardBody">
                <Typography variant="h6">Multiple-choice</Typography>
                <Typography variant="subtitle1">
                  Navigate based on choices or create a poll
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className="optionCardWrapper"
              onClick={() => this.handleNext("Calendly")}
            >
              <Grid item sm={2} md={2} lg={2}>
                <EventNoteIcon className="cardImg" />
              </Grid>
              <Grid item sm={10} md={10} lg={10} className="cardBody">
                <Typography variant="h6">Calendar</Typography>
                <Typography variant="subtitle1">
                  Book appointments on your calendar
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              className="ToggleActionsWrapper"
              style={{ margin: "1%" }}
            >
              <Grid item xs={12} sm={4} md={4} lg={4} style={{ margin: "4px" }}>
                <Button
                  color="default"
                  className="BackBTN"
                  startIcon={<NavigateBeforeOutlinedIcon />}
                  onClick={this.handleBack()}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(ResponseType)
);
