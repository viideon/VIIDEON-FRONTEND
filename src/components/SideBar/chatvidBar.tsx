import React, { Component } from "react";
import { connect } from "react-redux";
import { UserProfile } from "../../Redux/Types/profile";
import {
  selectChatvid,
  mobileViewChatVid,
  deletechatvid,
  getChatvids,
} from "../../Redux/Actions/chatvid";
import classname from "classnames";
import DeleteDialog from "../Reusable/DeleteDialog";
import { Grid, Menu, MenuItem } from "@material-ui/core";
import Colors from "../../constants/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchBar from "../SearchBar";
import ThemeButton from "../ThemeButton";
import { toast } from "react-toastify";
import "./style.css";
import { boolean } from "yup";

type IProps = {
  history: any;
  location: any;
  drawer: boolean;
  user: UserProfile;
  chatvids: any;
  mobileview: any;
  logout: () => void;
  deletechatvid: (_id: string, history: any) => void;
  selectChatvid: (chatvid: any) => void;
  mobileViewChatVid: (v: any) => void;
  getChatvids: () => void;
};
type IState = {
  activeTab: string;
  logoutModal: boolean;
  search: string;
  deleteDialog: boolean;
  vidMenu: boolean;
  isMobileView: boolean;
  anchorEl: null | HTMLElement;
  isMenu: boolean;
  currentChatvid: any;
};

