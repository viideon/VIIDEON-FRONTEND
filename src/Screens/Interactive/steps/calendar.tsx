import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Typography, Button } from "@material-ui/core";

import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';

import CancelIcon from '@material-ui/icons/Cancel';

import PreviewTab from './preview';

import "react-tabs/style/react-tabs.css";
import "../style.css";

class Calendar extends Component<any> {
  state = {
    link: '',
  }

  render() {
    return (
      <Grid container className="overLayWrapperTab">
        <Grid container xs={12} sm={12} md={8} lg={8}>
          <PreviewTab
            {...this.props}
            {...this.state}
          />
        </Grid>
        <Grid container xs={12} sm={12} md={4} lg={4}>
          <div className="actionTab">
            <CancelIcon className="tabCancelHead" onClick={() => this.props.history.push("/")} />
            <Typography variant="h6" className="topHeading">For Calendar</Typography>
            <Typography variant="h6" className="QuestionHeading">Please add your calendly link...</Typography>

            <Grid container className="CalendarGroupWrapper">
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <CalendarTodayRoundedIcon className="CalendarICON" />
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} className="addCalandarInputWrapper">
                <input
                  type="text"
                  name={"calendar"}
                  value={this.props.link}
                  placeholder={`Past calendly link here`}
                  onChange={this.props.onChange}
                  className="linkInput MuiTypography-root MuiTypography-subtitle1"
                />
              </Grid>
            </Grid>

            <Grid container className="ToggleActionsWrapper" style={{ margin: "1%" }}>
              <Grid item xs={12} sm={4} md={4} lg={4} style={{ margin: "4px"}}> 
                <Button
                  color="default"
                  className="BackBTN"
                  startIcon={<NavigateBeforeOutlinedIcon />}
                  onClick={() => this.props.moveBack(true)}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={6} lg={6} style={{ margin: "4px"}}>
                <Button
                  color="default"
                  className="NextBTN"
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={this.props.moveToNextStep}
                >
                  Next Step
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);