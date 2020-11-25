import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter, useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleDrawer } from "../../Redux/Actions/drawer";
import { logout } from "../../Redux/Actions/auth";
import avatarImage from "../../assets/profileImages/profileImg.png";
import TopDrawer from "../DrawerTop/index";
import "./styles.css";
import LogoutModal from "../Modals/logout";
import whiteLogo from "../../assets/logo.png";
type IProps = {
  history: any;
  toggleDrawer: () => void;
  logout: () => void;
  loggedInStatus?: any;
  profile?: any;
  styles?: any;
};
const Header: React.FC<IProps> = ({
  history,
  toggleDrawer,
  logout,
  profile,
  loggedInStatus,
  styles
}) => {
  const [drawerOpen, toggleTopDrawer] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  const toggle = () => toggleTopDrawer(!drawerOpen);
  const navigateHome = () => {
    history.push("/");
  };
  const toggleLogoutModal = () => {
    handleClosePopup();
    setlogoutModal(!logoutModal);
  };
  const navigateTo = (to: string) => {
    history.push(`/${to}`);
    handleClosePopup();
  };
  const location = useLocation();
  var image =
    loggedInStatus && profile && profile.user && profile.user.url
      ? profile.user.url
      : avatarImage;
  return (
    <div className="HeaderContainer" style={styles}>
      <LogoutModal
        open={logoutModal}
        toggle={toggleLogoutModal}
        logout={logout}
      />
      <div className="startHeader">
        {location.pathname !== "/" ? (
          <Tooltip title="Redirect to Dashboard">
            <h3 className="headerStyle" onClick={navigateHome}>
              <img style={{ width: "40%" }} src={whiteLogo} alt="logo" />
            </h3>
          </Tooltip>
        ) : (
            <h3 className="headerStyle" onClick={navigateHome}>
              <img style={{ width: "40%" }} src={whiteLogo} alt="logo" />
            </h3>
          )}
        <MenuIcon
          onClick={() => {
            toggle();
          }}
          style={{ color: "#fff", zIndex: 234234323 }}
          className="hamburgerTop"
        />
        <TopDrawer open={drawerOpen} toggle={toggle} />

        {/* {(location.pathname === "/" ||
          location.pathname === "/chatvids" ||
          location.pathname === "/videos" ||
          location.pathname === "/configuration" ||
          location.pathname === "/campaign" ||
          location.pathname === "/assetlibrary" ||
          location.pathname === "/music" ||
          location.pathname === "/contacts") && (
          <MenuIcon
            onClick={() => toggleDrawer()}
            style={{ color: "#fff" }}
            id="hamburgerSide"
          />
        )} */}
      </div>
      <div className="endHeader">
        <div className="wrapperEnd">
          {/* <Tooltip title="Under Progress">
            <span>
              <i className="fas fa-envelope" style={iconStyle}></i>
            </span>
          </Tooltip> */}
          <Tooltip title="Under Progress">
            <span>
              <i className="fas fa-bell" style={iconStyle}></i>
            </span>
          </Tooltip>
          <Tooltip title="Campaign">
            <Link to="/campaign">
              <span>
                <i className="fas fa-flag" style={iconStyle}></i>
              </span>
            </Link>
          </Tooltip>

          <span>
            <Tooltip title="Under Progress">
              <i className="fas fa-cog" style={iconStyle}></i>
            </Tooltip>
            <Menu
              disableScrollLock={true}
              keepMounted
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClosePopup}
            >
              <MenuItem onClick={() => navigateTo("profile")}>Profile</MenuItem>
              <MenuItem onClick={() => toggleLogoutModal()}>Logout</MenuItem>
            </Menu>
          </span>
          <span
            onClick={handleClickPopup}
            style={{ cursor: "pointer" }}
            className="avatarWrapperHeader"
          >
            <img src={image} className="avatarNav" alt="avatar" />
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
const mapStateToProps = (state: any) => {
  return {
    loggedInStatus: state.auth.loggedInStatus,
    profile: state.profile
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleDrawer: () => dispatch(toggleDrawer()),
    logout: () => dispatch(logout())
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
