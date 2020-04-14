import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthState, User } from "../../Redux/Types/auth";
import { logout } from "../../Redux/Actions/auth";
import "./style.css";

type IProps = {
  history: any;
  auth: AuthState;
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
    return (
      <>
        <div className="MainDrawer">
          <div
            className="OptionIcons"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            <i className="fa fa-fw fa-home" style={iconStyle} />
            <h4 className="IconNameStyling">Dashboard</h4>
          </div>
          <div
            className="OptionIcons"
            onClick={() => {
              alert(
                "Under Progress ,click a recorded  video to move to video tab"
              );
            }}
          >
            <i className="fa fa-fw fa-video" style={iconStyle} />
            <h4 className="IconNameStyling">Videos</h4>
          </div>
          <div
            className="OptionIcons"
            onClick={() => {
              this.props.history.push("/profile");
            }}
          >
            <i className="fa fa-user-o" style={iconStyle} />
            <h4 className="IconNameStyling">Profile</h4>
          </div>
          <div
            className="OptionIcons"
            onClick={() => {
              this.props.history.push("/video/create");
            }}
          >
            <i className="fa fa-camera-retro fa-lg" style={iconStyle} />
            <h4 className="IconNameStyling">Upload Video</h4>
          </div>
          <div
            className="OptionIcons"
            onClick={() => {
              alert("Feature not created yet");
            }}
          >
            <i className="fa fa-fw fa-feed" style={iconStyle} />
            <h4 className="IconNameStyling">Connections</h4>
          </div>
          <div className="OptionIcons">
            <i className="fa fa-user-circle-o" style={iconStyle} />
            <h4 className="IconNameStyling" onClick={this.logout}>
              Logout
            </h4>
          </div>
        </div>
      </>
    );
  }
}
const iconStyle = {
  fontSize: "1.20em",
  width: "1.5em",
  display: "inline-block",
  color: "#b4bcc8"
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (user: User) => dispatch(logout(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
