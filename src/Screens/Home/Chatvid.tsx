import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getChatvids } from "../../Redux/Actions/chatvid";
import classname from 'classnames';
import Colors from '../../constants/colors';
import ThemeButton from '../../components/ThemeButton'

import { Grid, Typography, CardMedia } from "@material-ui/core";
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

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Home from "./Home";
import "./chatvidBoard.css";
type IProps = {
  history: any;
  user: any;
  chatvid: any;
  getChatvids: () => void;
};

class Dashboard extends Component<IProps> {
  state = {
    tab: 0,
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
    const { chatvid } = this.props;
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
        <ResponderCardMaker {...props.chatvid} />
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8} >
        <Typography variant="h6"> Response on Chatvid 4 - October 20, 2020 </Typography>
      </Grid>
    </>
  )
}

const StepsTab = (props: any) => {
  return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4} >
        {
          props.chatvid?.steps?.map((vid: any, ind: string) => {
            return (
              <ResponderCardMaker isStep={true} {...vid} name={props.chatvid.name} created={props.chatvid.createdAt} />
            )
          })
        }
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8} >
        <Typography variant="h6"> Response on Chatvid 4 - October 20, 2020 </Typography>
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
  const { chatvid } = props;
  return (
    <Grid container className="dashChatvidTopHeaderWrapper">
      <Grid container xs={12} sm={12} md={8} lg={8} >
        <Grid item xs={1} sm={1} md={2} lg={2} >
          <div className="thumbnailInChatvidHead">
            <img src={chatvid?.thumbnail} />
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
              value={`${process.env.REACT_APP_DOMAIN}/chatvid/res/${chatvid && chatvid._id}`}
              // value={`http://localhost:3000/chatvid/res/${chatvid && chatvid._id}`}
            />
            <IconButton
              type="submit"
              style={classes.iconButton}
              aria-label="edit"
            // onClick={this.copyUrl}
            >
              <ShareIcon />
            </IconButton>
          </Paper>
        </div>
      </Grid>
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
