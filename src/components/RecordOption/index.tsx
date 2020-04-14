import React, { FC, useState } from "react";
import { Button, Tooltip } from "reactstrap";
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
        <Button
          onClick={() => {
            history.push("/video/create");
          }}
          style={{
            marginTop: 18,
            backgroundColor: "#9F55FF",
            width: "100%",
            minWidth: "192px",
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
