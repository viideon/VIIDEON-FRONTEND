import React from "react";
import { makeStyles, Button } from "@material-ui/core";

interface IProps {
  name?: string;
  onClick?: () => void;
}
const useStyles = makeStyles(theme => ({
  button: {
    "&:hover": {
      backgroundColor: "#22B9FF"
    }
  }
}));
const ThemeButton: React.FC<IProps> = ({ name, onClick }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={classes.button} variant="outlined">
      {name}
    </Button>
  );
};
export default ThemeButton;
