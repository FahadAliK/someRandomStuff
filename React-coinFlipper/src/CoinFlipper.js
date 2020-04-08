import React, { Component } from "react";
import { choice } from "./helpers";
import Coin from "./Coin";
class CoinFlipper extends Component {
  static defaultProps = {
    coin: [
      { side: "heads", imgSrc: "https://tinyurl.com/react-coin-heads-jpg" },
      { side: "tails", imgSrc: "https://tinyurl.com/react-coin-tails-jpg" },
    ],
  };
  constructor(props) {
    super(props);
    this.state = {
      currentCoin: null,
      numFlips: 0,
      numHeads: 0,
      numTails: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  flipCoin() {
    const randomCoin = choice(this.props.coin);
    this.setState((currentState) => {
      return {
        currentCoin: randomCoin,
        numFlips: currentState.numFlips++,
        numHeads: currentState.numHeads + (randomCoin.side === "heads" ? 1 : 0),
        numTails: currentState.numTails + (randomCoin.side === "tails" ? 1 : 0),
      };
    });
  }
  handleClick(event) {
    this.flipCoin();
  }
  render() {
    return (
      <div className="CoinFlipper">
        <h2>Let's Flip a Coin</h2>
        {this.state.currentCoin && <Coin info={this.state.currentCoin} />}
        <p>
          Out of {this.state.numFlips} flips, there have been{" "}
          {this.state.numHeads} heads and {this.state.numTails} tails
        </p>
        <button onClick={this.handleClick}>Flipe Me.!</button>
      </div>
    );
  }
}
export default CoinFlipper;
