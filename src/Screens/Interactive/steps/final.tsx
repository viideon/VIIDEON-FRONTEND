import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Typography, Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import "react-tabs/style/react-tabs.css";
import "../style.css";

class FinalTab extends Component<any> {
  state = {
    title: "",
    isClicked: false,
  };

  handleChange = (e: any) => {
    let newState: any = this.state;
    newState[e.target.name] = e.target.value;
    this.setState({ ...newState });
    this.props.onChange(e);
  };
  finalize = () => {
    if (this.state.title === "") {
      // console.log(this.props.state);
      toast.error("Enter chatvid title!");
      return 0;
    } else {
      this.setState({ isClicked: true });
      this.props.moveToNextStep();
      this.setState({
        title: "",
      });
    }
  };

  render() {
    return (
      <Grid
        container
        className="overLayWrapperTab"
        style={{ opacity: `${this.state.isClicked ? 0.7 : 1}` }}
      >
        <div className="finalTabHeader">
          <CancelIcon
            className="finalCancel"
            onClick={() => !this.state.isClicked && this.props.moveBack(true)}
          />
          <Typography variant="h2">Almost Done!</Typography>
          <Typography variant="subtitle1">Name your chatvid...</Typography>
        </div>
        <Grid container className="finalFormContainer">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <form onChange={this.handleChange}>
              <input
                type="text"
                name="title"
                value={this.state.title}
                placeholder="Enter title here"
                className="EnterName MuiTypography-root MuiTypography-subtitle1"
              />
            </form>
            <Grid
              container
              className="ToggleActionsWrapper"
              style={{
                margin: "1%",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <Grid
                item
                xs={12}
                sm={10}
                md={12}
                lg={12}
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  textAlignLast: "center",
                  width: "80%",
                  margin: "1%",
                }}
              >
                <Button
                  color="default"
                  className="NextBTN"
                  // endIcon={<KeyboardArrowRightIcon />}
                  onClick={this.finalize}
                  disabled={this.state.isClicked}
                >
                  {this.state.isClicked ? <Loading /> : "Create chatvid"}
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  textAlignLast: "center",
                  width: "80%",
                  margin: "1%",
                }}
              >
                {/* {console.log("final", this.state.isClicked)} */}
                <Button
                  color="default"
                  className="BackBTN"
                  // startIcon={<NavigateBeforeOutlinedIcon />}
                  disabled={this.state.isClicked}
                  onClick={() =>
                    !this.state.isClicked && this.props.moveBack(true)
                  }
                >
                  Go Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(FinalTab);