class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "/",
      logoutModal: false,
      search: "",
      deleteDialog: false,
      vidMenu: false,
      isMobileView: false,
      anchorEl: null,
      isMenu: false,
      currentChatvid: "",
    };
  }
  handleChangeTab = (path: string) => {
    this.setState({ activeTab: path });
    this.props.history.push(path);
  };

  copyUrl = () => {
    const url = `${process.env.REACT_APP_DOMAIN}/chatvid/res/${this.state
      .currentChatvid && this.state.currentChatvid._id}`;
    console.log("url is ", url);
    console.log("copyurl", this.state.currentChatvid);
    navigator.clipboard.writeText(url);
    toast.info("Url copied to clipboard");
  };

  toggleLogoutModal = () => {
    this.setState({ logoutModal: !this.state.logoutModal });
  };
  handleChatvid = (chatvid: any) => {
    if (!this.state.isMenu) {
      this.props.selectChatvid(chatvid);
      this.handleChangeTab(`/chatvids/form/${chatvid._id}`);
    }
  };
  renderChatvids = (chatvids: any) => {
    const { search } = this.state;
    if (!search) return chatvids;
    const regex = RegExp(`${search.toLowerCase()}*`);
    const filteredChatvids = chatvids?.filter((vids: any) =>
      regex.test(vids?.name?.toLowerCase())
    );
    return filteredChatvids || [];
  };
  handleChange = (event: any) => {
    this.setState({ search: event.target.value });
  };
  openDeleteDialog = () => {
    this.setState({
      deleteDialog: true,
    });
  };
  closeDeleteDialog = () => {
    this.setState({
      deleteDialog: false,
    });
  };
  handleVidMenu = () => {
    this.setState({
      vidMenu: !this.state.vidMenu,
    });
  };
  deleteAction = (id: string) => {
    //this.props.history.push("/")
    this.props.deletechatvid(id, this.props.history);
    // if (this.props.history.location.pathname === "/chatvids") {
    //   this.props.deletechatvid(id, this.props.history);
    //   window.location.reload();
    // }
    this.setState({ anchorEl: null });
  };
  handleClick = (event: React.MouseEvent<HTMLButtonElement>, chatvid: any) => {
    event.stopPropagation();
    this.setState({
      currentChatvid: chatvid,
    });
    this.setState({ anchorEl: event.currentTarget, isMenu: true });
  };
  handleClose = () => {
    this.setState({ anchorEl: null, isMenu: false });
  };
  render() {
    const { drawer } = this.props;
    var activeSideBar2 = this.state.activeTab;
    if (this.props.location.pathname !== activeSideBar2)
      activeSideBar2 = this.props.location.pathname;
    return (
      <div
        className={drawer ? "MainDrawer" : "MainDrawerHide"}
        style={{
          display: this.props.mobileview === "showChatVid" ? "none" : "inherit",
        }}
      >
        <SearchBar onChange={this.handleChange} />
        <ThemeButton
          round={false}
          name="Create Chatvid"
          onClick={() => this.props.history.push("/chatvid")}
          style={{
            ...Colors.themeGradientBtn,
            width: "95%",
            marginLeft: "3%",
            marginBottom: "10%",
          }}
        />
        <div
          className={classname({
            OptionIcons: true,
            activeSideBar2: activeSideBar2 === "/chatvids",
          })}
          onClick={() => {
            this.props.mobileViewChatVid("showChatVid");
            this.handleChangeTab("/chatvids");
          }}
        >
          {/* <i className="fab fa-microsoft" style={iconStyle} />   */}
          <span className="" style={{ color: "black", fontWeight: "bold" }}>
            <img
              src="/images/messagesicon.png"
              width="25px"
              alt="edit"
              style={{
                margin: "4px 4px 8px 4px",
              }}
            />
            All Interactions
            <img
              src="/images/rightarrow.png"
              width="16px"
              alt="edit"
              style={{
                margin: "4px 4px 2px 14px",
              }}
            />
          </span>
        </div>
        <div className="chatvidScroollingBar">
          {this.props.chatvids &&
            this.props.chatvids.length > 0 &&
            this.renderChatvids(this.props.chatvids).map(
              (vids: any, index: string) => {
                return (
                  <div>
                    {vids.steps[0]?.videoId && (
                      <div
                        key={index}
                        id="myDiv"
                        className={classname({
                          OptionIcons: true,
                          activeSideBar2:
                            activeSideBar2 === `/chatvids/form/${vids._id}`,
                        })}
                        onClick={() => {
                          this.props.mobileViewChatVid("showChatVid");
                          this.handleChatvid(vids);
                        }}
                      >
                        {vids.steps[0]?.videoId?.thumbnail ? (
                          <div className="thumbnailInChatvidBar">
                            <img
                              src={vids.steps[0]?.videoId?.thumbnail}
                              alt="thumbnail"
                            />
                          </div>
                        ) : (
                          <i className="fab fa-microsoft" style={iconStyle} />
                        )}
                        <span
                          className="IconNameStyling2"
                          style={{ padding: "10px" }}
                        >
                          {vids.name}{" "}
                        </span>
                        <span
                          className="vertIcon"
                          id="my-dots"
                          onClick={(e: any) => this.handleClick(e, vids)}
                        >
                          <MoreVertIcon style={{ color: "#000" }} />
                        </span>

                        <Menu
                          id="menuVideoCard"
                          anchorEl={this.state.anchorEl}
                          keepMounted
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleClose}
                        >
                          <MenuItem
                            onClick={() => {
                              this.props.selectChatvid(
                                this.state.currentChatvid
                              );
                              this.props.history.push(
                                `/chatvids/edit/${this.state.currentChatvid &&
                                  this.state.currentChatvid._id}`
                              );
                            }}
                            style={{ padding: "10px" }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure? you want to delete this ChatVid?"
                                )
                              ) {
                                this.deleteAction(
                                  this.state.currentChatvid._id
                                );
                              }
                            }}
                            style={{ padding: "10px" }}
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            style={{ padding: "10px" }}
                            onClick={this.copyUrl}
                          >
                            Copy Url
                          </MenuItem>
                        </Menu>
                      </div>
                    )}
                  </div>
                );
              }
            )}
        </div>
      </div>
    );
  }
}
const iconStyle = {
  fontSize: "14px",
  width: "1.5em",
  display: "inline-block",
  color: "#FFFFFF",
  cursor: "pointer",
};

const mapStateToProps = (state: any) => {
  return {
    user: state.profile.user,
    drawer: state.drawer.drawer,
    chatvids: state.chatvids.chatvids,
    mobileview: state.chatvids.mobileViewChatVid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    deletechatvid: (_id: string, history: any) =>
      dispatch(deletechatvid(_id, history)),
    getChatvids: () => dispatch(getChatvids()),
    selectChatvid: (chatvid: any) => dispatch(selectChatvid(chatvid)),
    mobileViewChatVid: (v: any) => dispatch(mobileViewChatVid(v)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
