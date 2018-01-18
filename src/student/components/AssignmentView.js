import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAssignment, saveAssignment } from '../actions';

// component Assignment
class Assignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {};
        console.log(this.props.sectionID);

        // binding
        this.handleChange = this.handleChange.bind(this);

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

    /*
    - method handleChange with parameter e
        
        - set the state
            - [e.target.name] has value of e.target.value

    */
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    /*
    - method handleSave with parmeter e

        - log string "YAWW"

        - constant id belongs to this.props.params

    */
    handleSave(e) {

        console.log('YAWW');

        const { id } = this.props.params;

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
                {editable(assignment.title, 'title', this.handleChange, this.handleSave)}
                {editable(assignment.question, 'question', this.handleChange, this.handleSave)}
                {editable(assignment.abstract, 'abstract', this.handleChange, this.handleSave)}
                {editable(assignment.hypothesis, 'hypothesis', this.handleChange, this.handleSave)}
                {editable(assignment.variable, 'variable', this.handleChange, this.handleSave)}
                {editable(assignment.material, 'material', this.handleChange, this.handleSave)}
                {editable(assignment.procedure, 'procedure', this.handleChange, this.handleSave)}
                {editable(assignment.data, 'data', this.handleChange, this.handleSave)}
                {editable(assignment.calculation, 'calculation', this.handleChange, this.handleSave)}
                {editable(assignment.discussion, 'discussion', this.handleChange, this.handleSave)}
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
- function editable with parameters: section, ategory, handleChange, handleSave
    
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
function editable(section, category, handleChange, handleSave) {

    console.log(section[section + '_editable']);

    if (section[category + '_editable']) {

        return (

            <form>

                <label>{category}:</label>

                <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange} />

                <button name={category} onClick={handleSave}>Save</button>

            </form>

        )

    } else if (section[category + '_editable'] === null || section[category + '_content'] === null) {

        return

    } else {

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



