import React from "react";
import { Input } from "reactstrap";

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type: any;
  value: any;
}
const InputRound: React.FC<IProps> = ({
  onChange,
  placeholder,
  name,
  type,
  value,
  onBlur,
}) => {
  return (
    <div style={inputWrapper}>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        style={inputStyle}
        value={value}
      />
    </div>
  );
};

const inputStyle = {
  borderRadius: "10rem",
  borderWidth: 0,
  borderColor: "white",
  boxShadow: "white",
};
const inputWrapper = {
  display: "flex",
  width: "100%",
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "#9f55ff",
  borderRadius: "10rem",
  justifyContent: "space-between",
};
export default InputRound;
