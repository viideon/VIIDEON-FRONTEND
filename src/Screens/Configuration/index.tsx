import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";

class Configuration extends React.Component {
  responseGoogle = (response: any) => {
    console.log("response from  google", response);
  };
  render() {
    return (
      <div className="emailConfigWrapper">
        <div className="titleContacts">
          <div className="caption">
            <span className="heading">Configure Email </span>
            <span className="headingTooltip">
              <Tooltip
                title="connect your gmail account to send email's on your behalf"
                placement="right-start"
                arrow
              >
                <HelpIcon />
              </Tooltip>
            </span>
          </div>
          <div className="connectAccount">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_OAUTH_ID}`}
              render={(renderProps: any) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  variant="contained"
                  style={{
                    backgroundColor: "#e7505a",
                    color: "#fff"
                  }}
                >
                  Connect to Gmail
                </Button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="tableConfigWrapper">
          <table className="tableConfig">
            <thead>
              <tr>
                <th>Provider</th>
                <th>From</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Gmail Api</td>
                <td>basitdev850@gmail.com</td>
                <td>
                  <button className="squareBtn red">
                    <DeleteIcon fontSize="small" htmlColor="#fff" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Configuration;
