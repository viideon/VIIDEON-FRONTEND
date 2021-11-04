import React from "react";
import { Typography } from "@material-ui/core";

interface IProps {
  text: string;
}
const Label: React.FC<IProps> = ({ text }) => (
  <Typography variant="h6" style={{ fontSize: "1rem", fontWeight: 500 }}>
    {" "}
    {text}
  </Typography>
);
export default Label;
