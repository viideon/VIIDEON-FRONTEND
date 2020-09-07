import React from "react";
import { Button } from "@material-ui/core";

interface IProps {
    moveToNextStep: () => void;
}
class SelectTemplate extends React.Component<IProps> {
    render() {
        return <div className="wrapperSelectTemplate">
            <h3>Select template to for your Campaign</h3>
            <Button onClick={this.props.moveToNextStep}>Click to Proceed</Button>
        </div>
    }
}

export default SelectTemplate;