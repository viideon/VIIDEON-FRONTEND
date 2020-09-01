import React from "react";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
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
  toggle: () => void;
  history?: any;
}

const TopDrawer: React.FC<IProps> = ({ open, toggle, history }) => {
  const classes = useStyles();
  const navigate = (location: string) => {
    history.push(location);
    toggle();
  }
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
        <div className="OptionIcons" onClick={() => navigate("/videos")}>
          <i className="fab fa-microsoft" style={iconStyle} />
          <span className="IconNameStyling">My Videos</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => navigate("/campaign")}>
          <i className="far fa-flag" style={iconStyle} />
          <span className="IconNameStyling">Campaigns</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => navigate("/configuration")}>
          <i className="fas fa-users-cog" style={iconStyle} />
          <span className="IconNameStyling">Configuration</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>

        <div className="OptionIcons" onClick={() => navigate("/assetlibrary")}>
          <i className="fas fa-folder" style={iconStyle} />
          <span className="IconNameStyling">Asset Library</span>
          <i className="fas fa-angle-left" style={arrowIcon}></i>
        </div>
        <div className="OptionIcons" onClick={() => navigate("/music")}>
          <i className="far fa-play-circle" style={iconStyle} />
          <span className="IconNameStyling">Music</span>
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

export default withRouter<any, any>(TopDrawer);
