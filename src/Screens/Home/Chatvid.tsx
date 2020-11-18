import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getChatvids } from "../../Redux/Actions/chatvid";
import classname from 'classnames';
import Colors from '../../constants/colors';
import ThemeButton from '../../components/ThemeButton'

import { Grid, Typography } from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import AttachFileIcon from '@material-ui/icons/AttachFile';
import ShareIcon from '@material-ui/icons/Share';

import EditIcon from '@material-ui/icons/Edit';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ReplayIcon from '@material-ui/icons/Replay';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Home from "./Home";
import "./chatvidBoard.css";

import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PermMediaIcon from '@material-ui/icons/PermMedia';

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

type IProps = {
  history: any;
  user: any;
  chatvid: any;
  getChatvids: () => void;
};

class Dashboard extends Component<IProps> {
  state = {
    tab: 1,
  };
  componentDidMount() {
    // this.props.getChatvids();
    console.log(this.props.chatvid)
  }
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };

  handleTab = (tab: number) => {
    this.setState({ tab });
  }
  render() {
    const { tab } = this.state;
    return (
      <Home>
        <InfoHeader {...this.props} />
        <Grid container className="tabsWrapperChatvid" >
          <Grid item xs={12} sm={12} md={8} lg={8} className="tabsBTNwrapper">
            <div className={classname({ tabsBTN: true, active: tab === 0 ? true : false })} onClick={() => this.handleTab(0)}>Responders</div>
            <div className={classname({ tabsBTN: true, active: tab === 1 ? true : false })} onClick={() => this.handleTab(1)}>Steps</div>
            <div className={classname({ tabsBTN: true, active: tab === 2 ? true : false })} onClick={() => this.handleTab(2)}>Metrics</div>
          </Grid>
          <Grid item md={4} lg={4} className="replyIconWrapper" >
            <ReplayIcon />
          </Grid>
        </Grid>

        <Grid container className="chatVidTabsWrapper">
          {
            tab === 0 ?
              <ResponderTab {...this.state} {...this.props} />
              :
              tab === 1 ?
                <StepsTab {...this.state} {...this.props} />
                :
                <Metrics {...this.state} {...this.props} />
          }
        </Grid>
      </Home>
    );
  }
}

const ResponderCardMaker = (props: any) => {
  const { isStep } = props;
  let date = new Date(props.createdAt);
  return (
    <Grid container className="respondersCardWrapper" style={{ background: "lightgrey" }}>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        {
          isStep ?
            <div className="stepAvatarWrapper">
              <Typography variant="h4"> STEP </Typography>
              <Typography variant="h1"> {props.stepNo} </Typography>
            </div>
            :
            <div className="avatarWrapper">
              <PersonOutlineIcon />
            </div>
        }
      </Grid>
      <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
        <Typography variant="subtitle1" className="responderName">{(isStep ? props.responseType : props.name) || "Maisha Pace"}</Typography>
        {!isStep &&
          <Typography variant="subtitle1" className="resDetials">
            {`${props.name} - ${date.toLocaleString()}`}
          </Typography>
        }
      </Grid>
    </Grid>
  )
}

