import React, { Component } from "react";
import { connect } from "react-redux";
// import SearchBar from "../SearchBar";
import avatar from "../../assets/profileImages/profileImg.png";
import { UserProfile } from "../../Redux/Types/profile";
// import Tooltip from "@material-ui/core/Tooltip";
import "./style.css";

type IProps = {
  history: any;
  location: any;
  drawer: boolean;
  user: UserProfile;
};
type IState = { activeTab: string };
class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { activeTab: "/" };
  }

  handleChangeTab = (path: string) => {
    this.setState({ activeTab: path });
    this.props.history.push(path);
  };
  render() {
    const { user } = this.props;
    const { drawer } = this.props;
    var activeSideBar = this.state.activeTab;
    if (this.props.location.pathname !== activeSideBar) {
      activeSideBar = this.props.location.pathname;
    }
    return (
      <div className={drawer ? "MainDrawer" : "MainDrawerHide"}>
        <div className="wrapperProfileSidebar">
          {user && (
            <div className="wrapperDetails">
              <span className="wrapperAvatarSidebar">
                <img
                  src={user.url ? user.url : avatar}
                  className="avatarSidebar"
                  alt="avatar"
                />
              </span>
              <span className="infoProfile">
                <span className="nameInfo">{`${user.firstName} ${user.lastName}`}</span>
                <span className="contactInfo">{user.email}</span>
              </span>
            </div>
          )}
          {/* <SearchBar /> */}
        </div>
        <div
          className="OptionIcons dashboardOption"
          onClick={() => {
            this.handleChangeTab("/");
          }}
          style={{
            backgroundColor:
              activeSideBar === "/" ? "rgb(34, 185, 255) " : undefined
          }}
        >
          <i className="fas fa-tachometer-alt dashboard" style={iconStyle} />
          <span className="IconNameStyling">Dashboard</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/videos")}
          style={{
            backgroundColor:
              activeSideBar === "/videos" ? "rgb(34, 185, 255) " : undefined
          }}
        >
          <i className="fab fa-microsoft" style={iconStyle} />
          <span className="IconNameStyling">My Videos</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        {/* <Tooltip title="Under Progress" enterDelay={0}>
          <div className="OptionIcons" onClick={() => alert("Under Progress")}>
            <i className="fa fa-envelope" style={iconStyle} />
            <span className="IconNameStyling">My Messages</span>
            <i className="fas fa-angle-left" style={arrowIcon}></i>
          </div>
        </Tooltip> */}
        {/* <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/contacts")}
          style={{
            backgroundColor:
              activeSideBar === "/contacts" ? "rgb(34, 185, 255) " : undefined
          }}
        >
          <i className="far fa-address-book" style={iconStyle} />
          <span className="IconNameStyling">Connections</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div> */}
        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/campaign")}
          style={{
            backgroundColor:
              activeSideBar === "/campaign" ? "rgb(34, 185, 255) " : undefined
          }}
        >
          <i className="far fa-flag" style={iconStyle} />
          <span className="IconNameStyling">Campaigns</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/configuration")}
          style={{
            backgroundColor:
              activeSideBar === "/configuration"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
        >
          <i className="fas fa-users-cog" style={iconStyle} />
          <span className="IconNameStyling">Configuration</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

        <div
          className="OptionIcons"
          style={{
            backgroundColor:
              activeSideBar === "/assetlibrary"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
          onClick={() => this.handleChangeTab("/assetlibrary")}
        >
          <i className="fas fa-folder" style={iconStyle} />
          <span className="IconNameStyling">Asset Library</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/music")}
          style={{
            backgroundColor:
              activeSideBar === "/music" ? "rgb(34, 185, 255) " : undefined
          }}
        >
          <i className="far fa-play-circle" style={iconStyle} />
          <span className="IconNameStyling">Music</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
      </div>
    );
  }
}
const iconStyle = {
  fontSize: "14px",
  width: "1.5em",
  display: "inline-block",
  color: "#b4bcc8"
};
const arrowIcon = {
  marginLeft: "auto",
  marginRight: "12px"
};
const mapStateToProps = (state: any) => {
  return {
    user: state.profile.user,
    drawer: state.drawer.drawer
  };
};

export default connect(mapStateToProps)(SideBar);
