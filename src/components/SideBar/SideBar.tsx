import React, { Component } from "react";
import { connect } from "react-redux";
// import SearchBar from "../SearchBar";
import avatar from "../../assets/profileImages/profileImg.png";
import { UserProfile } from "../../Redux/Types/profile";
// import Tooltip from "@material-ui/core/Tooltip";
import LogoutModal from "../Modals/logout";
import { logout } from "../../Redux/Actions/auth";
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
    this.state = { activeTab: "/", logoutModal: false };
  }

  logout = () => {
    this.props.logout();
  };
  toggleLogoutModal = () => {
    this.setState({ logoutModal: !this.state.logoutModal });
  };
  componentDidMount() {}
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
        <LogoutModal
          open={this.state.logoutModal}
          toggle={this.toggleLogoutModal}
          logout={this.logout}
        />
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
        {/* <Tooltip title="Under Progress" enterDelay={0}>
          <div className="OptionIcons" onClick={() => alert("Under Progress")}>
            <i className="fas fa-chart-pie" style={iconStyle} />
            <span className="IconNameStyling">My Stats</span>
            <i className="fas fa-angle-left" style={arrowIcon}></i>
          </div>
        </Tooltip> */}

        <div
          className="OptionIcons"
          style={{
            backgroundColor:
              activeSideBar === "/assets" ? "rgb(34, 185, 255) " : undefined
          }}
          onClick={() => this.handleChangeTab("/assets")}
        >
          <i className="fas fa-folder" style={iconStyle} />
          <span className="IconNameStyling">Asset Library</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

        {/* <div className="OptionIcons" onClick={this.toggleLogoutModal}>
          <i className="fa fa-user-circle-o" style={iconStyle} />
          <span className="IconNameStyling">Logout</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div> */}
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
