import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from '@material-ui/icons/Favorite';

// LOGICS
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

// END LOGICS

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logicRoot: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "5px",
      marginBottom: "5px",
      padding: "0px 1px 0px 2px",
      display: "flex",
      alignItems: "center",
      borderRadius: 8,
      width: "max-content",
      height: "3rem",
      background: "#f2f2f2",
      overflow: "scroll",
      "& .MuiIconButton-label": {
      },
      "& .MuiSvgIcon-root": {
        paddingTop: "0.5px",
        fontSize: "1.2rem",
        transition: "none"
      },
      "& .MuiIconButton-root:hover": {
        backgroundColor: "#f2f2f2 !important"
      }
    },
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

export function ChatvidRedirectionLogics(props: any) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const choiceRedirection = [...Array(props.length).keys()];
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
    props.onChange(event.target.value)
  };
  return (
    <Paper className={classes.logicRoot}>
      {props.text}
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search chatvid..."
      >
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {choiceRedirection.map((item: any, index: number) => {
            return (
              <MenuItem value={index + 1}>{index + 1}</MenuItem>
            )
          })
          }
        </Select>
      </IconButton>
    </Paper>
  );
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);