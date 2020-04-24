import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../SearchBar";
import avatar from "../../assets/profileImages/profileImg.png";
import { AuthState, User } from "../../Redux/Types/auth";
import { UserProfile } from "../../Redux/Types/profile";
import { logout } from "../../Redux/Actions/auth";
import "./style.css";

type IProps = {
  history: any;
  auth: AuthState;
  drawer: boolean;
  user: UserProfile;
  logout: (user: object) => void;
};
type IState = {};
class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  logout = () => {
    this.props.logout(this.props.auth);
  };
  render() {
    console.log("props", this.props);
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
                <span className="nameInfo">{user.userName}</span>
                <span className="contactInfo">{user.email}</span>
              </span>
            </div>
          )}
          <SearchBar />
        </div>
        <div
          className="OptionIcons dashboardOption"
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          <i className="fas fa-tachometer-alt dashboard" style={iconStyle} />
          <span className="IconNameStyling">Dashboard</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div
          className="OptionIcons"
          onClick={() => this.props.history.push("/videos")}
        >
          <i className="fab fa-microsoft" style={iconStyle} />
          <span className="IconNameStyling">My Videos</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => alert("Under Progress")}>
          <i className="fa fa-envelope" style={iconStyle} />
          <span className="IconNameStyling">My Messages</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => alert("Under Progress")}>
          <i className="fas fa-chart-pie" style={iconStyle} />
          <span className="IconNameStyling">My Stats</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

        <div
          className="OptionIcons assetLibrary"
          onClick={() => alert("Under Progress")}
        >
          <i className="fas fa-folder" style={iconStyle} />
          <span className="IconNameStyling">Asset Library</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

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
    auth: state.auth,
    user: state.profile.user,
    drawer: state.drawer.drawer
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (user: User) => dispatch(logout(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
