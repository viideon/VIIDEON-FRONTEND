import React from "react";
import { Button } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import "./style.css";

class EmailConfiguration extends React.Component {
  responseGoogle = (response: any) => {
    console.log("response from  google", response);
  };
  render() {
    return (
      <div className="emailConfigWrapper">
        <div className="btnConnectGoogle">
          <GoogleLogin
            clientId={`${process.env.REACT_APP_OAUTH_ID}`}
            render={(renderProps: any) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
              >
                Connect to Gmail
              </Button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          ,
        </div>
      </div>
    );
  }
}

export default EmailConfiguration;
