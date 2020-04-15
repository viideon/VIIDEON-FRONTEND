import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import TooltipButton from "../TooltipButton";
import "./style.css";

const ActivityAnalytics: React.FC = () => {
  return (
    <div className="wrapperActivity">
      <div className="headActivity">
        <h6>Video Views</h6>
        <div>
          {" "}
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
          <TooltipButton />
        </div>
      </div>
      <div className="bodyActivity"></div>
    </div>
  );
};

export default ActivityAnalytics;
