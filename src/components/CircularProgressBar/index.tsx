import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";

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
      <p className="headingProgressBar">{heading}</p>
    </div>
  );
};

export default Progressbar;
