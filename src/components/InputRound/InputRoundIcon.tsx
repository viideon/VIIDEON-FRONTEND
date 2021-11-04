import React from "react";
import "./style.css";

interface IProps {
  onChange: (e: any) => void;
  value: any;
  name: string;
  iconClass?: string;
  placeholder: string;
  onBlur?: any;
  type?: string;
}
const InputRoundIcon: React.FC<IProps> = ({
  onChange,
  value,
  name,
  iconClass,
  placeholder,
  onBlur,
  type
}) => {
  return (
    <div className="wrapperInputRound">
      <div className="search__container">
        <input
          className={`inputRound`}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          value={value}
          name={name}
          type={type}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default InputRoundIcon;
