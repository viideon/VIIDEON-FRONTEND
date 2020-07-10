import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEmailConfigurations } from "../../Redux/Actions/email";
import { logout } from "../../Redux/Actions/auth";
import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "./Dashboard";
import Tooltip from "@material-ui/core/Tooltip";
import Videos from "./Videos";
import CampaignList from "./campaign";
import Contacts from "../Connections/Contacts";
import Configuration from "../Configuration";
import "./styles.css";

type IProps = {
  history: any;
  drawer: boolean;
  getEmailConfigurations: () => void;
  logout: () => void;
};

class Home extends Component<IProps> {
  componentDidMount() {
    this.props.getEmailConfigurations();
  }
  render() {
    const { drawer, logout } = this.props;
    return (
      <div>
        <SideBar history={this.props.history} />
        <div
          className={drawer ? "wrapperHomeContent" : "wrapperHomeContentFull"}
        >
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/campaign" component={CampaignList} />
          <Route exact path="/configuration" component={Configuration} />
          <Route exact path="*" render={() => <Redirect to="/" />} />
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
              <span onClick={() => logout()}>
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
  cursor: "pointer",
};
const mapStateToProps = (state: any) => {
  return {
    drawer: state.drawer.drawer,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmailConfigurations: () => dispatch(getEmailConfigurations()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
