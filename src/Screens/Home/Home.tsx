import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEmailConfigurations } from "../../Redux/Actions/email";
import { getAssets } from "../../Redux/Actions/asset";
import { logout } from "../../Redux/Actions/auth";
import SideBar from "../../components/SideBar/SideBar";
import Tooltip from "@material-ui/core/Tooltip";
import "./styles.css";
import LogoutModal from "../../components/Modals/logout";
type IProps = {
  history?: any;
  drawer: boolean;
  getEmailConfigurations: () => void;
  logout: () => void;
  location?: any;
  getAssets: () => void;
};

class Home extends Component<IProps> {
  componentDidMount() {
    this.props.getEmailConfigurations();
    this.props.getAssets();
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
      <div>
        <SideBar history={this.props.history} location={this.props.location} />
        <LogoutModal
          open={this.state.logoutModal}
          toggle={this.toggleLogoutModal}
          logout={logout}
        />
        <div
          className={drawer ? "wrapperHomeContent" : "wrapperHomeContentFull"}
        >
          {this.props.children}
        </div>
        <div className="footerDashboard">
          <div className="navFooterIcons">
            <Link
              to="/profile"
              className="link-style"
              style={{ color: "black" }}
            >
              <Tooltip title="Profile">
                <span>
                  <i className="fas fa-cog" style={iconStyle}></i>
                </span>
              </Tooltip>
            </Link>
            <Tooltip title="Under Progress">
              <span>
                <i className="fas fa-envelope" style={iconStyle}></i>
              </span>
            </Tooltip>
            <Tooltip title="Log out">
              <span onClick={() => this.toggleLogoutModal()}>
                <i className="fas fa-power-off" style={iconStyle}></i>
              </span>
            </Tooltip>
          </div>
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
    getAssets: () => dispatch(getAssets())
  };
};

export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
