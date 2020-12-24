import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getChatvids } from "../../Redux/Actions/chatvid";

import { mobileViewChatVid } from "../../Redux/Actions/chatvid";

import { Grid, Typography } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import Home from "./Home";

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import PermMediaIcon from "@material-ui/icons/PermMedia";

import "./chatvidBoard.css";
type IProps = {
  history: any;
  user: any;
  mobileView: any;
  mobileViewChatVid: (v: any) => void;
  chatvids: any;
  getChatvids: () => void;
};

class Dashboard extends Component<IProps> {
  state = {
    showDashboard: true,
    showVideos: false,
    responders: [],
    selectedChatvid: {},
    selectedPerson: {},
    step: {},
    activeType: 0,
    stpIndex: 0,
    chatvidsSort: [],
  };
  componentDidMount() {
    this.props.getChatvids();
  }
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };

  handleCheck = (index: number, person: any) => {
    const chatVid = this.props.chatvids[index];
    console.log(index);
    console.log("chatvidbord", chatVid.steps);
    const step = chatVid.steps[0];
    chatVid.steps.map((step: any) => {
      if (step.responseType === "Multiple-Choice") {
        if (step.replies.length > 0) return this.setState({ step: step || {} });
      }
      if (step.responseType === "Open-ended") {
        step.replies?.map((reply: any) => {
          console.log(reply);
          if (reply.type == "text") return this.setState({ activeType: 1 });
          if (reply.type == "audio") return this.setState({ activeType: 2 });
          if (reply.type == "video") return this.setState({ activeType: 3 });
        });
      }
    });

    this.setState({
      selectedChatvid: this.props.chatvids[index],
      selectedPerson: person,
      step: step || {},
      stpIndex: 0,
    });
  };

  setStp = (step: any, stpIndex: number) => {
    this.setState({ step, stpIndex });
    console.log("setstp", step);
    if (step.responseType === "Open-ended") {
      step.replies?.map((reply: any) => {
        console.log(reply);
        if (reply.type == "text") return this.setState({ activeType: 1 });
        if (reply.type == "audio") return this.setState({ activeType: 2 });
        if (reply.type == "video") return this.setState({ activeType: 3 });
      });
    }
  };
  handleTabChange = (activeType: number) => {
    this.setState({ activeType });
  };

  renderResponders = (
    person: any,
    chatName: string,
    date: any,
    ind: number,
    chatvidIndex: number
  ) => {
    const { selectedPerson, selectedChatvid }: any = this.state;
    return (
      <>
        <Grid
          container
          key={ind}
          className={`respondersCardWrapper ${selectedPerson?._id &&
            selectedChatvid?._id &&
            selectedPerson?._id === person?._id &&
            selectedChatvid?._id === this.props.chatvids[chatvidIndex]?._id &&
            "activeResponder"}`}
          onClick={() => {
            this.handleCheck(chatvidIndex, person);
          }}
        >
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="avatarWrapper">
              <PersonOutlineIcon />
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
            <Typography variant="subtitle1" className="responderName">
              {" "}
              {person.name || "Maisha Pace"}{" "}
            </Typography>
            <Typography variant="subtitle1" className="resDetials">
              {" "}
              {`${chatName} - ${date.toLocaleString()}`}{" "}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  };

  renderResponse = (tab: number) => {
    const { step, selectedPerson }: any = this.state;
    const type = tab === 1 ? "text" : tab === 2 ? "audio" : "video";
    const res = step.replies?.filter(
      (reply: any) =>
        reply?.peopleId?._id === selectedPerson._id && reply.type === type
    );
    return (
      <>
        {res.map((r: any, i: number) => {
          return (
            <>
              {type === "text" ? (
                <div style={{ padding: "1%" }}>
                  <Typography variant="body2">{r.text}</Typography>
                </div>
              ) : type === "audio" ? (
                <div>
                  <audio controls>
                    <source src={r.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div style={{ padding: "1%" }}>
                  <video src={r.url} controls width={"100%"} />
                </div>
              )}
            </>
          );
        })}
      </>
    );
  };

  renderChoices = (choice: any, ind: number, repl: any) => {
    const { selectedPerson }: any = this.state;
    const { replies } = choice;
    let isActive = false;
    replies?.filter((reply: any) => {
      if (reply.peopleId === selectedPerson._id) {
        isActive = true;
      }
      return reply;
    });
    return (
      <div className={`_choiceOption ${isActive && "chosed"}`} key={ind}>
        <Typography variant="h5"> {choice.text} </Typography>
      </div>
    );
  };

  render() {
    const {
      selectedChatvid,
      selectedPerson,
      step,
      activeType,
    }: any = this.state;
    return (
      <Home>
        <div className="shuffleButton">
          <button
            className="backButton"
            onClick={() => this.props.mobileViewChatVid("showSideBar")}
          >
            Back
          </button>
        </div>
        <Grid container className="wrapperChatvidDashboard">
          <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4}>
            <div>
              <Typography variant="h6"> Responders </Typography>
            </div>
            {console.log(this.props.chatvids)}

            {this.props.chatvids?.map((chatvid: any, index: number) => {
              let unique: any = {};
              const people = chatvid.people?.filter(
                (person: any) =>
                  !unique[person._id] && (unique[person._id] = person) && person
              );
              return people?.map((person: any, ind: number) => {
                return this.renderResponders(
                  person,
                  chatvid.name,
                  new Date(chatvid.createdAt),
                  ind,
                  index
                );
              });
            })}
          </Grid>
          <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8}>
            {selectedChatvid?.name && (
              <Typography variant="h6">
                {" "}
                Response on{" "}
                {`${selectedChatvid.name} - ${new Date(
                  selectedChatvid.updatedAt
                ).toLocaleString()}`}{" "}
              </Typography>
            )}
            {selectedPerson && (
              <div className="_stepsCirclesWrapper">
                {selectedChatvid?.steps?.map((step: any, ind: number) => {
                  return (
                    <>
                      <div
                        className="stepAvatarWrapper"
                        key={ind}
                        style={{ opacity: this.state.step === step ? 1 : 0.6 }}
                        onClick={() => {
                          this.setStp(step, ind + 1);
                        }}
                      >
                        <Typography variant="h4"> STEP </Typography>
                        <Typography variant="h1"> {ind + 1} </Typography>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
            {step?.responseType && (
              <Grid container className="_stepsDetailsWrapper">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="_stepsDetailsHeader"
                >
                  <div className="_stepTYPEandIcon">
                    <PermMediaIcon />
                    <Typography variant="h3"> {step.responseType} </Typography>
                  </div>
                  <div className="_step_NO">
                    <div className="_whiteCircle"> {this.state.stpIndex} </div>
                  </div>
                </Grid>
                <Grid container className="_stepsDetailsBody">
                  {step.responseType === "Open-ended" && (
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      md={2}
                      lg={2}
                      className="optionDiv"
                      style={{ overflow: "unset" }}
                    >
                      <div
                        className={`IconWrapper ${activeType === 1 &&
                          "activeIcon"}`}
                        onClick={() => {
                          this.handleTabChange(1);
                        }}
                      >
                        <Typography variant="h1">Tt</Typography>
                        <Typography variant="subtitle1"> Text </Typography>
                      </div>
                      <div
                        className={`IconWrapper ${activeType === 2 &&
                          "activeIcon"}`}
                        onClick={() => {
                          this.handleTabChange(2);
                        }}
                      >
                        <VolumeUpRoundedIcon />
                        <Typography variant="subtitle1"> Audio </Typography>
                      </div>
                      <div
                        className={`IconWrapper ${activeType === 3 &&
                          "activeIcon"}`}
                        onClick={() => {
                          this.handleTabChange(3);
                        }}
                      >
                        <VideocamRoundedIcon />
                        <Typography variant="subtitle1"> Video </Typography>
                      </div>
                    </Grid>
                  )}

                  {/*  */}
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    className="_stepsDetailsResWrapper"
                  >
                    {step.responseType === "Open-ended"
                      ? this.renderResponse(activeType)
                      : step.responseType === "Multiple-Choice"
                      ? step.choices.map((choice: any, index: number) => {
                          return this.renderChoices(
                            choice,
                            index,
                            step.replies
                          );
                        })
                      : ""}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Home>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    chatvids: state.chatvids.chatvids,
    mobileView: state.chatvids.mobileViewChatVid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getChatvids: () => dispatch(getChatvids()),
    mobileViewChatVid: (v: any) => dispatch(mobileViewChatVid(v)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