const ResponderTab = (props: any) => {
  const [stp, setStp]: any = React.useState(undefined);
  const [resPerson, setPerson] = React.useState("");
  const [activeType, setActiveType] = React.useState(0);

  const renderCard = (chatName: string, userName: string, date: any, _id: string) => {
    date = new Date(date);
    return (
      <Grid container className={`respondersCardWrapper ${resPerson === _id && "activeResponder"}`} style={{ background: "#f2f2f2" }} onClick={() => setPerson(_id)}>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <div className="avatarWrapper">
            <PersonOutlineIcon />
          </div>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
          <Typography variant="subtitle1" className="responderName">{userName || "Maisha Pace"}</Typography>
          <Typography variant="subtitle1" className="resDetials">
            {`${chatName} - ${date.toLocaleString()}`}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const handleTabChange = (number: number) => {
    setActiveType(number)
  }

  const renderResponse = (tab: number) => {
    const type = tab === 1 ? "text" : tab === 2 ? "audio" : "video";
    const res = stp.replies?.filter((reply: any) => reply?.peopleId?._id === resPerson && reply.type === type)
    return (
      <>
        {res.map((r: any, i: number) => {
          return (
            <>
              {
                type === "text" ?
                  <div style={{ padding: "1%" }}><Typography variant="body2" >{r.text}</Typography></div>
                  :
                  type === "audio" ?
                    <div>
                      <audio controls>
                        <source src={r.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    :
                    <div style={{ padding: "1%" }}>
                      <video src={r.url} controls width={"100%"} />
                    </div>
              }
            </>
          )
        })
        }
      </>
    )
  }

  const renderChoices = (choice: any, ind: number, repl: any) => {
    const { replies } = choice
    let isActive = false;
    replies?.filter((reply: any) => { if (reply.peopleId === resPerson) { isActive = true; } return reply });
    return (
      <div className={`_choiceOption ${isActive && 'chosed'}`} key={ind}>
        <Typography variant="h5" > {choice.text} </Typography>
      </div>
    )
  }

  let unique: any = {};
  const responders: any = props.chatvid.people?.filter((person: any, index: number) => { if (!unique[person._id]) { unique[person._id] = person; return person } })
    return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4} >
        <Paper style={{ ...classes.root, overflow: "hidden", height: "36px", border: "none", marginBottom: "3%", background: "#f2f2f2", width: "90%" }}>
          <IconButton
            type="submit"
            style={{ ...classes.iconButton, background: "grey" }}
            aria-label="search chatvid..."
          >
            <LocalOfferIcon />
          </IconButton>
          <InputBase
            style={{ ...classes.input, background: "#f2f2f2" }}
            inputProps={{ "aria-label": "search chatvids" }}
          />
          <IconButton
            type="submit"
            style={{ ...classes.iconButton, background: "#f2f2f2", color: "grey" }}
            aria-label="search chatvid..."
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Paper>
        {responders?.map((person: any, ind: number) => {
          return renderCard(props.chatvid.name, person.name, props.chatvid.createdAt, person._id)
        })}
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8} >
        {resPerson &&
          <div className="_stepsCirclesWrapper">
            {props.chatvid?.steps?.map((step: any, ind: number) => {
              return (
                <>
                  <div className="stepAvatarWrapper" onClick={() => setStp(step)}>
                    <Typography variant="h4"> STEP </Typography>
                    <Typography variant="h1"> {step.stepNo} </Typography>
                  </div>
                </>
              )
            })}
          </div>
        }
        {stp &&
          <Grid container className="_stepsDetailsWrapper">
            <Grid item xs={12} sm={12} md={12} lg={12} className="_stepsDetailsHeader">
              <div className="_stepTYPEandIcon">
                <PermMediaIcon />
                <Typography variant="h3"> {stp.responseType} </Typography>
              </div>
              <div className="_step_NO">
                <div className="_whiteCircle"> {stp.stepNo} </div>
              </div>
            </Grid>
            <Grid container className="_stepsDetailsBody">

              {stp.responseType === "Open-ended" &&
                <Grid item xs={12} sm={2} md={2} lg={2} className="optionDiv">
                  <div className={`IconWrapper ${activeType === 1 && "activeIcon"}`} onClick={() => { handleTabChange(1) }}>
                    <Typography variant="h1">Tt</Typography>
                    <Typography variant="subtitle1"> Text </Typography>
                  </div>
                  <div className={`IconWrapper ${activeType === 2 && "activeIcon"}`} onClick={() => { handleTabChange(2) }}>
                    <VolumeUpRoundedIcon />
                    <Typography variant="subtitle1"> Audio </Typography>
                  </div>
                  <div className={`IconWrapper ${activeType === 3 && "activeIcon"}`} onClick={() => { handleTabChange(3) }}>
                    <VideocamRoundedIcon />
                    <Typography variant="subtitle1"> Video </Typography>
                  </div>
                </Grid>
              }

              {/*  */}
              <Grid item xs={12} sm={8} md={8} lg={8} className="_stepsDetailsResWrapper">
                {stp.responseType === "Open-ended" ?
                  renderResponse(activeType) :
                  stp.responseType === "Multiple-Choice" ?
                    stp.choices.map((choice: any, index: number) => {
                      return renderChoices(choice, index, stp.replies)
                    }) : ""
                }
              </Grid>

            </Grid>
          </Grid>
        }
      </Grid>
    </>
  )
}

