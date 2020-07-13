import React from "react";
import { Grid } from "@material-ui/core";
import ProgressBar from "../CircularProgressBar";
import "./style.css";
interface IProps {
  singleVideo?: any;
}
const GeneralStats: React.FC<IProps> = ({ singleVideo }) => {
  let watch = singleVideo && singleVideo.watch ? singleVideo.watch : 1;
  watch = Math.round((watch * 100) / 15);
  let emailShare =
    singleVideo && singleVideo.emailShareCount
      ? singleVideo.emailShareCount
      : 1;
  emailShare = Math.round((emailShare * 100) / 15);
  return (
    <div className="wrapperGeneralStats">
      <div className="headGeneralStats">
        <h6>General Stats</h6>
        {/* <FormControl variant="outlined" id="formSelectInput">
          <InputLabel htmlFor="outlined-age-native-simple">
            Filter Range
          </InputLabel>
          <Select native label="Filter Range">
            <option aria-label="None" value="" />
            <option value={10}>All Time</option>
            <option value={20}>Today</option>
            <option value={30}>Yesterday</option>
          </Select>
        </FormControl> */}
      </div>
      <div className="bodyGeneralStats">
        <Grid container>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar
                width="25%"
                value={emailShare}
                heading="Email Click Rates"
              />
            </div>
          </Grid>
          {/* <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={1} heading="CTA Click Rates" />
            </div>
          </Grid> */}
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={watch} heading="Watch Rates" />
            </div>
          </Grid>
          {/* <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={1} heading="Reaction Rates" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            {" "}
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={1} heading="Call Rates" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            {" "}
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={watch} heading="Email Rates" />
            </div>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default GeneralStats;
