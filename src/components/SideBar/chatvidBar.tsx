import React, { Component } from "react";
import { connect } from "react-redux";
import { UserProfile } from "../../Redux/Types/profile";
import { selectChatvid } from '../../Redux/Actions/chatvid';
import classname from "classnames";
import Colors from '../../constants/colors';

import SearchBar from '../SearchBar'
import ThemeButton from '../ThemeButton'
import "./style.css";

type IProps = {
  history: any;
  location: any;
  drawer: boolean;
  user: UserProfile;
  chatvids: any;
  logout: () => void;
  selectChatvid: (chatvid: any) => void;
};
type IState = { activeTab: string; logoutModal: boolean, search: string };
class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "/",
      logoutModal: false,
      search: "",
    };
  }

  handleChangeTab = (path: string) => {
    this.setState({ activeTab: path });
    this.props.history.push(path);
  };

  toggleLogoutModal = () => {
    this.setState({ logoutModal: !this.state.logoutModal });
  };
  handleChatvid = (chatvid: any) => {
    this.props.selectChatvid(chatvid)
    this.handleChangeTab(`/chatvids/form/${chatvid._id}`);
  }
  renderChatvids = (chatvids: any) => {
    const { search } = this.state;
    if(!search) return chatvids;
    const regex =  RegExp(`${search.toLowerCase()}*`)
    const filteredChatvids = chatvids?.filter((vids: any) => regex.test(vids?.name?.toLowerCase()))
    return filteredChatvids || []
  }
  handleChange = (event: any) => {
    this.setState({ search: event.target.value})
  }
  render() {
    const { drawer } = this.props;
    var activeSideBar2 = this.state.activeTab;
    if (this.props.location.pathname !== activeSideBar2)
      activeSideBar2 = this.props.location.pathname;
    return (
      <div className={drawer ? "MainDrawer" : "MainDrawerHide"}>
        <SearchBar onChange={this.handleChange} />
        <ThemeButton
          round={false}
          name="Create Chatvid"
          onClick={() => this.props.history.push('/chatvid')}
          style={{ ...Colors.themeGradientBtn, width: "95%", marginLeft: "3%", marginBottom: "10%" }}
        />
        <div
          className={classname({
            OptionIcons: true,
            activeSideBar2: activeSideBar2 === "/chatvids"
          })}
          onClick={() => this.handleChangeTab("/chatvids")}
        >
          {/* <i className="fab fa-microsoft" style={iconStyle} />   */}
          <span className="" style={{color:"black",fontWeight:"bold"}}>
          <img
                              src="/images/messagesicon.png"
                              width="25px"
                              alt="edit"
                              style={{
                                 margin: '4px 4px 8px 4px',
                              }}/>
            All Interactions<img
                              src="/images/rightarrow.png"
                              width="16px"
                              alt="edit"
                              style={{
                                 margin: '4px 4px 2px 14px',
                              }}/></span>
        </div>
        <div className="chatvidScroollingBar">
          {
            this.props.chatvids && this.props.chatvids.length > 0 &&
            this.renderChatvids(this.props.chatvids).map((vids: any, index: string) => {
              return (
                <div>
                {vids.steps[0]?.videoId &&(<div
                  key={index}
                  className={classname({
                    OptionIcons: true,
                    activeSideBar2: activeSideBar2 === `/chatvids/form/${vids._id}`
                  })}
                  onClick={() => this.handleChatvid(vids)}
                >
                  
                  {vids.steps[0]?.videoId?.thumbnail ?
                    <div className="thumbnailInChatvidBar">
                      <img src={vids.steps[0]?.videoId?.thumbnail} alt="thumbnail" />
                    </div>
                    :
                    <i className="fab fa-microsoft" style={iconStyle} />
                  }
                  <span className="IconNameStyling2" style={{padding:"10px"}}>{vids.name} </span>
                </div>)}
                </div>
              )
            })
          }

          
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
  cursor: "pointer"
};

const mapStateToProps = (state: any) => {
  return {
    user: state.profile.user,
    drawer: state.drawer.drawer,
    chatvids: state.chatvids.chatvids,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    selectChatvid: (chatvid: any) => dispatch(selectChatvid(chatvid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
