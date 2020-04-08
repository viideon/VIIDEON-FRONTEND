import React, { useState, useEffect } from "react";
import { UncontrolledAlert } from "reactstrap";

interface IProps {
  text?: string;
  color?: string;
}
const Alert: React.FC<IProps> = ({ text, color }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 6000);
  }, []);
  return (
    <>{show && <UncontrolledAlert color={color}>{text}</UncontrolledAlert>}</>
  );
};

export default Alert;
