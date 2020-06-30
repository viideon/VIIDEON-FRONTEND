import React from "react";
import { Button, Tooltip, CircularProgress } from "@material-ui/core";
import {
  getEmailConfigurations,
  addEmailConfiguration
} from "../../Redux/Actions/email";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import GoogleLogin from "react-google-login";
import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";

interface IProps {
  getEmailConfigurations: () => void;
  addEmailConfiguration: (code: any) => void;
  emailConfigs: any;
  loading: true;
}
class Configuration extends React.Component<IProps> {
  componentDidMount() {
    this.props.getEmailConfigurations();
  }
  responseGoogle = (response: any) => {
    if (response.code) {
      this.props.addEmailConfiguration(response.code);
    } else {
      toast.error("Authorziation failed try again");
    }
  };
  render() {
    const { emailConfigs, loading } = this.props;
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
            {emailConfigs && emailConfigs.length === 0 && (
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
                buttonText="Connect to Gmail"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                scope={"https://www.googleapis.com/auth/gmail.send"}
                accessType="offline"
                responseType="code"
                prompt="consent"
              />
            )}
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
              {emailConfigs &&
                emailConfigs.map((config: any) => (
                  <tr id={config._id}>
                    <td>Gmail Api</td>
                    <td>{config.userEmail}</td>
                    <td>
                      <button
                        className="squareBtn red"
                        onClick={() => alert("under progress")}
                      >
                        <DeleteIcon fontSize="small" htmlColor="#fff" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="loadingConfigs">
          <span>{loading && <CircularProgress />}</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    emailConfigs: state.email.emailConfigurations,
    loading: state.email.loading
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmailConfigurations: () => dispatch(getEmailConfigurations()),
    addEmailConfiguration: (code: any) => dispatch(addEmailConfiguration(code))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
