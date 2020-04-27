import React, { useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { toggleDrawer } from "../../Redux/Actions/drawer";
import avatarImage from "../../assets/profileImages/profileImg.png";
import TopDrawer from "../DrawerTop/index";
import MenuIcon from "@material-ui/icons/Menu";
import "./styles.css";
type IProps = {
  history: any;
  toggleDrawer: () => void;
};
const Header: React.FC<IProps> = ({ history, toggleDrawer }) => {
  const [drawerOpen, toggleTopDrawer] = useState(false);
  const toggle = () => toggleTopDrawer(!drawerOpen);
  const navigateHome = () => {
    history.push("/");
  };
  const location = useLocation();
  return (
    <div className="HeaderContainer">
      <div className="startHeader">
        {(location.pathname === "/" || location.pathname === "/videos") && (
          <MenuIcon
            onClick={() => toggle()}
            style={{ color: "#fff" }}
            className="hamburgerTop"
          />
        )}
        <TopDrawer open={drawerOpen} toggle={toggle} />

        {(location.pathname === "/" || location.pathname === "/videos") && (
          <MenuIcon
            onClick={() => toggleDrawer()}
            style={{ color: "#fff" }}
            id="hamburgerSide"
          />
        )}
      </div>
      <div className="centerHeader">
        <h3 className="headerStyle" onClick={navigateHome}>
          vidionPRO
        </h3>
      </div>
      <div className="endHeader">
        <div className="wrapperEnd">
          <img src={avatarImage} className="avatarNav" alt="avatar" />
          <span>
            <i className="fas fa-envelope" style={iconStyle}></i>
          </span>
          <span>
            <i className="fas fa-bell" style={iconStyle}></i>
          </span>
          <span>
            <i className="fas fa-flag" style={iconStyle}></i>
          </span>
          <span>
            <i className="fas fa-cog" style={iconStyle}></i>
          </span>
        </div>
      </div>
    </div>
  );
};

const iconStyle = {
  color: "#fff",
  cursor: "pointer"
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleDrawer: () => dispatch(toggleDrawer())
  };
};
export default withRouter<any, any>(connect(null, mapDispatchToProps)(Header));
