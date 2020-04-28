import React, { Component } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Route,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./styles.css";
import Dashboard from "./Dashboard";
import Videos from "./Videos";

type IProps = {
  history: any;
  drawer: boolean;
};

class Home extends Component<IProps> {
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

export default connect(mapStateToProps)(Home);
