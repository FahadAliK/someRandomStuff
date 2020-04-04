import React, { Component } from "react";
class Clicker extends Component {
  constructor(props) {
    super(props);
    this.state = { num: 0 };
    this.genRandom = this.genRandom.bind(this);
  }
  genRandom(event) {
    const randNum = Math.floor(Math.random() * 10) + 1;
    this.setState({ num: randNum });
  }
  render() {
    return (
      <div className="Clicker">
        <h1>Number is: {this.state.num}</h1>
        {this.state.num === 7 && <h2>YOU WIN</h2>}
        {this.state.num !== 7 && (
          <button onClick={this.genRandom}>RandomNumber</button>
        )}
      </div>
    );
  }
}
export default Clicker;
