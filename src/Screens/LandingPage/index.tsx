import React from "react";
import { Link } from "react-router-dom";
import {Grid} from "@material-ui/core";
import "./style.css";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="wrapperLandingPage">
        <div className="headerLandingPage">
          <span></span>
          <h3 className="logoLanding">videonPRO</h3>
          <div>
            <span>
              <Link to="/login">Login</Link>
            </span>
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </div>
        </div>
<Grid container>
<Grid item xs={12} md={8}></Grid>
<Grid item xs={12} md={4}></Grid>
</Grid>
      </div>
    );
  }
}
export default LandingPage;
