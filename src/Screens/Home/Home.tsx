import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getEmailConfigurations } from "../../Redux/Actions/email";
import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import Contacts from "../Connections/Contacts";
import Configuration from "../Configuration";
import "./styles.css";

type IProps = {
  history: any;
  drawer: boolean;
  getEmailConfigurations: () => void;
};

class Home extends Component<IProps> {
  componentDidMount() {
    this.props.getEmailConfigurations();
  }
  render() {
    const { drawer } = this.props;
    return (
      <div>
        <SideBar history={this.props.history} />
        <div
          className={drawer ? "wrapperHomeContent" : "wrapperHomeContentFull"}
        >
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/configuration" component={Configuration} />
          <Route exact path="*" render={() => <Redirect to="/" />} />
        </div>
        <div className="footerDashboard">
          <div className="navFooterIcons">
            <span>
              <i className="fas fa-cog" />
            </span>
            <span>
              <i className="fas fa-envelope" />
            </span>
            <span>
              <i className="fas fa-power-off" />
            </span>
          </div>
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
    getEmailConfigurations: () => dispatch(getEmailConfigurations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
