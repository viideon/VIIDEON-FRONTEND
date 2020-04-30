import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { AuthState } from "../../Redux/Types/auth";
import { logout } from "../../Redux/Actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";

const useStyles = makeStyles({
  root: {
    "& .MuiDrawer-paper": {
      width: "0vw",
      display: "none"
    },
    "& .MuiDrawer-root .MuiDrawer-modal .makeStyles-root-10 .MuiBackdrop-root": {
      display: "none !important"
    },
    "& .MuiBackdrop-root": {
      display: "none !important"
    },
    "@media (max-width:768px)": {
      "& .MuiDrawer-paper": {
        width: "100vw",
        display: "block"
      },
      "& .MuiDrawer-root .MuiDrawer-modal .makeStyles-root-10": {
        display: "block !important"
      },
      "& .MuiBackdrop-root": {
        display: "block !important"
      }
    }
  }
});
interface IProps {
  open?: boolean;
  toggle?: () => void;
  history?: any;
  auth: AuthState;
  logout: (user: any) => void;
}

const TopDrawer: React.FC<IProps> = ({
  open,
  toggle,
  history,
  logout,
  auth
}) => {
  const logoutUser = () => {
    logout(auth);
  };
  const classes = useStyles();
  return (
    <Drawer open={open} anchor="top" className={classes.root} onClose={toggle}>
      <div className="wrapperTopDrawer">
        <div
          className="OptionIcons dashboardOptionTop"
          onClick={() => {
            history.push("/");
          }}
        >
          <i className="fas fa-tachometer-alt dashboard" style={iconStyle} />
          <span className="IconNameStyling">Dashboard</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => history.push("/videos")}>
          <i className="fab fa-microsoft" style={iconStyle} />
          <span className="IconNameStyling">My Videos</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => alert("Under Progress")}>
          <i className="fa fa-envelope" style={iconStyle} />
          <span className="IconNameStyling">My Messages</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => alert("Under Progress")}>
          <i className="fas fa-chart-pie" style={iconStyle} />
          <span className="IconNameStyling">My Stats</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

        <div className="OptionIcons" onClick={() => alert("Under Progress")}>
          <i className="fas fa-folder" style={iconStyle} />
          <span className="IconNameStyling">Asset Library</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={logoutUser}>
          <i className="fa fa-user-circle-o" style={iconStyle} />
          <span className="IconNameStyling">Logout</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
      </div>
    </Drawer>
  );
};

const iconStyle = {
  fontSize: "14px",
  width: "1.5em",
  display: "inline-block",
  color: "#b4bcc8"
};
const arrowIcon = {
  marginLeft: "auto",
  marginRight: "12px"
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (user: any) => dispatch(logout(user))
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(TopDrawer)
);
