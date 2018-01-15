import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAssignmentList } from '../actions';

// component Assignment
class Assignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};
        console.log(this.props.sectionID);

    }

    // componentDidMount is invoked immediately after a component is mounted,
    // props dipsatch to getAssignment with parameter assignmentID
    componentDidMount() {
        this.props.dispatch(getAssignment(assignmentID));
    }

// render method
    render() {

        // constant assignments belongs to this.props
        const { assignments } = this.props;

        /*
        - condition if not assignments return null
        */
        if (!assignments) {
            return null
        }

        return (
            <div>
                <ul>
                    {
                        /*
                        - assignments use .map with parameter assignment to access function
                            - li element with property {assignment.assignment_name}
                        */
                    }
                    {assignments.map(assignment => (
                        <li>{assignment.assignment_name}</li>
                    ))}

                </ul>
            </div>
        )

    }
}