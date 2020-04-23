import React, { Component } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Route } from "react-router-dom";
import "./styles.css";
import Dashboard from "./Dashboard";
import Videos from "./Videos";

type IProps = {
  history: any;
};

class Home extends Component<IProps> {
  render() {
    return (
      <div>
        <SideBar history={this.props.history} />
        <div className="wrapperHomeContent">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/videos" component={Videos} />
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

export default Home;
