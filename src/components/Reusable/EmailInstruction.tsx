import React from "react";
import { Tooltip } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

interface IProps {
  heading: string;
}
const EmailInstruction: React.FC<IProps> = ({ heading }) => {
  return (
    <div style={{ letterSpacing: "1px", fontWeight: 600 }}>
      {heading}
      <span>
        <Tooltip
          title="connect your gmail account in confguration to send email's on your behalf"
          placement="top"
          arrow
        >
          <HelpIcon />
        </Tooltip>
      </span>
    </div>
  );
};

export default EmailInstruction;
