import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommittedAssignments } from '../actions';
import Logout from '../../auth/logout';

// component GradeAssignment
class GradeAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};
        console.log('here?');
    }

    /*
    - componentDidMount is invoked immediately after a component is mounted,

        - constants id, reportid belongs to this.props.params
        - log constants id and reportid

        - propst dispatch to function getCommittedAssignments(from actions) with parameters id, reportid
    */
    componentDidMount() {

        const { id, reportid } = this.props.params;
        console.log(id, reportid);

        this.props.dispatch(getCommittedAssignments(id, reportid));

    }

    // render method
    render() {

        var form;

        // constant assignment belongs to this.props
        const { assignment } = this.props;

        /*
        - condition if not assignment
            - return null
        */
        if (!assignment) {
            return null
        }

        var committedAssignment =

            <div>

                {committed(assignment.title, 'title')}
                {committed(assignment.question, 'question')}
                {committed(assignment.abstract, 'abstract')}
                {committed(assignment.hypothesis, 'hypothesis')}
                {committed(assignment.variable, 'variable')}
                {committed(assignment.material, 'material')}
                {committed(assignment.procedure, 'procedure')}
                {committed(assignment.data, 'data')}
                {committed(assignment.calculation, 'calculation')}
                {committed(assignment.discussion, 'discussion')}

            </div>;

        return (

            <div>

                Hi
                {committedAssignment}

            </div>

        ); // end return

    } // end render 

}

/*
- function committed with parameters section and category

    - condition if section[category + '_content']

        - returns div element with property

            - element h3 has property {category}:
            - element p has property {section[category + '_content']}
*/
function committed(section, category) {

    if (section[category + '_content']) {

        return (

            <div>

                <h3>{category}:</h3>
                <p>{section[category + '_content']}</p>

            </div>

        );

    }

}

/************ CONNECTED COMPONENT ************/
var mapStateToProps = function (state) {

    return {
        assignment: state.teachers.committedAssignment
    }

}

export default connect(mapStateToProps)(GradeAssignment);