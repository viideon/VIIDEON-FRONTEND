import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

type IProps = {
  history: any;
};
const Header: React.FC<IProps> = ({ history }) => {
  const navigate = () => {
    history.push("/video/create");
  };
  return (
    <Tooltip title="Create new Video" placement="top" arrow>
      <IconButton
        aria-label="delete"
        style={{
          border: "1px solid #d3d3d3",
          color: "#3598DC"
        }}
        onClick={() => navigate()}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};
export default Header;
