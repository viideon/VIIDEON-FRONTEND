import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0px 1px 0px 2px",
      border: "3px solid #5368FA",
      display: "flex",
      alignItems: "center",
      borderRadius: 0,
      width: "90%",
      height: "2rem",
      "& .MuiIconButton-label": {
        background: "#5368FA !important"
      },
      "& .MuiSvgIcon-root": {
        paddingTop: "0.5px",
        fontSize: "1.2rem",
        transition: "none"
      },
      "& .MuiIconButton-root:hover": {
        backgroundColor: "transparent !important"
      }
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: "10px 5px 10px 10px"
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "transparent !important"
    }
  })
);

export default function SearchBar() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
