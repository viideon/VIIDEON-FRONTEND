import React from "react";
import { makeStyles, Button } from "@material-ui/core";

interface IProps {
  name?: string;
  onClick?: () => void;
  style?: any;
  disabled?: boolean;
  round?: boolean;
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
const ThemeButton: React.FC<IProps> = ({ name, onClick, style, disabled, round }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={classes.button}
      // style={style}
      style={{ ...style, borderRadius: round ? "10rem" : "inherit" }}
      variant="contained"
      disabled={disabled}
    >
      {name}
    </Button>
  );
};
export default ThemeButton;
