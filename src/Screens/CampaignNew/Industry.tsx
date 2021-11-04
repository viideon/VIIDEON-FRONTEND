import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { getIndustries, selectIndustry } from "../../Redux/Actions/asset";
import Loading from "../../components/Loading";
import IndustryCard from "../../components/CampaignTemplateCard/industry";

import "./industry.css";

interface IProps {
  moveToNextStep: () => void;
  industries: any[];
  loadingTemplates: boolean;
  getIndustries: () => void;
  selectIndustry: (industry: any) => void;
}
class SelectIndustry extends React.Component<IProps> {
  componentDidMount() {
    this.props.getIndustries();
  }
  proceedToRecording = (industry: any) => {
    this.props.selectIndustry(industry);
    this.props.moveToNextStep();
  };
  render() {
    const { industries, loadingTemplates } = this.props;
    return (
      <div className="wrapperSelectIndustry">
        <Typography variant="h4">Select an Industry</Typography>
        {loadingTemplates && (
          <div className="progressEditing">
            <Loading />
          </div>
        )}
        <Grid container spacing={2}>
          {industries &&
            industries.map((industry: any) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={industry._id}>
                <IndustryCard
                  industry={industry}
                  proceedToRecording={this.proceedToRecording}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    industries: state.asset.industries,
    loadingTemplates: state.asset.loadingTemplates
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getIndustries: () => dispatch(getIndustries()),
    selectIndustry: (industry: any) => dispatch(selectIndustry(industry)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectIndustry);
