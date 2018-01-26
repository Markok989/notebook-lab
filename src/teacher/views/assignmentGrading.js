import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCommittedAssignments } from '../actions';


class Assignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};
    }

    componentDidMount() {

        const { id, studentid } = this.props.params;

        this.props.dispatch(getCommittedAssignments())

    }

    render() {

        return (

            <div>

            </div>

        );

    }

}