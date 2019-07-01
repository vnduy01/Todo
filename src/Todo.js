import React, {Component} from 'react';

export default class Todo extends Component {
    render() {
        const todo = this.props.todo;
        
        return (
            <div>
                <input type="checkbox" onChange={this.props.onDoneChange} checked={todo.done}></input>
                <label>{todo.name}</label>
            </div>
        );
    } 
}
