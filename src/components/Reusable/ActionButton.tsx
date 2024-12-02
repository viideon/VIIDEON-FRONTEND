import React from "react";
import { Fab } from "@material-ui/core";

interface IProps {
  text: string;
  onClick?: () => void;
  style?: object;
  color?: string;
  bgColor?: string;
  onKeyDown?: any;
  id?: string;
}
const Button: React.FC<IProps> = ({
  text,
  onClick,
  style,
  color,
  bgColor,
  onKeyDown,
  id
}) => {
  return (
    <Fab
      className="buttonWrapper"
      variant="extended"
      onClick={onClick}
      onKeyDown={onKeyDown}
      id={id}
      style={{
        backgroundColor: bgColor,
        color: color,
        height: "40px",
        border: "none",
        outline: "none",
        ...style
      }}
    >
      {text}
    </Fab>
  );
};

export default Button;
