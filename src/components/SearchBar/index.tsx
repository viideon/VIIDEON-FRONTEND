import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5px",
      marginBottom: "5px",
      padding: "0px 1px 0px 2px",
      display: "flex",
      alignItems: "center",
      borderRadius: 8,
      width: "90%",
      height: "3rem",
      "& .MuiIconButton-label": {
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

export default function SearchBar(props: any) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search chatvid..."
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        onChange={props.onChange}
        placeholder="Search chatvid..."
        inputProps={{ "aria-label": "search chatvids" }}
      />
    </Paper>
  );
}

export function PreviewSearchBar() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search chatvid..."
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        inputProps={{ "aria-label": "search chatvids" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search chatvid..."
      >
        <FavoriteIcon />
      </IconButton>
    </Paper>
  );
}
