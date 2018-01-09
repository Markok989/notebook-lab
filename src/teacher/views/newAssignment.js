import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections } from '../actions';

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

    // componentDidMount() is invoked immediately after a component is mounted.
    // condition if not !this.props.sections
    //      props dispatch access to function getAllSections from teacher actions
    componentDidMount() {
        if (!this.props.sections) {
            this.props.dispatch(getAllSections());
        }
    }

    // method submit 
    submit() {
        this.props.dispatch(saveNewAssignment());
        browserHistory.push('/teacher/assignments');
    }

    render() {

        // variable assignmentOptions has value :
        // function: which on has div element with properties
        var assignmentOptions =
            <div >
                <div style={assignmentGridStyle}>
                    <p>Include</p>
                    <p>Category</p>
                    <p>Default values</p>
                    <p>Students can edit?</p>
                    <p>Shared amongst groups?</p>
                </div>

                {createAssignmentCategoryDiv('Title')}
                {createAssignmentCategoryDiv('Question')}
                {createAssignmentCategoryDiv('Abstract')}
                {createAssignmentCategoryDiv('Hypothesis')}
                {createAssignmentCategoryDiv('Variables')}
                {createAssignmentCategoryDiv('Materials')}
                {createAssignmentCategoryDiv('Procedures')}
                {createAssignmentCategoryDiv('Data')}
                {createAssignmentCategoryDiv('Calculations')}
                {createAssignmentCategoryDiv('Discussion')}

            </div>;

        return (
            <div>
                <div>Section List</div>
                {
                    /*
                    - function makeSectionList use property sections of this cpomponent 
                    */
                }
                {makeSectionList(this.props.sections)}

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
        error: state.teachers.error,
        sections: state.teachers.sections
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
        <div style={assignmentGridStyle}>
            <input type="checkbox" name={`include${category}checkbox`} />

            <label forHtml={`for${category}`}>{`${category}`}</label>

            <input type="textbox" name={`${category}Input`}
                placeholder="Type default text here that will appear on all student assignments" />

            <input type="checkbox" name={`${category}Editable`} />

            <input type="checkbox" name={`${category}Share`} />
        </div >
    );
}

/*
- function makeSectionList with parameter items
    - variable itemList has value of item with map with parameter item
        - log parameter item
        - return 
            - element li with attribute key={item.id.toString()}
                - input element
    - return element ul with property {itemList}
*/
function makeSectionList(items) {

    var itemList = items.map((item) => {
        console.log(item);

        return (
            <li key={item.id.toString()}>
                <input type="checkbox" name={`section${item.id}`} />{item.name}
            </li>
        );
    });
    return (
        <ul>
            {itemList}
        </ul>
    );
}

/************** STYLES ****************/

var assignmentGridStyle = {
    display: "grid",
    gridTemplateColumns: '100px 100px auto 100px 100px'
}