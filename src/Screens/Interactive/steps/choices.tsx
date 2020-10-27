import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Typography, TextField, Divider, Button } from "@material-ui/core";

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";


import CancelIcon from '@material-ui/icons/Cancel';

import "react-tabs/style/react-tabs.css";
import "../style.css";

type RState = {
};
class MultiChoice extends Component<any, RState> {
  state = {
    fitVideo: true,
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fitVideo: event.target.checked });
  };

  render () {
    return (
      <Grid container className="overLayWrapperTab">
        <Grid container xs={12} sm={12} md={8} lg={8}>
          <div className="previewTab">

          </div>
        </Grid>
        <Grid container xs={12} sm={12} md={4} lg={4}>
          <div className="actionTab">
            <CancelIcon className="tabCancelHead" onClick={() => this.props.history.push("/")} />
            <Typography variant="h6" className="topHeading">For Multiple Choice,!</Typography>
            <Typography variant="h6" className="QuestionHeading">Add your items below...</Typography>
            
            <Grid container className="optionCardWrapper">
              <Grid item sm={10} md={10} lg={10} className="cardBody">
                <Typography variant="subtitle1" >I would like to to know more about your!</Typography>
              </Grid>
              <Grid item sm={1} md={1} lg={1}>
                <RemoveCircleIcon className="cardImg" />
              </Grid>
            </Grid>
            
            <Grid container className="optionCardWrapper">
              <Grid item sm={1} md={1} lg={1}>
                <AddCircleIcon className="cardImg" />
              </Grid>
              <Grid item sm={10} md={10} lg={10} className="cardBody">
                <Typography variant="subtitle1" >Add another choice</Typography>
              </Grid>
            </Grid>

            <Grid container className="ToggleActionsWrapper" style={{ margin: "1%" }}>
              <Grid item xs={12} sm={4} md={4} lg={4} style={{ margin: "4px"}}> 
                <Button
                  color="default"
                  className="BackBTN"
                  startIcon={<NavigateBeforeOutlinedIcon />}
                  onClick={this.props.moveBack}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const iconStyle = {
  padding: 0,
  width: "1em",
  height: "1em"
};
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice);