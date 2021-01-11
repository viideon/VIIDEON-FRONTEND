import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getChatvids,
  getAnalytics,
  deletechatvid,
  mobileViewChatVid,
  emailVideo,
} from "../../Redux/Actions/chatvid";
import classname from "classnames";
import Colors from "../../constants/colors";
import ThemeButton from "../../components/ThemeButton";
import { toast, Flip } from "react-toastify";

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import ShareIcon from "@material-ui/icons/Share";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

import ReplayIcon from "@material-ui/icons/Replay";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Home from "./Home";
import "./chatvidBoard.css";

import ResponderTab from "./chatvidComponents/ResponderTab";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Line } from "react-chartjs-2";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type IProps = {
  history: any;
  user: any;
  chatvid: any;
  mobileView: any;
  deletechatvid: (_id: string, history: any) => void;
  getChatvids: () => void;
  mobileViewChatVid: (v: any) => void;
  emailVideo: (obj: any) => void;
  getAnalytics: (
    _id: string,
    dateFrom: any,
    dateTo: any,
    deviceType: string
  ) => void;
};
function sortByResponse(data: any) {
  let chatvidsorted: any = data.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return chatvidsorted;
}
class Chatvid extends Component<IProps> {
  state = {
    tab: 0,
  };
  url1 = `${process.env.REACT_APP_DOMAIN}/chatvid/res/${this.props.chatvid
    ._id && this.props.chatvid._id}`;
  componentDidMount() {
    // this.props.getChatvids();
    // this.props.getAnalytics(this.props.chatvid._id, new Date(), new Date(), "all");
    // console.log(this.props.chatvid)
  }
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (this.props.chatvid?._id !== nextProps.chatvid?._id) {
      this.setState({ tab: 0 });
    }
  }
  handleTab = (tab: number) => {
    this.setState({ tab });
  };
  render() {
    const { tab } = this.state;
    return (
      <Home>
        <div className="shuffleButton">
          <button
            className="backButton"
            onClick={() => this.props.mobileViewChatVid("showSideBar")}
          >
            <img
              src="/images/backicon.png"
              width="40px"
              height="40px"
              alt="edit"
              style={{}}
            />
          </button>
        </div>
        <InfoHeader {...this.props} />
        <Grid container className="tabsWrapperChatvid">
          <Grid item xs={12} sm={12} md={8} lg={8} className="tabsBTNwrapper">
            <div
              className={classname({
                tabsBTN: true,
                active: tab === 0 ? true : false,
              })}
              onClick={() => this.handleTab(0)}
            >
              Responders
            </div>
            <div
              className={classname({
                tabsBTN: true,
                active: tab === 1 ? true : false,
              })}
              onClick={() => this.handleTab(1)}
            >
              Steps
            </div>
            <div
              className={classname({
                tabsBTN: true,
                active: tab === 2 ? true : false,
              })}
              onClick={() => this.handleTab(2)}
            >
              Metrics
            </div>
          </Grid>
          <Grid item md={4} lg={4} className="replyIconWrapper">
            <ReplayIcon onClick={() => this.props.getChatvids()} />
          </Grid>
        </Grid>

        <Grid container className="chatVidTabsWrapper">
          {tab === 0 ? (
            <ResponderTab {...this.state} {...this.props} />
          ) : tab === 1 ? (
            <StepsTab {...this.state} {...this.props} />
          ) : (
            <Metrics {...this.state} {...this.props} />
          )}
        </Grid>
      </Home>
    );
  }
}

