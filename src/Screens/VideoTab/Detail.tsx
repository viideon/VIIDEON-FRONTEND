import React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Constants from "../../constants/constants";
import { updateVideo } from "../../Redux/Actions/videos";
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
      <div>
        <Grid container>
          <Grid item xs={1} sm={1} md={2}></Grid>
          <Grid item xs={10} sm={10} md={8}>
            <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <div className="progressEditing">{loading && <Loading />}</div>
              <h6 id="descriptionLabel">{Constants.DESCRIPTION}</h6>
              <textarea
                name="textarea"
                value={this.state.description}
                className="descriptionTextArea"
                onChange={this.updateDescription}
              />
              <p>
                {Constants.ADD_TEXT}
                <i>
                  <Tooltip title="Appears on video page" placement="top" arrow>
                    <span>
                      <HelpIcon />
                    </span>
                  </Tooltip>
                </i>
              </p>
            </div>
            <Grid item xs={1} sm={1} md={2}></Grid>
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
