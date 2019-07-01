import React, {Component} from 'react';
import './App.css';
import Stat from './Stat';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

export default class App extends Component {
    state = {
        todos: []
    };

    countDone() {
        let done = 0;
        this.state.todos.forEach(todo => {
            if (todo.done) {
                done++;
            }
        });
        return done;
    }

    handleDoneChange(todoIndex) {
        let updatedTodos = this.state.todos;
        updatedTodos[todoIndex].done = !updatedTodos[todoIndex].done;

        this.setState({
            todos: updatedTodos
        })
    }

    clearDone() {
        const notFinishedTodo = this.state.todos.filter((todo) => !todo.done);
        this.deleteTodo();
        this.setState({
            todos: notFinishedTodo
        })
    }

    async postTodo(newTodo) {
        await fetch('http://todos.sphinx-demo.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        })
    }

    async updateTodo() {
        await this.state.todos.forEach(todo => {
            if(todo.done) {
                fetch('http://todos.sphinx-demo.com/todos/' + todo.id, {
                    method: 'PUT',
                    body: JSON.stringify({ done: todo.done })
                });
            }
        })
    }

    async addNewTodo(newTodo) {
        await this.postTodo(newTodo);
        await this.loadTodo();
        await this.updateTodo();
    }

    async loadTodo() {
        await fetch('http://todos.sphinx-demo.com/todos')
            .then(res => res.json())
            .then(todo => this.setState({todos: todo}));
    }

    async componentDidMount() {
        await this.loadTodo();
    }

    async deleteTodo() {
        await this.state.todos.forEach(todo => {
            if(todo.done) {
                fetch('http://todos.sphinx-demo.com/todos/' + todo.id, {
                    method: 'DELETE'
                })
            }
        })
    }

    render() {
        const done      = this.countDone();
        const total     = this.state.todos.length;
        const todoStyle = {
            textDecoration: 'line-through',
            color: 'green',
        };

        return (
            <div>
                <div className={'todo-header'}>
                    <Stat done={done} total={total}/>
                    <button onClick={() => this.clearDone()}>Clear</button>
                </div>
                <hr/>
                <div className={'todo-list'}>
                    {
                        this.state.todos.map((todo, index) => {
                            if (todo.done) {
                                return (<Todo onDoneChange={() => {
                                    this.handleDoneChange(index)
                                }} key={index} todo={todo} style={todoStyle}/>);
                            }
                            return (<Todo onDoneChange={() => {
                                this.handleDoneChange(index)
                            }} key={index} todo={todo}/>);
                        })
                    }
                </div>
                <hr/>
                <div className={'new-todo'}>
                    <NewTodoForm onNewTodo={(newTodo) => {
                        this.addNewTodo(newTodo)
                    }}/>
                </div>
            </div>
        );
    }
}
