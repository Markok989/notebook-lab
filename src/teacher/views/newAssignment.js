import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections, saveNewAssignment } from '../actions';

// TeacherNewAssignment component
class TeacherNewAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            AbstractEditable: true,
            AbstractInput: "",
            AbstractShare: false,
            CalculationsEditable: true,
            CalculationsInput: "",
            CalculationsShare: false,
            DataEditable: true,
            DataInput: "",
            DataShare: false,
            DiscussionEditable: true,
            DiscussionInput: "",
            DiscussionShare: false,
            HypothesisEditable: true,
            HypothesisInput: "",
            HypothesisShare: false,
            MaterialsEditable: true,
            MaterialsInput: "",
            MaterialsShare: false,
            ProceduresEditable: true,
            ProceduresInput: "",
            ProceduresShare: false,
            QuestionInput: "",
            QuestionShare: false,
            TitleInput: "",
            TitleShare: false,
            VariablesEditable: true,
            VariablesInput: "",
            VariablesShare: false,
            assignmentName: "",
            dueDate: "",
            groupLabCb: false,
            includeAbstract: false,
            includeCalculations: false,
            includeData: false,
            includeDiscussion: false,
            includeHypothesis: false,
            includeMaterials: false,
            includeProcedures: false,
            includeQuestion: false,
            includeTitle: false,
            includeVariables: false,
            instructions: "",
            QuestionEditable: true,
            sectioncb3: false,
            TitleEditable: true
        }

        // binding methodes
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);

    }

    // componentDidMount() is invoked immediately after a component is mounted.
    //      props dispatch access to function getAllSections from teacher actions
    componentDidMount() {
        this.props.dispatch(getAllSections());
    }


    // - method handleInput with parameter event
    //      - target has value of event.target,
    //      - condition if target.type is the same as 'checkbox'
    //          - log target.checked
    //      - 'value' has value of 
    //          target.type strictly the same as 'checkbox'
    //          and this const has two values based on condition
    //          first is target.checked and second is target.value
    //      - name has value as target.name
    // - set the state, 
    //      - property [name] has value 'value'
    //      - log string 'New Assignment: handleInput state: ' and this.state
    handleInput(event) {

        const target = event.target;
        if (target.type == 'checkbox') {
            console.log(target.checked)
        }

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;



        this.setState({
            [name]: value
        }, () => {
            console.log('New Assignment: handleInput state: ', this.state);
        });

    }


    // method submit 
    // props dispatch access to function getAllSections from teacher actions with parameter
    // and this.state
    // log : state of this(TeacherNewAssignment) component
    // browserHistory push to path '/teacher/assignments'
    submit() {

        this.props.dispatch(saveNewAssignment(this.state));
        // validation!

        // console.log(this.state);
        // browserHistory.push('/teacher/assignments');

    }



    render() {

        const { sections } = this.props;

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

                {createAssignmentCategoryDiv('Title', this.handleInput)}
                {createAssignmentCategoryDiv('Question', this.handleInput)}
                {createAssignmentCategoryDiv('Abstract', this.handleInput)}
                {createAssignmentCategoryDiv('Hypothesis', this.handleInput)}
                {createAssignmentCategoryDiv('Variables', this.handleInput)}
                {createAssignmentCategoryDiv('Materials', this.handleInput)}
                {createAssignmentCategoryDiv('Procedures', this.handleInput)}
                {createAssignmentCategoryDiv('Data', this.handleInput)}
                {createAssignmentCategoryDiv('Calculations', this.handleInput)}
                {createAssignmentCategoryDiv('Discussion', this.handleInput)}

            </div>;
        /* 
        - contition if not sections
            - return null
        - else 
            - return jsx of component
        */
        if (!sections) {
            return null;
        } else {
            return (
                <div>
                    <div>Section List</div>
                    {
                        /*
                        - function makeSectionList use sections and property sections of this cpomponent 
                        */
                    }
                    {makeSectionList(sections, this.makeSectionList)}

                    <label forHtml="assignmentName">Assignment Name</label>
                    <input type="text" name="assignmentName" onChange={this.handleInput} />

                    <label forHtml="dueDate">Due Date (optional)</label>
                    <input type="text" name="dueDate" onChange={this.handleInput} />

                    <label forHtml="instructions">Instructions (optional)</label>
                    <input type="text" name="instructions" onChange={this.handleInput} />

                    <label forHtml="groupLabCb">Group Lab?</label>

                    <input type="checkbox" name="groupLabCb" onChange={this.handleInput} checked />

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
function createAssignmentCategoryDiv(category, save) {
    return (
        <div style={assignmentGridStyle}>
            <input type="checkbox" name={`include${category}`} onChange={save} />

            <label forHtml={`for${category}`}>{`${category}`}</label>

            <input type="text" name={`${category}Input`}
                placeholder="Type default text here that will appear on all student assignments"
                onChange={save} style={inputStyle} />

            <input type="checkbox" name={`${category}Editable`} checked onChange={save} />

            <input type="checkbox" name={`${category}Share`} onChange={save} />
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
function makeSectionList(items, save) {

    var itemList = items.map((item) => {
        console.log(item);

        return (
            <li key={item.id.toString()}>
                <input type="checkbox" name={`section${item.id}`} onChange={save} />{item.name}
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

var inputStyle = {
    width: '400px'
}