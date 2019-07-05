import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from "../api/tasks";

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Find text field via the React ref
        let textInput = ReactDOM.findDOMNode(this.refs.textInput);

        const text = textInput.value.trim();
        Tasks.insert({
            text, createdAt: new Date(),
        });

        // clear form
        textInput.value = '';
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ))
    }

    render() {
        return (
            <div className="container">
                <header><h1>Todo List</h1></header>

                <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="textInput" placeholder="Type to add new tasks" />
                </form>
                <br />
                <ul>{this.renderTasks()}</ul>
            </div>
        )
    }
}

export default withTracker(() => {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1} }).fetch(),
    };
})(App);