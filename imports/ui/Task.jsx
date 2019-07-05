import React, {Component} from 'react'

//Taks component - represents a single item
export default class Task extends Component {
    render() {
        return (
            <li>{this.props.task.text}</li>
        )
    }
}