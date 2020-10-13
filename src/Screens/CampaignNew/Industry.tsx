import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { getCampaignTemplates } from "../../Redux/Actions/asset";
import Loading from "../../components/Loading";
import IndustryCard from "../../components/CampaignTemplateCard/industry";

import "./industry.css";

interface IProps {
  moveToNextStep: () => void;
  templates: any[];
  loadingTemplates: boolean;
  getCampaignTemplates: () => void;
  selectTemplate: (template: any) => void;
}
class SelectTemplate extends React.Component<IProps> {
  componentDidMount() {
    this.props.getCampaignTemplates();
  }
  proceedToRecording = (template: any) => {
    // this.props.selectTemplate(template);
    this.props.moveToNextStep();
  };
  render() {
    const { templates, loadingTemplates } = this.props;
    return (
      <div className="wrapperSelectIndustry">
        <Typography variant="h4">Select an Industry</Typography>
        {loadingTemplates && (
          <div className="progressEditing">
            <Loading />
          </div>
        )}
        <Grid container spacing={2}>
          {templates &&
            templates.map((template: any) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={template._id}>
                <IndustryCard
                  industry={template}
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
    templates: state.asset.templates,
    loadingTemplates: state.asset.loadingTemplates
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getCampaignTemplates: () => dispatch(getCampaignTemplates())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
