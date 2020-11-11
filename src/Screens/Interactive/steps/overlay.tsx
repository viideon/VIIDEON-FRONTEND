import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Typography, TextField, Divider, Button } from "@material-ui/core";

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';


import Select from '@material-ui/core/Select';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";

// Preview
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ForwardIcon from '@material-ui/icons/Forward';
import RefreshIcon from '@material-ui/icons/Refresh';
import HouseIcon from '@material-ui/icons/House';
import MenuIcon from '@material-ui/icons/Menu';
import CallMadeIcon from '@material-ui/icons/CallMade';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { PreviewSearchBar } from '../../../components/SearchBar';

// PreviewEND


import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import CancelIcon from '@material-ui/icons/Cancel';

import PreviewTab from './preview'
import "react-tabs/style/react-tabs.css";
import "../style.css";

class RecorderTab extends Component<any> {
  state = {
    fitVideo: true,
    active: "mobile",
  }
  componentDidMount() {
  }
  
  handleChange = (event: any) => {
    this.setState({ fitVideo: event.target.checked });
    this.props.onChange({ target: { name: "fitvideo", value: event.target.checked } })
  };

  handleVertical = (e: React.MouseEvent<HTMLElement>, newString: []) => {
    this.props.onChange({ target: { name: "valign", value: newString } })
  }
  handleHorizontal = (e: React.MouseEvent<HTMLElement>, newString: []) => {
    this.props.onChange({ target: { name: "align", value: newString } })
  }

  handleTabChange = (active: string) => {
    this.setState({ active })
  }

  render() {
    const { active } = this.state;
    return (
      <Grid container className="overLayWrapperTab">
        <Grid container xs={12} sm={12} md={8} lg={8}>
          <PreviewTab
            {...this.props}
            {...this.state}
          />
        </Grid>
        <Grid container xs={12} sm={12} md={4} lg={4}>
          <div className="actionTab">
            <CancelIcon className="tabCancelHead" onClick={() => this.props.history.push("/")} />
            <Typography variant="h6" className="topHeading">Great Video!</Typography>
            <Typography variant="h6" className="QuestionHeading">Whould you like to overlay some text?</Typography>
            <div className="textOverLayWrapper">
              <TextField fullWidth name="text" value={this.props.text} onChange={this.props.onChange} id="OverLayText" multiline rows={10} rowsMax={10} variant="outlined" />
            </div>
            <Grid container className="textAdjustmentWrapper">
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Typography variant="h6" className="actionLabels"> Alignement </Typography>
                <ToggleButtonGroup
                  exclusive
                  onChange={this.handleHorizontal}
                  value={this.props.align}
                  aria-label="text alignment"
                >
                  <ToggleButton name="align" value="left" aria-label="left aligned" >
                    <FormatAlignLeftIcon />
                  </ToggleButton>
                  <ToggleButton name="align" value="center" aria-label="centered" >
                    <FormatAlignCenterIcon />
                  </ToggleButton>
                  <ToggleButton name="align" value="right" aria-label="right aligned" >
                    <FormatAlignRightIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={12} sm={12} md={12} lg={5}>
                <Typography variant="h6" className="actionLabels"> Position </Typography>
                <ToggleButtonGroup
                  exclusive
                  onChange={this.handleVertical}
                  value={this.props.valign}
                  aria-label="text vertical alignment"
                >
                  <ToggleButton name="valign" value="top" aria-label="top aligned" >
                    <VerticalAlignTopIcon />
                  </ToggleButton>
                  <ToggleButton name="valign" value="center" aria-label="centered" >
                    <VerticalAlignCenterIcon />
                  </ToggleButton>
                  <ToggleButton name="valign" value="bottom" aria-label="bottom aligned" >
                    <VerticalAlignBottomIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid container className="textAdjustmentWrapper">
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Typography variant="h6" className="actionLabels"> Text Size </Typography>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange}
                  variant="outlined"
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"small"}>Small</option>
                  <option value={"default"}>Medium</option>
                  <option value={"large"}>Large</option>
                </Select>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5}>
                <Typography variant="h6" className="actionLabels"> Text Style </Typography>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange}
                  variant="outlined"
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"default"}>default</option>
                  <option value={"italic"}>italic</option>
                  <option value={"bold"}>bold</option>
                </Select>
              </Grid>
            </Grid>
            <div className="revealWrapper">
              <Typography variant="h6" className="actionLabels"> Text reveal/ fade </Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={[10, 20]} />
            </div>
            <div className="fitWrapper">
              <Typography variant="h6" className="actionLabels"> Fit Video </Typography>
              <AntSwitch
                checked={this.state.fitVideo}
                onChange={this.handleChange}
                name="fitVideo"
                size="medium"
              />
            </div>
            <Grid container className="ToggleActionsWrapper" style={{ margin: "1%" }}>
              <Grid item xs={12} sm={4} md={4} lg={4} style={{ margin: "4px" }}>
                <Button
                  color="default"
                  className="BackBTN"
                  startIcon={<NavigateBeforeOutlinedIcon />}
                  onClick={this.props.moveBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={6} lg={6} style={{ margin: "4px" }}>
                <Button
                  color="default"
                  className="NextBTN"
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={this.props.moveToNextStep}
                >
                  Next Step
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 70,
      height: 26,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: "#406c7f",
      '&$checked': {
        transform: 'translateX(43px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: "#fdb415",
          borderColor: "#fdb415",
        },
      },
    },
    thumb: {
      width: 22,
      height: 22,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid #406c7f`,
      borderRadius: 16,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {
      backgroundColor: "#fdb415"
    },
  }),
)(Switch);

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid #fdb415',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {
    backgroundColor: "#fdb415"
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
    color: "#fdb415"
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fdb415"
  },
  rail: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#406c7f",
    opacity: 1,
  },
})(Slider);


const iconStyle = {
  padding: 0,
  width: "1em",
  height: "1em"
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecorderTab);