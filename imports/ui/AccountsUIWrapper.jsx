import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";

export default class AccountsUIWrapper extends Component {
    componentDidMount() {
        // use meteor blaze to render login button.
        this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        //clean up Blaze view
        Blaze.remove(this.view);
    }

    render() {
        return <span ref="container" />;
    }
}