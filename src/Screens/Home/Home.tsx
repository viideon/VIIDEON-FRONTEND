import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmailConfigurations } from "../../Redux/Actions/email";
import { getAssets, getMusicAsset } from "../../Redux/Actions/asset";
import { logout } from "../../Redux/Actions/auth";
import SideBar from "../../components/SideBar/SideBar";
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
    return (
      <div className="videonAppWrapper">
        <Header />
        <SideBar
          history={this.props.history}
          location={this.props.location}
          logout={logout}
        />
        <div
          className={drawer ? "wrapperHomeContent" : "wrapperHomeContentFull"}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
const iconStyle = {
  cursor: "pointer"
};
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
