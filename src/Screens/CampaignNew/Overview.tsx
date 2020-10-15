import React from "react";
import { Grid, Typography, CardMedia, Button } from "@material-ui/core";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "./style.css";


interface IProps {
  moveToNextStep: () => void;
  moveBack: () => void;
  template: any;
}

class Overview extends React.Component<IProps> {
  state = {
  };

  componentDidMount() {
  }  
  componentWillUnmount() {
  }

  renderStep = (step: any, index: number) => {
    return (
      <div className="stepHead" key={index}>
        <h4> {index + 1} </h4>
        <Typography variant="h5">{ step.title }</Typography>
      </div>
    )
  }

  render() {
    const {template} = this.props;
    return (
      <div className="overviewWrapperDiv">
        <Typography variant="h4">{template.name} Overview</Typography>
        <Grid container>
          <Grid container xs={12} sm={6} md={6} lg={6}>
            <Grid item xs={12} sm={12} md={8} lg={8} className="viewsWrapper">
              <div className="thumbnailView">
                <CardMedia
                  component="img"
                  alt="Industry Thumbnail"
                  height="280"
                  image={template.templateThumbnailUrl}
                />
              </div>
              <Grid item xs={12} sm={12} md={12} lg={12} className="descriptOfTemplate">
                <h3> An overview of { template.name} style </h3>
                <span>
                  {template.templateDescription}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className="stepGridWrapper">
              {
                template.steps.map((step: any, index: number) => {
                  return this.renderStep(step, index)
                })
              }
            </div>
          </Grid>
        </Grid>
        <Grid container className="actionBTNsWrapper">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Button
              color="default"
              className="moveBackBTN"
              startIcon={<NavigateBeforeOutlinedIcon />}
              onClick={this.props.moveBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="alignRight">
            <Button
              color="default"
              className="continueBTN"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={this.props.moveToNextStep}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Overview;
