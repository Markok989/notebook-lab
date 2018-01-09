import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// TeacherNewAssignment component
class TeacherNewAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // binding methodes
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);

    }

    // methode handleInput with parameter e
    // set the state :
    //      [e.target.name] has value/path e.target.value
    // log string 'Add Section: handleInput state: ' and state of component
    handleInput(e) {

        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log('Add Section: handleInput state: ', this.state);
        })

    }

    // method submit 
    submit() {
        this.props.dispatch(saveNewAssignment());
        browserHistory.push('/teacher/assignments');
    }

    render() {

        // variable assignmentOptions has value :
        // function: which on has div element with properties
        var assignmentOptions = function () {
            return (
                <div>
                    createAssignmentCategoryDiv('Title');
                     createAssignmentCategoryDiv('Question');
                     createAssignmentCategoryDiv('Abstract');
                     createAssignmentCategoryDiv('Hypothesis');
                     createAssignmentCategoryDiv('Variables');
                     createAssignmentCategoryDiv('Materials');
                     createAssignmentCategoryDiv('Procedures');
                     createAssignmentCategoryDiv('Data');
                     createAssignmentCategoryDiv('Calculations');
                     createAssignmentCategoryDiv('Discussion');
                 </div>
            );
        }

        return (
            <div>
                <div>Section List</div>
                <label forHtml="assignmentName">Assignment Name</label>
                <input type="text" name="assignmentName" onChange={this.handleInput} />

                <label forHtml="dueDate">Due Date (optional)</label>
                <input type="text" name="dueDate" onChange={this.handleInput} />

                <label forHtml="instructions">Instructions (optional)</label>
                <input type="text" name="instructions" onChange={this.handleInput} />

                <h3>Assignment Details</h3>

                {
                    /*
                        variable assignmentOptions
                    */
                }
                {assignmentOptions}

            </div>
        );

    }

}


/********* CONNECTED COMPONENT ********/
const mapStateToProps = function (state) {
    // state
    return {
        error: state.teachers.error
    };
}
export default connect(mapStateToProps)(TeacherNewAssignment);

/*
- function createAssignmentCategoryDiv with parameter category
    - return div element with properties
        - 
*/
function createAssignmentCategoryDiv(category) {
    return (
        <div>
            <input type="checkbox" name={`include${category}checkbox`} />

            <label forHtml={`for${category}`}>{`${category}`}</label>

            <input type="textbox" name={`${category}Input`}
                placeholder="Type default text here that will appear on all student assignments" />

            <input type="checkbox" name={`${category}Editable`} />

            <input type="checkbox" name={`${category}Share`} />
        </div>
    );
}