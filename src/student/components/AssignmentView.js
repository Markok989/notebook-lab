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
                {editable(assignment.title, 'title')}
                {editable(assignment.question, 'question')}
                {editable(assignment.abstract, 'abstract')}
                {editable(assignment.hypothesis, 'hypothesis')}
                {editable(assignment.variable, 'variable')}
                {editable(assignment.material, 'material')}
                {editable(assignment.procedure, 'procedure')}
                {editable(assignment.data, 'data')}
                {editable(assignment.calculation, 'calculation')}
                {editable(assignment.discussion, 'discussion')}
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
- function editable with parameters section and category
    
    - log parameter section[section + '_editable']

    - condition if section with parmaters [category +(plus) string '_editable' ]

        - log string 'section true'
        
        - return
            - form element with property
    
    - else if condition
      section[category + '_editable'] is strictly the same as null
      OR(||)
      section[category + '_content'] is strictly the same as null null

        return
    
    - else 

        - log string: 'cannot edit' and  section[category + '_content'],

        -return

            - div element with property 
*/
function editable(section, category) {

    console.log(section[section + '_editable']);

    if (section[category + '_editable']) {

        console.log('section true');

        return (

            <form>
                <label>{category}:</label>

                <textarea name="content" placeholder="Type here.." cols="30" rows="5" onChange={e => this.handleChange(e)} />

                <input type="submit" value="Save" />
            </form>

        )

    } else if (section[category + '_editable'] === null || section[category + '_content'] === null) {

        return

    } else {

        console.log('cannot edit', section[category + '_content']);

        return (

            <div>
                <h3>{category}:</h3>
                <p>{section[category + '_content']}</p>
            </div>

        )
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



