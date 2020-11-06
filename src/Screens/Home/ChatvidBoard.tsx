import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getChatvids } from "../../Redux/Actions/chatvid";

import { Grid, Typography } from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Home from "./Home";

import "./chatvidBoard.css";
type IProps = {
  history: any;
  user: any;
  getChatvids: () => void;
};

class Dashboard extends Component<IProps> {
  state = {
    showDashboard: true,
    showVideos: false
  };
  componentDidMount() {
    this.props.getChatvids();
  }
  navigate = (show?: string) => {
    this.props.history.push({ pathname: "/video/create", show: show });
  };
  render() {
    const { user } = this.props;
    return (
      <Home>
        <Grid container className="wrapperChatvidDashboard">
          <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4} >
            <div>
              <Typography variant="h6"> Responders </Typography>
            </div>
            <Grid container className="respondersCardWrapper">
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <div className="avatarWrapper">
                  <PersonOutlineIcon />
                </div>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
                <Typography variant="subtitle1" className="responderName">Maisha Pace</Typography>
                <Typography variant="subtitle1" className="resDetials">29 Oct via Chatvid 4 - October 20, 2020</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8} >
            <Typography variant="h6"> Response on Chatvid 4 - October 20, 2020 </Typography>

          </Grid>
        </Grid>
      </Home>
    );
  }
}

const iconStyle = {
  fontSize: "50px",
  cursor: "pointer",
  color: "#FFFFFF"
};
const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    chatvids: state.chatvids.chatvids,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getChatvids: () => dispatch(getChatvids()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
