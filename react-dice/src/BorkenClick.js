import React, { Component } from "react";
class BrokenClick extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    if (this.state.clicked) {
      this.setState({ clicked: false });
    } else {
      this.setState({ clicked: true });
    }
  }
  render() {
    return (
      <div className="BrokenClick">
        <h1>{this.state.clicked ? "CLICKED" : "NOT CLICKED"}</h1>
        <button onClick={this.handleClick}>CLICK ME.!</button>
      </div>
    );
  }
}
export default BrokenClick;