const StepsTab = (props: any) => {
  const [step, setStep]: any = React.useState(undefined);

  const renderStepCard = (props: any) => {
    return (
      <Grid container className={`respondersCardWrapper ${step === props && "activeResponder"}`} onClick={() => setStep(props)}>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <div className="stepAvatarWrapper">
            <Typography variant="h4"> STEP </Typography>
            <Typography variant="h1"> {props.stepNo} </Typography>
          </div>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
          <Typography variant="subtitle1" className="responderName">{props.responseType || "Maisha Pace"}</Typography>
        </Grid>
      </Grid>
    )
  }

  const renderReplies = (reply: any, stp: any) => {
    console.log("Reply ::  => ", reply)
    return (
      <Grid container className="replyWrapper_DASH">
        <Grid item xs={2} sm={2} md={2} lg={2} >
          <div className="avatarWrapper">
            <PersonOutlineIcon />
          </div>
          <Typography variant="subtitle1" className="responderName">{reply.peopleId?.name || "Maisha Pace"}</Typography>
          <Typography variant="subtitle1" className="resDetials">
            {stp.createdAt.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} className="replyBodyWrapperContainer" style={{ background: "#ffffff", textAlign: reply.type === "text" ? "left" : "center" }}>
          {
            reply.type === "text" ?
              <div style={{ padding: "1%" }}><Typography variant="body2" >{reply.text}</Typography></div>
              :
              reply.type === "audio" ?
                <div>
                  <audio controls>
                    <source src={reply.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                :
                <div style={{ padding: "1%" }}>
                  <video src={reply.url} controls width={"100%"} />
                </div>
          }
        </Grid>
      </Grid>
    )
  }

  const renderChoices = (choice: any, participents: number, ind: number) => {
    const { replies } = choice;
    participents = participents > 0 ? participents : 1;
    let percentage = Math.round(((replies ? replies?.length : 0) * 100) / participents)
    return (
      <div className={`_choiceOption _stepTabsChoices`} key={ind}>
        <Typography variant="h5" > {choice.text} </Typography>
        <div className="_choicePrcWrapper">
          <div className="_s">
            <Typography variant="h3">
              {percentage} %
            </Typography>
          </div>
          <div className="_P">
            <PersonOutlineIcon /> {choice.replies?.length || 0}
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4} >
        {
          props.chatvid?.steps?.map((stp: any, ind: string) => {
            return renderStepCard(stp);
          })
        }

        <Grid container className="AddMoreSteps" onClick={() => props.history.push(`/chatvid/step/${props.chatvid?._id}`)}>
          <AddCircleIcon />
          <Typography variant="subtitle1">Add more steps</Typography>
        </Grid>


      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8} >
        {step && step.responseType === "Open-ended" && step.replies.length > 0
          && step.replies?.map((reply: any, ind: string) => {
            return renderReplies(reply, step)
          })}
        {step && step.responseType === "Multiple-Choice" &&
          step.choices.map((choice: any, ind: any) => {
            return renderChoices(choice, step.replies.length, ind);
          })
        }
      </Grid>
    </>
  )
}

const Metrics = (props: any) => {
  return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4} >
        <ResponderCardMaker {...props.chatvid} />
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8} >
        <Typography variant="h6"> Response on Chatvid 4 - October 20, 2020 </Typography>
      </Grid>
    </>
  )
}
const InfoHeader = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const { chatvid } = props;
  const url = `${process.env.REACT_APP_DOMAIN}/chatvid/res/${chatvid && chatvid._id}`;
  const title = chatvid.name || " Respond my Chatvid";
  return (
    <Grid container className="dashChatvidTopHeaderWrapper">
      <Grid container xs={12} sm={12} md={8} lg={8} >
        <Grid item xs={1} sm={1} md={2} lg={2} >
          <div className="thumbnailInChatvidHead">
            <img src={chatvid?.thumbnail} alt="thumbnail" />
          </div>
        </Grid>
        <Grid item xs={10} sm={10} md={8} lg={8} >
          <Typography variant="h3"> {chatvid?.name} </Typography>
          <div className="chatvidEditToolsWrapper">
            <div> <EditIcon /> Edit </div>
            <div> <SettingsRoundedIcon /> Settings</div>
            <div> <SwapCallsIcon /> Connect</div>
            <div> <FileCopyIcon /> Export</div>
          </div>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={4} lg={4} >
        <div className="sendChatvidBTNWrapper">
          <ThemeButton style={Colors.themeGradientBtn} name="Send Chatvid" />
        </div>
        <div className="copyChatvidURL">
          <Paper component="form" style={classes.root}>
            <IconButton
              type="submit"
              style={classes.iconButton}
              aria-label="edit"
            // onClick={this.copyUrl}
            >
              <AttachFileIcon />
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
              onClick={(e) => { e.preventDefault(); setOpen(true) }}
            >
              <ShareIcon />
            </IconButton>
          </Paper>
        </div>
      </Grid>

      {/* Dialog */}

      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Share on Social Media</DialogTitle>
        <DialogContent>
          <TwitterShareButton url={url} >
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
          <EmailShareButton
            url={url}
            subject={title}
            body="body"
          >
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


    </Grid>
  )
}
const classes = {
  root: {
    display: "flex",
    marginTop: "1em",
    alignItems: "center",
    width: "100%",
    border: "solid",
    borderWidth: "1px",
    borderColor: "#fdb415"
  },
  input: {
    flex: 1,
    marginLeft: "1em",
    color: "#406c7f",
    fontFamily: "Open Sans"
  },
  iconButton: {
    padding: 10,
    borderRadius: 0,
    background: "#fdb415",
    color: "white"
  }
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    chatvid: state.chatvids.selectedChatvid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getChatvids: () => dispatch(getChatvids()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
