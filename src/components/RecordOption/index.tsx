import React, { FC, useState } from "react";
import { Button, Tooltip } from "reactstrap";

// import { Images } from '../../config';
import "./styles.css";

type IProps = {
  history: any;
};
const Header: FC<IProps> = ({ history }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <>
      <span
        style={{ textDecoration: "underline", color: "blue" }}
        id="TooltipExample"
      >
        {/* <img src={Images.plus} style={{
          width: 30,
          height: 30,
          marginTop:20
        }} alt="ImagePlusTag" onClick={() => { history.push('/video/create') }} /> */}
        <Button
          onClick={() => {
            history.push("/video/create");
          }}
          style={{
            marginTop: 18,
            backgroundColor: "#9F55FF",
            width: "100%",
            height: 40,
            color: "white"
          }}
        >
          Record/Upload a Video
        </Button>
      </span>
      <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target="TooltipExample"
        toggle={toggle}
      >
        Record or Upload a Video
      </Tooltip>
    </>
  );
};
export default Header;
