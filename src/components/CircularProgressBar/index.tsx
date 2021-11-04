import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IProps {
  width?: string;
  value: number;
  heading?: string;
}
const Progressbar: React.FC<IProps> = ({ width, value, heading }) => {
  return (
    <div>
      <div style={{ width: width }}>
        <CircularProgressbar value={value} text={`${value}%`} />
      </div>
      <p style={headingStyle}>{heading}</p>
    </div>
  );
};
const headingStyle = {
  fontSize: "14px",
  color: "#666"
};
export default Progressbar;
