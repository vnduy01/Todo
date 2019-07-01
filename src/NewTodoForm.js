import React, {Component} from 'react';

export default class NewTodoForm extends Component {
    state = {
        newTodoName : ''
    }
    
    onInputChange(newTodoName) {
        this.setState({
        newTodoName : newTodoName
        })
    }
    
    render() {
        const {onNewToDo} = this.props;
        return (
            <div>
                <input type="text" onChange={(even) => {
                    this.onInputChange(even.target.value)
                }}>
                </input>
                <input type="submit" onClick={() => {
                    onNewToDo({
                        name:this.state.newTodoName,
                        done: false
                    })
                }}>
                </input>
            </div>
        )
    }
}
