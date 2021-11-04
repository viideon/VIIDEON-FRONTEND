import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ReplayIcon from "@material-ui/icons/Replay";
import GetAppIcon from "@material-ui/icons/GetApp";

interface IProps {
  title: string;
  color?: string;
}
const TooltipButton: React.FC<IProps> = ({ title, color }) => {
  const renderIcon = () => {
    switch (title) {
      case "Reload":
        return <ReplayIcon style={{ color: `${color}` }} />;
      case "Export":
        return <GetAppIcon style={{ color: `${color}` }} />;
      default:
        break;
    }
  };
  return (
    <Tooltip title={title}>
      <IconButton style={{ border: `1px solid ${color}` }}>
        {renderIcon()}
      </IconButton>
    </Tooltip>
  );
};
export default TooltipButton;