const StepsTab = (props: any) => {
  const [step, setStep]: any = React.useState(undefined);

  const renderStepCard = (props: any, ind: number) => {
    return (
      <Grid
        container
        className={`respondersCardWrapper ${step === props &&
          "activeResponder"}`}
        onClick={() => setStep(props)}
      >
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <div className="stepAvatarWrapper">
            <Typography variant="h4"> STEP </Typography>
            <Typography variant="h1"> {ind + 1} </Typography>
          </div>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
          <Typography variant="subtitle1" className="responderName">
            {props.responseType || "Maisha Pace"}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderReplies = (reply: any, stp: any) => {
    return (
      <Grid container className="replyWrapper_DASH">
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <div className="avatarWrapper">
            <PersonOutlineIcon />
          </div>
          <Typography variant="subtitle1" className="openEndName">
            {reply.peopleId?.name || "Maisha Pace"}
          </Typography>
          <Typography variant="subtitle1" className="openEndDetails">
            {/* {stp.createdAt.toLocaleString()} */}

            {new Date(stp.createdAt).toLocaleString()}
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          lg={10}
          className="replyBodyWrapperContainer"
          style={{
            background: "#ffffff",
            textAlign: reply.type === "text" ? "left" : "center",
          }}
        >
          {reply.type === "text" ? (
            <div style={{ padding: "1%" }}>
              <Typography variant="body2">{reply.text}</Typography>
            </div>
          ) : reply.type === "audio" ? (
            <div>
              <audio controls>
                <source src={reply.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div style={{ padding: "1%" }}>
              <video src={reply.url} controls width={"100%"} />
            </div>
          )}
        </Grid>
      </Grid>
    );
  };

  const renderChoices = (choice: any, participents: number, ind: number) => {
    const { replies } = choice;
    participents = participents > 0 ? participents : 1;
    let percentage = Math.round(
      ((replies ? replies?.length : 0) * 100) / participents
    );
    return (
      <div className={`_choiceOption _stepTabsChoices`} key={ind}>
        {/* <div className="_choiceProgressBar" style={{width:`${percentage}%`, backgroundColor:'red', height:"100%"}}>
        </div>
        <Typography variant="h5"  style={{wid}}> {choice.text} </Typography> */}
        <div
          className={`_choiceProgressBar ${percentage === 100 && "_choicebar"}`}
          style={{ width: `${percentage}%`, backgroundColor: "#f0cc79" }}
        >
          <Typography
            variant="h5"
            style={{ width: "35rem", overflow: "hidden" }}
          >
            {" "}
            {choice.text}{" "}
          </Typography>
        </div>
        <div className="_choicePrcWrapper">
          <div className="_s">
            <Typography variant="h3">{percentage} %</Typography>
          </div>
          <div className="_P">
            <PersonOutlineIcon /> {choice.replies?.length || 0}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4}>
        {props.chatvid?.steps?.map((stp: any, ind: number) => {
          return renderStepCard(stp, ind);
        })}

        <Grid
          container
          className="AddMoreSteps"
          onClick={() =>
            props.history.push(
              `/chatvid/step/${props.chatvid?._id}/${
                props?.chatvid?.steps?.[0]
                  ? props?.chatvid?.steps.length + 1
                  : 0
              }`
            )
          }
        >
          {console.log("steps in chatvid", props?.chatvid?.steps)}
          <AddCircleIcon />
          <Typography variant="subtitle1">Add more steps</Typography>
        </Grid>
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8}>
        {step &&
          step.responseType === "Open-ended" &&
          step.replies.length > 0 &&
          step.replies?.map((reply: any, ind: number) => {
            return renderReplies(reply, step);
          })}
        {step &&
          step.responseType === "Multiple-Choice" &&
          step.choices.map((choice: any, ind: any) => {
            return renderChoices(choice, step.replies.length, ind);
          })}
      </Grid>
    </>
  );
};

const Metrics = (props: any) => {
  const [active, setActive] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate]: any = React.useState(null);
  React.useEffect(() => {
    onTypeChange("all");
  }, []);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    props.getAnalytics(props.chatvid._id, start, end, active ? active : "all");
  };

  const onTypeChange = (type: string) => {
    setActive(type);
    props.getAnalytics(props.chatvid._id, startDate, endDate, type);
  };

  return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4}>
        <Grid
          container
          className={`respondersCardWrapper ${active === "all" &&
            "activeResponder"}`}
          onClick={() => onTypeChange("all")}
        >
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="stepAvatarWrapper">
              <DevicesOtherIcon />
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
            <Typography variant="subtitle1" className="responderName">
              {" "}
              All devices
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          className={`respondersCardWrapper ${active === "desktop" &&
            "activeResponder"}`}
          onClick={() => onTypeChange("desktop")}
        >
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="stepAvatarWrapper">
              <DesktopMacIcon />
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
            <Typography variant="subtitle1" className="responderName">
              {" "}
              Desktop{" "}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          className={`respondersCardWrapper ${active === "tablet" &&
            "activeResponder"}`}
          onClick={() => onTypeChange("tablet")}
        >
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="stepAvatarWrapper">
              <TabletMacIcon />
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
            <Typography variant="subtitle1" className="responderName">
              Tablet
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          className={`respondersCardWrapper ${active === "mobile" &&
            "activeResponder"}`}
          onClick={() => onTypeChange("mobile")}
        >
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="stepAvatarWrapper">
              <PhoneIphoneIcon />
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
            <Typography variant="subtitle1" className="responderName">
              {" "}
              Mobile
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          className={`respondersCardWrapper ${active === "others" &&
            "activeResponder"}`}
          onClick={() => onTypeChange("others")}
        >
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="stepAvatarWrapper">
              <MoreHorizIcon />
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
            <Typography variant="subtitle1" className="responderName">
              {" "}
              Others
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8}>
        <div className="chartBoardContainer">
          <div className="chartBoard">
            <div className="_StatsContainer">
              <Typography variant="subtitle1"> 2% </Typography>
              <Typography variant="h3"> {props.stats.landed || 0} </Typography>
            </div>
            <div className="_statsLabel">
              <Typography variant="h6">Landed</Typography>
            </div>
          </div>
          {/*  Interacted  */}
          <div className="chartBoard">
            <div className="_StatsContainer">
              <Typography variant="subtitle1"> 2% </Typography>
              <Typography variant="h3">
                {" "}
                {props.stats.interacted || 0}{" "}
              </Typography>
            </div>
            <div className="_statsLabel">
              <Typography variant="h6">Interacted</Typography>
            </div>
          </div>
          {/*  Answered  */}
          <div className="chartBoard">
            <div className="_StatsContainer">
              <Typography variant="subtitle1"> 2% </Typography>
              <Typography variant="h3">
                {" "}
                {props.stats.answered || 0}{" "}
              </Typography>
            </div>
            <div className="_statsLabel">
              <Typography variant="h6">Answered</Typography>
            </div>
          </div>
          {/*  Completed  */}
          <div className="chartBoard">
            <div className="_StatsContainer">
              <Typography variant="subtitle1"> 2% </Typography>
              <Typography variant="h3">
                {" "}
                {props.stats.completed || 0}{" "}
              </Typography>
            </div>
            <div className="_statsLabel">
              <Typography variant="h6">Completed</Typography>
            </div>
          </div>
        </div>
        <div className="chartGraphContainer">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <div className="graphContainer">
            {active && <Chart {...props} active={active} />}
          </div>
        </div>
      </Grid>
    </>
  );
};

