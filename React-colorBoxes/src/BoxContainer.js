import React, { Component } from "react";
import Box from "./Box";
import "./BoxContainer.css";
class BoxContainer extends Component {
  static defaultProps = {
    numBoxes: 18,
    colors: ["purple", "red", "green", "orange", "blue", "yellow"],
  };
  render() {
    const boxes = Array.from({ length: this.props.numBoxes }).map(() => {
      return <Box colors={this.props.colors}/>;
    });
    return <div className="BoxContainer">{boxes}</div>;
  }
}
export default BoxContainer;
