import React from "react";
import { FormGroup, Label, Input, Col, Form } from "reactstrap";
import { Grid, Tooltip } from "@material-ui/core";
import Loading from "../../components/Loading";
import HelpIcon from "@material-ui/icons/Help";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Constants from "../../constants/constants";
import { updateVideo } from "../../Redux/Actions/videos";

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
              <div style={{ marginLeft: "48%" }}>{loading && <Loading />}</div>
              <Form>
                <FormGroup row>
                  <Col xs={3} md={2} className="colDetailTab">
                    <Label for="exampleText" id="descriptionLabel">
                      {Constants.DESCRIPTION}
                    </Label>
                  </Col>
                  <Col>
                    <Input
                      type="textarea"
                      name="text"
                      value={this.state.description}
                      style={{ minHeight: "150px" }}
                      onChange={this.updateDescription}
                    />
                    <p>
                      {Constants.ADD_TEXT}
                      <i>
                        <Tooltip
                          title="Appears on video page"
                          placement="top"
                          arrow
                        >
                          <span>
                            <HelpIcon />
                          </span>
                        </Tooltip>
                      </i>
                    </p>
                  </Col>
                </FormGroup>
                {/* <FormGroup row style={{ margin: "30px" }}>
            <Col xs={3} md={2} className="colDetailTab">
              <Label for="exampleText" id="descriptionLabel">
                {Constants.TAG}
              </Label>
            </Col>
            <Col>
              <Input type="text" name="text" id="exampleTextAddTags" />
              <p>
                {Constants.ADD_TAGS}
                <i>
                  <Tooltip
                    title="Organize your videos with tags to enable videos to be filtered in dashboard"
                    placement="top"
                    arrow
                  >
                    <span>
                      <GoInfo />
                    </span>
                  </Tooltip>
                </i>
              </p>
            </Col>
          </FormGroup> */}
              </Form>
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
