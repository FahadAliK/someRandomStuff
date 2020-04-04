import React, { Component } from "react";
class Rando extends Component {
  constructor(props) {
    super(props);
    this.state = { num: 0 };
    this.makeTimer();
  }
  makeTimer() {
    setInterval(() => {
      const randNum = Math.floor(Math.random() * (this.props.maxNum + 1));
      this.setState({ num: randNum });
    }, 150);
  }
  render() {
    return (
      <div className="Rando">
        <h1>{this.state.num}</h1>
      </div>
    );
  }
}
export default Rando;
