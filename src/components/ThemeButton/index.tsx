import React from "react";
import { makeStyles, Button } from "@material-ui/core";

interface IProps {
  name?: string;
  onClick?: () => void;
  style?: any;
}
const useStyles = makeStyles(theme => ({
  button: {
    "&:hover": {
      backgroundColor: "#22B9FF"
    }
  }
}));
const ThemeButton: React.FC<IProps> = ({ name, onClick, style }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={classes.button}
      style={style}
      variant="outlined"
    >
      {name}
    </Button>
  );
};
export default ThemeButton;
