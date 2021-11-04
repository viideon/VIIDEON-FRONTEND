import React, { Component } from "react";
import "./style.css";

export default class Countdown extends Component {
  timeout: any;
  state = {
    number: 3
  };

  componentDidMount() {
    this.timeout = setTimeout(this.updateNumber, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  updateNumber = () => {
    const nextNumber = this.state.number - 1;
    this.setState({
      number: nextNumber
    });
    if (nextNumber !== 0) {
      this.timeout = setTimeout(this.updateNumber, 1000);
    }
  };

  render() {
    return (
      <h3 className="counterRecording">
        {this.state.number !== 0 ? this.state.number : null}
      </h3>
    );
  }
}
