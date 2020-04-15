import React from "react";
import { FormControl, InputLabel, Select, Grid } from "@material-ui/core";
import ProgressBar from "../CircularProgressBar";
import "./style.css";

const GeneralStats: React.FC = () => {
  return (
    <div className="wrapperGeneralStats">
      <div className="headGeneralStats">
        <h6>General Stats</h6>
        <FormControl variant="outlined" id="formSelectInput">
          <InputLabel htmlFor="outlined-age-native-simple">
            Filter Range
          </InputLabel>
          <Select native label="Filter Range">
            <option aria-label="None" value="" />
            <option value={10}>All Time</option>
            <option value={20}>Today</option>
            <option value={30}>Yesterday</option>
          </Select>
        </FormControl>
      </div>
      <div className="bodyGeneralStats">
        <Grid container>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={1} heading="Email Click Rates" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={1} heading="CTA Click Rates" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <div className="wrapperProgress">
              <ProgressBar width="25%" value={1} heading="Watch Rates" />
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
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
              <ProgressBar width="25%" value={1} heading="Email Rates" />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default GeneralStats;
