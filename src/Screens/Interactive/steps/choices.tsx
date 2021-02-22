import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Typography, Button } from "@material-ui/core";

import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import CancelIcon from "@material-ui/icons/Cancel";
import PreviewTab from "./preview";
import "react-tabs/style/react-tabs.css";
import "../style.css";

class MultiChoice extends Component<any> {
  state = {
    fitVideo: true,
    cats: ["Hi, I would like to know more about ViideOn."],
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fitVideo: event.target.checked });
  };

  handleChangeC = (e: any) => {
    let cats = this.state.cats;
    cats[e.target.name] = e.target.value;
    this.setState({ cats });
    this.props.onChange({ target: { name: "choices", value: cats } });
  };

  addCat = (e: any) => {
    let cats = [...this.state.cats, `choice${this.state.cats.length + 1}`];
    this.setState({ cats });
    this.props.onChange({ target: { name: "choices", value: cats } });
  };

  removeCat = (e: any) => {
    let cats = this.state.cats.filter((val, idx) => e !== idx);
    this.setState({ cats });
    this.props.onChange({ target: { name: "choices", value: cats } });
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
            <Typography variant="h6" className="topHeading">
              For Multiple Choice,
            </Typography>
            <Typography variant="h6" className="QuestionHeading">
              Add your items below...
            </Typography>

            <form
              onSubmit={(e) => e.preventDefault()}
              onChange={this.handleChangeC}
            >
              <CatInputs cats={this.state.cats} removeCat={this.removeCat} />
            </form>
            <Grid container className="addChoice" onClick={this.addCat}>
              <Grid item sm={1} md={1} lg={1}>
                <AddCircleIcon className="addChoiceImg" />
              </Grid>
              <Grid item sm={10} md={10} lg={10} className="AddChoiceTxt">
                <Typography variant="subtitle1">Add another choice</Typography>
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
                  onClick={this.props.moveBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={6} lg={6} style={{ margin: "4px" }}>
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
    );
  }
}

const CatInputs = (props: any) => {
  return props.cats?.map((val: any, idx: any) => {
    return (
      <Grid key={idx} container className="ChoiceCardWrapper">
        <Grid item sm={10} md={10} lg={10} className="ChoiceTxt">
          {/* {console.log("multiple choices ", props.cat, idx)} */}
          <input
            type="text"
            name={idx}
            data-id={idx}
            id={idx}
            value={props.cats[idx]}
            placeholder={
              idx === 0
                ? "Hi, I would like to know more about ViideOn."
                : "Choice" + `${idx + 1}`
            }
            className="ChoiceInput MuiTypography-root MuiTypography-subtitle1"
            required
          />
        </Grid>
        <Grid item sm={1} md={1} lg={1}>
          <RemoveCircleIcon
            className="ChoiceImg"
            onClick={() => props.removeCat(idx)}
          />
        </Grid>
      </Grid>
    );
  });
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice);
