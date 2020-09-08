import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CampaignTemplateCard from "../../components/CampaignTemplateCard";

interface IProps {
    moveToNextStep: () => void;
}
class SelectTemplate extends React.Component<IProps> {
    render() {
        return <div className="wrapperSelectTemplate">
            <Typography variant="h4" >
                Select template for your Campaign
      </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3} lg={3} >
                    <CampaignTemplateCard moveToNextStep={this.props.moveToNextStep} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} >
                    <CampaignTemplateCard moveToNextStep={this.props.moveToNextStep} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} >
                    <CampaignTemplateCard moveToNextStep={this.props.moveToNextStep} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} >
                    <CampaignTemplateCard moveToNextStep={this.props.moveToNextStep} />
                </Grid>
            </Grid>
        </div>
    }
}

export default SelectTemplate;