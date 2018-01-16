import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAssignment } from '../actions';

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
    // constant id belongs to this.props.params
    // props dipsatch to getAssignment with parameter id
    // log string 'ass view' and state of this component
    componentDidMount() {

        const { id } = this.props.params;

        this.props.dispatch(getAssignment(id));

        console.log('ass view', this.state);

    }

    // render method
    render() {

        // constant assignment and studentInfo belongs to this.props
        const { assignment, studentInfo } = this.props;

        /*
        - condition if not assignments return null
        */
        if (!assignment) {
            return null
        }

        // variable assignmentOptions with properties
        // div element contain set of functions
        var assignmentOptions =

            <div>
                {editable(assignment.title)}
                {editable(assignment.question)}
                {editable(assignment.abstract)}
                {editable(assignment.hypothesis)}
                {editable(assignment.variable)}
                {editable(assignment.material)}
                {editable(assignment.procedure)}
                {editable(assignment.data)}
                {editable(assignment.calculation)}
                {editable(assignment.discussion)}
            </div>;

        return (
            <div>

                <h3>Complete the following assignment</h3>

                {assignmentOptions}

            </div>
        )

    }
}

/*
- function editable with parameter section
    
    - log parameter section

    - condition if section with parmaters [sections +(plus) string '_editable' ]
        
        - return
            - form element with property
    
    - else 

        - div element with property
*/
function editable(section) {

    console.log(section);

    if (section[section + '_editable']) {

        return (
            <form>
                <label>section:</label>

                <textarea name="content" placeholder="Type here.." cols="30" rows="5" onChange={e => this.handleChange(e)} />

                <input type="submit" value="Save" />
            </form>

        )

    } else {
        <div>
            <p>section[section + '_content']</p>
        </div>
    }

}

const mapStateToProps = function (state) {
    console.log('mapStateToProps', state);

    return {
        assignment: state.students.assignment,
        studentInfo: state.students.studentInfo
    }
}
export default connect(mapStateToProps)(Assignment);



