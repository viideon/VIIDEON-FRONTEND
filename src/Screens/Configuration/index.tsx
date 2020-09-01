import React from "react";
import Home from "../Home/Home";
import { Button, Tooltip, CircularProgress } from "@material-ui/core";
import {
  getEmailConfigurations,
  addEmailConfiguration,
  deleteEmailConfig
} from "../../Redux/Actions/email";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/Reusable/DeleteDialogGeneric";
import GoogleLogin from "react-google-login";
import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";

interface IProps {
  getEmailConfigurations: () => void;
  addEmailConfiguration: (code: any) => void;
  deleteEmailConfig: (id: any) => void;
  showDeleteDialog: boolean;
  isDeleting: boolean;
  emailConfigs: any;
  loading: boolean;
}
class Configuration extends React.Component<IProps> {
  state = {
    deleteDialog: false
  };
  componentDidMount() {
    this.props.getEmailConfigurations();
  }
  static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.showDeleteDialog === false) {
      return { deleteDialog: false };
    } else return null;
  }
  responseGoogle = (response: any) => {
    if (response.code) {
      this.props.addEmailConfiguration(response.code);
    }
  };
  handleLoginFailure = (response: any) => {
    if (response.error !== "popup_closed_by_user") {
      toast.error("Failed to authorize , please try again");
    }
  };
  openDeleteDialog = () => {
    this.setState({ deleteDialog: true });
  };
  closeDeleteDialog = () => {
    this.setState({ deleteDialog: false });
  };
  deleteUserConfig = (id: any) => {
    this.props.deleteEmailConfig(id);
  };
  render() {
    const { emailConfigs, loading, isDeleting } = this.props;
    return (
      <Home>
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
                onFailure={this.handleLoginFailure}
                scope={"https://www.googleapis.com/auth/gmail.send"}
                accessType="offline"
                responseType="code"
                prompt="consent"
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
                {emailConfigs &&
                  emailConfigs.map((config: any) => (
                    <tr key={config._id}>
                      <DeleteDialog
                        id={config._id}
                        open={this.state.deleteDialog}
                        closeDeleteDialog={this.closeDeleteDialog}
                        isDeleting={isDeleting}
                        actionDelete={this.deleteUserConfig}
                        textContent="Are you sure you want to delete this configuration ?"
                      />
                      <td>Gmail Api</td>
                      <td>{config.userEmail}</td>
                      <td>
                        <button
                          className="squareBtn red"
                          onClick={this.openDeleteDialog}
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
      </Home>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    emailConfigs: state.email.emailConfigurations,
    loading: state.email.loading,
    isDeleting: state.email.isDeleting,
    showDeleteDialog: state.email.showDeleteDialog
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmailConfigurations: () => dispatch(getEmailConfigurations()),
    addEmailConfiguration: (code: any) => dispatch(addEmailConfiguration(code)),
    deleteEmailConfig: (id: any) => dispatch(deleteEmailConfig(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
