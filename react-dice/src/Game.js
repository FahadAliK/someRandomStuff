import React, {Component} from 'react';
import Rando from './Rando;'
import './Game.css';
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            gameOver: false,
        };
    }
    render(){
        return(
            <div className='Game'>
                <h1>YOUR SCORE IS: {this.state.score}</h1>
            </div>
        );
    }
}
export default Game;