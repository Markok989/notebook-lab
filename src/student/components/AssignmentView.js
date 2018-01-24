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
        this.props.dispatch = this.props.dispatch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAll = this.handleSaveAll.bind(this);

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

        - variable field has value of [e.target.name]

        - variable send has value of object
             - [e.target.name] has value of this.state[field]

        - constant id belongs to this.props.params

        - this component props dispatch to saveAssignment with parameters id and send

    */
    handleSave(e) {

        var field = [e.target.name];

        var send = {
            [e.target.name]: this.state[field]
        }

        const { id } = this.props.params;

        this.props.dispatch(saveAssignment(id, send));

    }

    /*
    - method handleSaveAll with parmeter e

        - log string 'save all' and this.state
        - constant id belongs to this.props.params

        - this component props dispatch to saveAssignment with parameters id and this.state
    */
    handleSaveAll(e) {

        console.log('save all', this.state);
        const { id } = this.props.params;

        this.props.dispatch(saveAssignment(id, this.state));

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

                <button name="saveAll" onClick={this.handleSaveAll}>Save All</button>

            </div>

        );

    }
}

/*
- function editable with parameters: section, ategory, handleChange, handleSave
    
    - log parameter section[section + '_editable']

    - condition if section with parmaters [category +(plus) string '_editable' ]

        - condition if section with parmaters [category +(plus) string '_content' ]

            - log string 'YAAAW'

            - return div element with properties

                - element label with property {category}

                - element textarea with attributes
                    - name {category}
                    - placeholder "Type here.."
                    - cols "30" , rows "5"
                    - onChange use method handleChange
                    - property
                        - {section[category + '_content']}

                - element button with attributes
                    - name {category}
                    - onClick use method handleSave
                    - property
                        - text Save

        - else

            - return div element with properties

                - element label with property {category}
                
                - element textarea with attributes
                    - name {category}
                    - placeholder "Type here.."
                    - cols "30" , rows "5"
                    - onChange use method handleChange
                  
                - element button with attributes
                    - name {category}
                    - onClick use method handleSave
                    - property
                        - text Save
        
    
    - else if condition
      section[category + '_editable'] is strictly the same as null
      OR(||)
      section[category + '_content'] is strictly the same as null null

        return
    
    - else 

        - log string: 'cannot edit' and  section[category + '_content'],

        -return

            - div element with property
            
                - element h3 with property {category}

                - element p with property {section[category + '_content']}
*/
function editable(section, category, handleChange, handleSave) {

    console.log(section[section + '_editable']);

    if (section[category + '_editable']) {

        if (section[category + '_content']) {

            console.log('YAAAW');

            return (

                <div>

                    <label>{category}:</label>

                    <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>
                        {section[category + '_content']}
                    </textarea>

                    <button name={category} onClick={handleSave}>Save</button>

                </div>

            );

        } else {

            return (

                <div>

                    <label>{category}:</label>

                    <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange} />

                    <button name={category} onClick={handleSave}>Save</button>

                </div>

            );

        }

    } else if (section[category + '_editable'] === null || section[category + '_content'] === null) {

        return

    } else {

        return (

            <div>

                <h3>{category}:</h3>

                <p>{section[category + '_content']}</p>

            </div>

        );
    }

}


/********** COMPONENT CONNECTED **************/
const mapStateToProps = function (state) {
    
    console.log('mapStateToProps', state);

    return {
        assignment: state.students.assignment,
        studentInfo: state.students.studentInfo
    }

}
export default connect(mapStateToProps)(Assignment);