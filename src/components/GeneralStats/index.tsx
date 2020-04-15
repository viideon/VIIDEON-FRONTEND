import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";
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
      <div className="bodyGeneralStats"></div>
    </div>
  );
};

export default GeneralStats;
