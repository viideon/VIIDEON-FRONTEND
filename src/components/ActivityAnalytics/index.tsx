import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import TooltipButton from "../TooltipButton";
import "./style.css";

const ActivityAnalytics: React.FC = () => {
  return (
    <div className="wrapperActivity">
      <div className="headActivity">
        <h6>Activity</h6>
        <div className="wrapperActionActivity">
          <FormControl variant="outlined" id="formSelectInput">
            <InputLabel htmlFor="outlined-age-native-simple">
              Filter By
            </InputLabel>
            <Select native label="Filter By">
              <option aria-label="None" value="" />
              <option value={10}>All Time</option>
              <option value={20}>Today</option>
              <option value={30}>Yesterday</option>
            </Select>
          </FormControl>
          <TooltipButton title="Reload" color="#2786fb" />
          <TooltipButton title="Export" color="#1dc9b7" />
        </div>
      </div>
      <div className="bodyActivity"></div>
    </div>
  );
};

export default ActivityAnalytics;
