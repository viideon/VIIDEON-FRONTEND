import React, { Component } from "react";
import { connect } from "react-redux";
import { UserProfile } from "../../Redux/Types/profile";
import classname from "classnames";

import "./style.css";

type IProps = {
  history: any;
  location: any;
  drawer: boolean;
  user: UserProfile;
  logout: () => void;
};
type IState = { activeTab: string; logoutModal: boolean };
class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "/",
      logoutModal: false
    };
  }

  handleChangeTab = (path: string) => {
    this.setState({ activeTab: path });
    this.props.history.push(path);
  };

  toggleLogoutModal = () => {
    this.setState({ logoutModal: !this.state.logoutModal });
  };
  render() {
    const { drawer } = this.props;
    var activeSideBar = this.state.activeTab;
    if (this.props.location.pathname !== activeSideBar)
      activeSideBar = this.props.location.pathname;
    return (
      <div className={drawer ? "MainDrawer" : "MainDrawerHide"}>
        <div
          className={classname({
            OptionIcons: true,
            dashboardOption: true,
            activeSideBar: activeSideBar === "/"
          })}
          onClick={() => {
            this.handleChangeTab("/");
          }}
        >
          <i className="fas fa-tachometer-alt dashboard" style={iconStyle} />
          <span className="IconNameStyling">Dashboard</span>
        </div>
        <div
          className={classname({
            OptionIcons: true,
            dashboardOption: true,
            activeSideBar: activeSideBar === "/chatvids"
          })}
          onClick={() => {
            this.handleChangeTab("/chatvids");
          }}
        >
          <i className="fas fa-tachometer-alt dashboard" style={iconStyle} />
          <span className="IconNameStyling">Switch to chatvid</span>
        </div>
        <div
          className={classname({
            OptionIcons: true,
            activeSideBar: activeSideBar === "/videos"
          })}
          onClick={() => this.handleChangeTab("/videos")}
        >
          <i className="fab fa-microsoft" style={iconStyle} />
          <span className="IconNameStyling">My Videos</span>
        </div>
        {/* <Tooltip title="Under Progress" enterDelay={0}>
          <div className={classname({"OptionIcons": true, "activeSideBar": activeSideBar === "/"})} onClick={() => alert("Under Progress")}>
            <i className="fa fa-envelope" style={iconStyle} />
            <span className="IconNameStyling">My Messages</span>
          </div>
        </Tooltip> */}
        {/* <div className={classname({"OptionIcons": true, "activeSideBar": activeSideBar === "/contacts"})} onClick={() => this.handleChangeTab("/contacts")}>
          <i className="far fa-address-book" style={iconStyle} />
          <span className="IconNameStyling">Connections</span>
        </div> */}
        <div
          className={classname({
            OptionIcons: true,
            activeSideBar: activeSideBar === "/campaign"
          })}
          onClick={() => this.handleChangeTab("/campaign")}
        >
          <i className="far fa-flag" style={iconStyle} />
          <span className="IconNameStyling">Campaigns</span>
        </div>
        <div
          className={classname({
            OptionIcons: true,
            activeSideBar: activeSideBar === "/configuration"
          })}
          onClick={() => this.handleChangeTab("/configuration")}
        >
          <i className="fas fa-users-cog" style={iconStyle} />
          <span className="IconNameStyling">Configuration</span>
        </div>

        <div
          className={classname({
            OptionIcons: true,
            activeSideBar: activeSideBar === "/assetlibrary"
          })}
          onClick={() => this.handleChangeTab("/assetlibrary")}
        >
          <i className="fas fa-folder" style={iconStyle} />
          <span className="IconNameStyling">Asset Library</span>
        </div>

        <div
          className={classname({
            OptionIcons: true,
            activeSideBar: activeSideBar === "/music"
          })}
          onClick={() => this.handleChangeTab("/music")}
        >
          <i className="far fa-play-circle" style={iconStyle} />
          <span className="IconNameStyling">Music</span>
        </div>
      </div>
    );
  }
}
const iconStyle = {
  fontSize: "14px",
  width: "1.5em",
  display: "inline-block",
  color: "#FFFFFF",
  cursor: "pointer"
};
const mapStateToProps = (state: any) => {
  return {
    user: state.profile.user,
    drawer: state.drawer.drawer
  };
};

export default connect(mapStateToProps)(SideBar);
