import React from "react";
import { withRouter } from "react-router-dom";
import avatarImage from "../../assets/profileImages/profileImg.png";
import "./styles.css";
// import { Tooltip } from "reactstrap";
// import { Images } from "../../config";
// import PopupMenu from "./PopupList";
type IProps = {
  history: any;
};
const Header: React.FC<IProps> = ({ history }) => {
  // const [tooltipOpen, setTooltipOpen] = useState(false);
  // const toggle = () => setTooltipOpen(!tooltipOpen);
  const navigateHome = () => {
    history.push("/");
  };
  return (
    <div className="HeaderContainer">
      <div className="startHeader"></div>
      <div className="centerHeader">
        <h3 className="HeaderStyle" onClick={navigateHome}>
          vidionPRO
        </h3>
      </div>
      <div className="endHeader">
        <div className="wrapperEnd">
          <img src={avatarImage} className="avatarNav" />
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
export default withRouter(Header);

/* <div className="HeaderComponent">
<div className="HeaderStyling">
  <h3 className="HeaderStyle" onClick={navigateHome}>
    {Constants.HEADER}
  </h3>
</div>

</div> */

/* <div className="IconComponents">
<span
  style={{ textDecoration: "underline", color: "blue" }}
  id="TooltipExample"
>
  <img
    src={Images.plus}
    className="ImagePlusTag"
    alt="ImagePlusTag"
    onClick={() => {
      history.push("/video/create");
    }}
  />
</span>
<Tooltip
  placement="bottom"
  isOpen={tooltipOpen}
  target="TooltipExample"
  toggle={toggle}
>
  Record and Upload a Video
</Tooltip>
<img
  src={Images.gift}
  className="ImageGiftTag"
  alt="ImageGiftTag"
/>
<PopupMenu />
</div> */
