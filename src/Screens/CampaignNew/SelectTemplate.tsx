import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { getCampaignTemplates } from "../../Redux/Actions/asset";
import Loading from "../../components/Loading";
import CampaignTemplateCard from "../../components/CampaignTemplateCard";
import { ChosedIndustry } from "../../components/CampaignTemplateCard/industry";

import Button from "@material-ui/core/Button";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";

interface IProps {
  industry: any;
  templates: any[];
  loadingTemplates: boolean;
  moveBack: () => void;
  moveToNextStep: () => void;
  getCampaignTemplates: () => void;
  selectTemplate: (template: any) => void;
}
class SelectTemplate extends React.Component<IProps> {
  componentDidMount() {
    this.props.getCampaignTemplates();
  }
  proceedToRecording = (template: any) => {
    this.props.selectTemplate(template);
    this.props.moveToNextStep();
  };
  render() {
    const { templates, loadingTemplates, industry } = this.props;
    return (
      <div className="wrapperSelectTemplate">
        <Typography variant="h4">Choose a Style</Typography>
        {loadingTemplates && (
          <div className="progressEditing">
            <Loading />
          </div>
        )}
        <Grid container>
          <Grid
            container
            xs={12}
            sm={4}
            md={3}
            lg={3}
            className="choseIndustryContainer"
          >
            {industry && (
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <ChosedIndustry
                  industry={industry}
                  proceedToRecording={() => {}}
                />
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sm={12}
              md={10}
              lg={10}
              style={{ textAlign: "center" }}
            >
              <Button
                variant="outlined"
                color="default"
                className="changeIndustryBtn"
                startIcon={<NavigateBeforeOutlinedIcon />}
                onClick={this.props.moveBack}
              >
                Change
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sm={8}
            md={9}
            lg={9}
            className="TemplateWrapperContainer"
          >
            {templates &&
              templates.map((template: any) => {
                if(industry._id === template.industryId) {
                  return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={template._id}>
                    <CampaignTemplateCard
                      template={template}
                      proceedToRecording={this.proceedToRecording}
                    />
                  </Grid>
                  )
                }
              })}
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    templates: state.asset.templates,
    industry: state.asset.selectedIndustry,
    loadingTemplates: state.asset.loadingTemplates
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getCampaignTemplates: () => dispatch(getCampaignTemplates())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectTemplate);
