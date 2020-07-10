import React, { Component } from "react";
import { connect } from "react-redux";
// import SearchBar from "../SearchBar";
import avatar from "../../assets/profileImages/profileImg.png";
import { UserProfile } from "../../Redux/Types/profile";
import Tooltip from "@material-ui/core/Tooltip";
import { logout } from "../../Redux/Actions/auth";
import "./style.css";

type IProps = {
  history: any;
  drawer: boolean;
  user: UserProfile;
  logout: () => void;
};
type IState = { activeTab: string };
class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { activeTab: "dashboard" };
  }

  logout = () => {
    this.props.logout();
  };
  handleChangeTab = (path: string, title: string) => {
    this.setState({ activeTab: title });
    this.props.history.push(path);
  };
  render() {
    const { user } = this.props;
    const { drawer } = this.props;

    return (
      <div className={drawer ? "MainDrawer" : "MainDrawerHide"}>
        <div className="wrapperProfileSidebar">
          {user && (
            <div className="wrapperDetails">
              <img
                src={user.url ? user.url : avatar}
                className="avatarSidebar"
                alt="avatar"
              />
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
            this.handleChangeTab("/", "dashboard");
          }}
          style={{
            backgroundColor:
              this.state.activeTab === "dashboard"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
        >
          <i className="fas fa-tachometer-alt dashboard" style={iconStyle} />
          <span className="IconNameStyling">Dashboard</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/videos", "myVideos")}
          style={{
            backgroundColor:
              this.state.activeTab === "myVideos"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
        >
          <i className="fab fa-microsoft" style={iconStyle} />
          <span className="IconNameStyling">My Videos</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <Tooltip title="Under Progress" enterDelay={0}>
          <div className="OptionIcons" onClick={() => alert("Under Progress")}>
            <i className="fa fa-envelope" style={iconStyle} />
            <span className="IconNameStyling">My Messages</span>
            <i className="fas fa-angle-left" style={arrowIcon}></i>
          </div>
        </Tooltip>
        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/contacts", "contacts")}
          style={{
            backgroundColor:
              this.state.activeTab === "contacts"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
        >
          <i className="far fa-address-book" style={iconStyle} />
          <span className="IconNameStyling">Connections</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div
          className="OptionIcons"
          onClick={() => this.handleChangeTab("/campaign", "campaign")}
          style={{
            backgroundColor:
              this.state.activeTab === "campaign"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
        >
          <i className="far fa-flag" style={iconStyle} />
          <span className="IconNameStyling">Campaigns</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div
          className="OptionIcons"
          onClick={() =>
            this.handleChangeTab("/configuration", "configuration")
          }
          style={{
            backgroundColor:
              this.state.activeTab === "configuration"
                ? "rgb(34, 185, 255) "
                : undefined
          }}
        >
          <i className="fas fa-users-cog" style={iconStyle} />
          <span className="IconNameStyling">Configuration</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <Tooltip title="Under Progress" enterDelay={0}>
          <div className="OptionIcons" onClick={() => alert("Under Progress")}>
            <i className="fas fa-chart-pie" style={iconStyle} />
            <span className="IconNameStyling">My Stats</span>
            <i className="fas fa-angle-left" style={arrowIcon}></i>
          </div>
        </Tooltip>
        <Tooltip title="Under Progress" enterDelay={0}>
          <div
            className="OptionIcons assetLibrary"
            onClick={() => alert("Under Progress")}
          >
            <i className="fas fa-folder" style={iconStyle} />
            <span className="IconNameStyling">Asset Library</span>
            <i className="fas fa-angle-left" style={arrowIcon}></i>
          </div>
        </Tooltip>

        <div className="OptionIcons" onClick={this.logout}>
          <i className="fa fa-user-circle-o" style={iconStyle} />
          <span className="IconNameStyling">Logout</span>
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
