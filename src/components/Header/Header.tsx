import React, { FC, useState } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip } from "reactstrap";
import { Images } from "../../config";
import "./styles.css";
import PopupMenu from "./PopupList";
import * as Constants from "../../constants/components/home";
type IProps = {
  history: any;
};
const Header: FC<IProps> = ({ history }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const navigateHome = () => {
    history.push("/");
  };
  return (
    <>
      <div className="HeaderContainer">
        <div className="HeaderComponent">
          <div className="HeaderStyling">
            <h3 className="HeaderStyle" onClick={navigateHome}>
              {Constants.HEADER}
            </h3>
          </div>
          <div className="IconComponents">
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
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Header);