const Chart = (props: any) => {
  if (props.active === "all") {
    var datasets = [
      {
        label: "Desktop",
        fill: false,
        backgroundColor: "#fdb415",
        borderColor: "#fdb415",
        borderWidth: 2,
        data: props.stats.datasets?.desktop || [],
      },
      {
        label: "Tablet",
        fill: false,
        backgroundColor: "#ff3333",
        borderColor: "#ff3333",
        borderWidth: 3,
        data: props.stats.datasets?.tablet || [],
      },
      {
        label: "Mobile",
        fill: false,
        backgroundColor: "#61b5b3",
        borderColor: "#61b5b3",
        borderWidth: 4,
        data: props.stats.datasets?.mobile || [],
      },
    ];
  } else {
    var datasets = [
      {
        label: `${props.active}`,
        fill: false,
        backgroundColor: "#fdb415",
        borderColor: "#fdb415",
        borderWidth: 2,
        data: props.stats?.datasets[props.active] || [],
      },
    ];
  }
  const state = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'],
    datasets: datasets,
  };

  return (
    <div>
      <Line
        data={state}
        options={{
          // title:{
          //   display:true,
          //   text:'Average Rainfall per month',
          //   fontSize:20
          // },
          // legend:{
          //   display:true,
          //   position:'right'
          // }
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day",
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

const InfoHeader = (props: any) => {
  const handleDeleteChatvid = (chatvid: any) => {
    console.log(props.chatvid._id, chatvid);
    props.deletechatvid(chatvid, props.history);
  };
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { chatvid } = props;
  const url = `${process.env.REACT_APP_DOMAIN}/chatvid/res/${chatvid &&
    chatvid._id}`;
  const title = chatvid.name || " Respond my Chatvid";

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    toast("Url copied to clipboard", {
      autoClose: 1000,
      transition: Flip,
      hideProgressBar: true,
      // className: "toasts",
    });
  };

  const handleChange = (e: any) => setEmail(e.target.value);
  function validateEmail(email: any) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const handleShare = () => {
    console.log("handleShare email", props.user?.email);
    if (!validateEmail(email)) return toast.error("Enter a valid Email");
    props.emailVideo({
      senderEmail: props.user?.email,
      email: email,
      videoThumnail: props.chatvid && props.chatvid.thumbnail,
      videoLink: url,
    });
    setOpen1(false);
    toast.info("Video Shared on Your Email");
  };
  return (
    <>
      <Grid container className="dashChatvidTopHeaderWrapper">
        <Grid
          className="chatVidInfoGrid"
          container
          xs={12}
          sm={12}
          md={8}
          lg={8}
        >
          <Grid className="thumbnail" item xs={2} sm={2} md={2} lg={2}>
            <div className="thumbnailInChatvidHead">
              <img src={chatvid?.thumbnail} alt="thumbnail" />
            </div>
          </Grid>
          <Grid
            className="chatVidShareOptions"
            item
            xs={10}
            sm={10}
            md={8}
            lg={8}
          >
            <Typography
              className="chatvidNameMob"
              style={{ fontSize: "3vw" }}
              variant="h3"
            >
              {" "}
              {chatvid?.name}{" "}
            </Typography>
            <div className="chatvidEditToolsWrapper">
              <div
                onClick={() =>
                  props.history.push(`/chatvids/edit/${chatvid && chatvid._id}`)
                }
                className="mobileIconDiv"
              >
                {" "}
                <EditIcon className="iconsMob" />{" "}
                <span className="iconMobile">Edit Steps </span>
              </div>
              <div
                onClick={() => alert("Feature Coming Soon")}
                className="mobileIconDiv"
              >
                {" "}
                <FileCopyIcon className="iconsMob" />
                <span className="iconMobile"> Duplicate</span>
              </div>
              <div
                onClick={() => alert("Feature Coming Soon")}
                className="mobileIconDiv"
              >
                {" "}
                <SettingsRoundedIcon className="iconsMob" />
                <span className="iconMobile"> Settings</span>
              </div>
              <div
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure? you want to delete this ChatVid?"
                    )
                  ) {
                    handleDeleteChatvid(chatvid._id);
                  }
                }}
                className="mobileIconDiv"
              >
                <DeleteIcon className="iconsMob" />
                <span className="iconMobile"> Delete</span>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid
          className="chatVidInfoShareOptions"
          container
          xs={12}
          sm={12}
          md={4}
          lg={4}
        >
          <div className="sendChatvidBTNWrapper">
            <ThemeButton
              style={Colors.themeGradientBtn}
              name="Send Chatvid"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="copyChatvidURL">
            <Paper component="form" style={classes.root}>
              <IconButton
                style={classes.iconButton1}
                aria-label="copy url"
                onClick={() => copyUrl()}
              >
                {/* <AttachFileIcon /> */}
                <img
                  src="/images/copyicon.png"
                  width="21px"
                  height="20px"
                  alt="edit"
                  style={{}}
                />
              </IconButton>
              <InputBase
                style={classes.input}
                value={url}
                // value={`http://localhost:3000/chatvid/res/${chatvid && chatvid._id}`}
              />
              <IconButton
                type="submit"
                style={classes.iconButton}
                aria-label="edit"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <ShareIcon />
              </IconButton>
            </Paper>
          </div>
        </Grid>

        {/* Dialog */}

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Share on Social Media
          </DialogTitle>
          <DialogContent>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <FacebookShareButton url={url}>
              <FacebookMessengerIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url="" onClick={() => setOpen1(true)}>
              <EmailIcon size={32} round />
            </EmailShareButton>

            <RedditShareButton
              url={url}
              title={title}
              windowWidth={660}
              windowHeight={460}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
          </DialogContent>
        </Dialog>

        {/* Dialog */}
        <Dialog
          open={open1}
          onClose={() => setOpen1(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Share Video</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your Email to Share video
            </DialogContentText>
            <form onChange={handleChange}>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                name="userEmail"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => setOpen1(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => handleShare()}>
              Share
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};
const classes = {
  root: {
    display: "flex",
    marginTop: "1em",
    alignItems: "center",
    width: "100%",
    border: "solid",
    borderWidth: "1px",
    borderColor: "#fdb415",
  },
  input: {
    flex: 1,
    marginLeft: "1em",
    color: "#406c7f",
    fontFamily: "Open Sans",
  },
  iconButton: {
    padding: 13,
    borderRadius: 0,
    background: "#fdb415",
    color: "white",
  },
  iconButton1: {
    padding: 15,
    borderRadius: 0,
    background: "#fdb415",
    color: "white",
  },
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    chatvid: state.chatvids.selectedChatvid,
    stats: state.chatvids.stats,
    mobileView: state.chatvids.mobileViewChatVid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    deletechatvid: (_id: string, history: any) =>
      dispatch(deletechatvid(_id, history)),
    getChatvids: () => dispatch(getChatvids()),
    mobileViewChatVid: (v: any) => dispatch(mobileViewChatVid(v)),
    emailVideo: (obj: any) => dispatch(emailVideo(obj)),
    getAnalytics: (
      _id: string,
      dateFrom: any,
      dateTo: any,
      deviceType: string
    ) => dispatch(getAnalytics(_id, dateFrom, dateTo, deviceType)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Chatvid)
);
