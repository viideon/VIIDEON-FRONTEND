import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "./style.css";

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="headerLandingPage">
          <div className="portionHeaderLanding"></div>
          <div className="portionHeaderLanding logoHeaderLanding">
            <h3 className="logoLanding">videonPRO</h3>
          </div>
          <div className="portionHeaderLanding linksHeaderLanding">
            <div>
              <span className="loginLinkLanding">
                <Link to="/login" id="linkLanding">
                  Login
                </Link>
              </span>
              <span>
                <Link to="/signup" style={linkStyle} id="linkLanding">
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div style={{ padding: "100px" }}>
          <Grid container>
            <Grid item xs={12} md={7}>
              <div className="headingLandingPage">
                <h1>VideonPro</h1>
                <p>
                  videonPro lets you record video and create video campaigns on
                  the go. You can send and share these campaigns to reach out to
                  your audience and create opportunities for your self or your
                  business.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              {/* <div className="imgLandingPage"></div> */}
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const linkStyle = {
  textDecoration: "none"
};
export default LandingPage;
