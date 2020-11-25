import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classname from "classnames";
import { getEmailConfigurations } from "../../Redux/Actions/email";
import { getAssets, getMusicAsset } from "../../Redux/Actions/asset";
import { logout } from "../../Redux/Actions/auth";
import SideBar from "../../components/SideBar/SideBar";
import ChatVidBar from '../../components/SideBar/chatvidBar'
// import Tooltip from "@material-ui/core/Tooltip";
// import LogoutModal from "../../components/Modals/logout";
import Header from "../../components/Header/Header";
import "./styles.css";
type IProps = {
  history?: any;
  drawer: boolean;
  getEmailConfigurations: () => void;
  logout: () => void;
  location?: any;
  getAssets: () => void;
  getMusicAsset: () => void;
};

class Home extends Component<IProps> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getEmailConfigurations();
    this.props.getAssets();
    this.props.getMusicAsset();
  }
  state = {
    logoutModal: false
  };
  toggleLogoutModal = () => {
    this.setState({ logoutModal: !this.state.logoutModal });
  };
  render() {
    const { drawer, logout } = this.props;
    const isChatvid = (this.props.history.location.pathname.indexOf("/chatvids")) > -1 ? true : false;
    return (
      <div className={classname({ videonAppWrapper: isChatvid ? false : true, videonChatvidAppWrapper: isChatvid })}>
        <Header />
        {
          !isChatvid ?
            <SideBar
              history={this.props.history}
              location={this.props.location}
              logout={logout}
            />
            :
            <ChatVidBar
              history={this.props.history}
              location={this.props.location}
              logout={logout}
            />
        }
        <div
          className={drawer ? "wrapperHomeContent" : "wrapperHomeContentFull"}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    drawer: state.drawer.drawer
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmailConfigurations: () => dispatch(getEmailConfigurations()),
    logout: () => dispatch(logout()),
    getAssets: () => dispatch(getAssets()),
    getMusicAsset: () => dispatch(getMusicAsset())
  };
};

export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
