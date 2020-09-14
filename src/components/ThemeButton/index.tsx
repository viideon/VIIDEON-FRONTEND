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
      backgroundColor: "#22B9FF",
      outline: "none"
    },
    "outline": "none !important"
  }
}));
const ThemeButton: React.FC<IProps> = ({ name, onClick, style }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={classes.button}
      style={style}
      variant="contained"
    >
      {name}
    </Button>
  );
};
export default ThemeButton;
