import React, {Component} from 'react';
class Button extends Component {
    render() {
        return(
            <button onClick={function() {
                alert('CLICKED.!');
            }}>CLICK ME.!</button>
        );
    };
}
export default Button;