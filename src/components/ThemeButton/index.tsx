import React from "react";
import { makeStyles, Button } from "@material-ui/core";

interface IProps {
  name?: string;
  onClick?: () => void;
  style?: any;
  disabled?: boolean;
}
const useStyles = makeStyles(theme => ({
  button: {
    "&:hover": {
      backgroundColor: "#22B9FF",
      outline: "none"
    },
    "outline": "none !important"
  }
}));
const ThemeButton: React.FC<IProps> = ({ name, onClick, style, disabled }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={classes.button}
      style={style}
      variant="contained"
      disabled={disabled}
    >
      {name}
    </Button>
  );
};
export default ThemeButton;
