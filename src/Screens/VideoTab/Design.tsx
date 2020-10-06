import React from "react";
import { Select, MenuItem, Grid, Tooltip } from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Constants from "../../constants/constants";
import { updateVideo } from "../../Redux/Actions/videos";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CirclePicker, ChromePicker } from "react-color";
import TextField from '@material-ui/core/TextField';

import "./style.css";

interface IProps {
  updateVideo: (video: any) => void;
  isVideoUpdating: boolean;
  loading: boolean;
  match: any;
  video: any;
}

class Detail extends React.Component<IProps> {
  state = {
    description: "",
    typingTimeout: 0,
    descriptionLoaded: false
  };

  componentDidUpdate() {
    if (
      this.props.video &&
      this.props.video.description &&
      this.state.descriptionLoaded === false
    ) {
      this.setState({
        description: this.props.video.description,
        descriptionLoaded: true
      });
    }
  }

  updateDescription = (e: any) => {
    let that = this;
    clearTimeout(this.state.typingTimeout);
    this.setState({
      description: e.target.value,
      typingTimeout: setTimeout(function() {
        that.triggerUpdate(that.state.description);
      }, 2000)
    });
  };
  triggerUpdate = (value: any) => {
    const { id } = this.props.match.params;
    const video = {
      id: id,
      description: value
    };
    this.props.updateVideo(video);
  };
  render() {
    const { loading } = this.props;
    return (
      <div className="designTabWrapper">
        <Grid container>
          <Grid item xs={2} sm={2} md={2} style={{ marginTop: '1em'}}>
            <div> 
              Player
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} style={{ marginTop: '1em'}}>
            <div> 
            <FormControlLabel
              control={
                <Checkbox
                  // onChange={handleChange}
                  name="displayLogo"
                  color="default"
                />
              }
              label="Display company logo on video player"
            />
            </div>
          </Grid>
          <Grid item xs={2} sm={2} md={2} style={{ marginTop: '1em'}}>
            <div> 
              Logo Position
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} style={{ marginTop: '1em'}}>
            <div> 
            <Select
                id="logoPositionSelect"
                // onChange={this.setQuality}
                // value={this.state.selectValue}
              >
                <MenuItem value={"top-left"}> top left </MenuItem>
                <MenuItem value={"top-right"}> top right </MenuItem>
                <MenuItem value={"bottom-left"}> bottom left </MenuItem>
                <MenuItem value={"bottom-right"}> bottom right </MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid item xs={2} sm={2} md={2} style={{ marginTop: '1em'}}>
            <div> 
              Player color
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} style={{ marginTop: '1em'}}>
            <div>
              <div className="roundWrapper">
                <CirclePicker/>
              </div> 
              <div className="cromWrapper">
                <ChromePicker/>
              </div> 
            </div>
          </Grid>
          <Grid item xs={2} sm={2} md={2} style={{ marginTop: '1em'}}>
            <div> 
              Background
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} style={{ marginTop: '1em'}}>
            <div>
              <div>Add a custom background image to your video page.</div>
              <div className="videoTabSearhcWrapper">
                <TextField
                  id="outlined-secondary"
                  label="Outlined"
                  variant="outlined"
                />
              </div>
              <div></div>
              <div></div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    loading: state.video.loading,
    isVideoUpdating: state.video.isVideoUpdating,
    video: state.video.singleVideo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateVideo: (video: any) => dispatch(updateVideo(video))
  };
};
export default withRouter<any, any>(
  connect(mapStateToProps, mapDispatchToProps)(Detail)
);
