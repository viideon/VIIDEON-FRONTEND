import React from "react";

interface IProps {
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
}
class AddText extends React.Component<IProps> {
  render() {
    return <div style={{ marginTop: "50px", padding: "20px" }}></div>;
  }
}

export default AddText;
