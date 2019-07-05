import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";

import { Tasks } from "../api/tasks";

import Task from './Task.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find text field via the React ref
        let textInput = ReactDOM.findDOMNode(this.refs.textInput);

        const text = textInput.value.trim();
        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        // clear form
        textInput.value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked)
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
        ))
    }

    render() {
        return (
            <div className="container">
                <header><h1>Todo List ({this.props.incompleteCount})</h1></header>

                <label className="hide-completed">
                    <input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted.bind(this)} />
                    Hide Completed Tasks
                </label>

                <AccountsUIWrapper />

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
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    };
})(App);