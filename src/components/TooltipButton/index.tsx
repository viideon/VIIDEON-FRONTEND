import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ReplayIcon from "@material-ui/icons/Replay";
import GetAppIcon from "@material-ui/icons/GetApp";

const TooltipButton: React.FC = () => {
  return (
    <Tooltip title="Replay">
      <IconButton aria-label="delete">
        <ReplayIcon />
      </IconButton>
    </Tooltip>
  );
};
export default TooltipButton;
