import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAssignment, saveAssignment, udpateAssignmentStatus, commitAssignment } from '../actions';
import {
    Card,
    Row,
    Col,
    Container,
    SideNav,
    SideNavItem,
    Button,
    Collapsible,
    CollapsibleItem,
    Modal,
    Input,
    Collection,
    CollectionItem
} from 'react-materialize';


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
        this.handleCommit = this.handleCommit.bind(this);

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

        - variable field has value of e.target.name

        - log string 'data' and variable field

        - variable send has value of object
             - [field] has value of this.state[field]

        - log string 'send' and variable send

        - constant id belongs to this.props.params

        - this component props dispatch to saveAssignment with parameters id and send

    */
    handleSave(e) {

        var field = e.target.name;

        console.log('dield', field);

        var send = {
            [field]: this.state[field]
        }

        console.log('send', send);

        const { id } = this.props.params;

        this.props.dispatch(saveAssignment(id, send));

    }

    /*
    - method handleCommit with parameter e

        - constant id belongs to this.props.params

        - props dispatch to function getAssignment(from actions) with parameter id
        - props dispatch to function commitAssignment(from actions) with parameters id and this.state

    */
    handleCommit(e) {

        const { id } = this.props.params;

        this.props.dispatch(getAssignment(id));
        this.props.dispatch(commitAssignment(id, this.state))

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

        var form;

        // constant assignment and studentInfo belongs to this.props
        const { assignment, studentInfo } = this.props;

        /*
        - condition if not assignments return null
        */
        if (!assignment) {
            return null
        }

        console.log('STATUS', assignment.status);


        // variable assignmentOptions with properties
        // div element contain set of functions
        var assignmentOptions =
            <div>

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

                </div>

                <Row>

                    <Col s={4}>

                        <Button name='saveAll' onClick={this.handleSaveAll}>
                            Save All
                        </Button>

                    </Col>

                </Row>

                <Row>

                    <Col s={4}>

                        <Button className="deep-purple" name='commit' onClick={this.handleCommit}>
                            Commit
                        </Button>

                    </Col>

                </Row>
            </div>;

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

        /*
        - condition if assignment.status is strictly the same as string 'COMMITTED'
          OR(||)
          assignment.status is strictly the same as string 'GRADED'
          OR(||)
          assignment.status is strictly the same as string 'PENDING'

            - form has value of committedAssignment

        - else
            - form has value of assignmentOptions
        */
        if (assignment.status === 'COMMITTED' || assignment.status === 'GRADED' || assignment.status === 'PENDING') {

            form = committedAssignment;

        } else {
            form = assignmentOptions;
        }


        return (

            <div className="blueBox">

                <h5>{getAssignmenName(this.props.params.classid, this.props.params.id, this.props.studentInfo)}</h5>

                {form}

            </div>

        );

    }
}

/*
- function editable with parameters: section, category, handleChange, handleSave, handleSaveAll, handleCommit

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

                    - element Button with attributes
                    - name {category}
                    - onClick use method handleSave
                    - property
                        - text Save

        - else

            - return Card with attribute title {category} and properties

                - element textarea with attributes
                    - name {category}
                    - placeholder "Type here.."
                    - cols "30" , rows "5"
                    - onChange use method handleChange

                - element Button with attributes
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

        - return Card with attribute title {capitalize(category)} and properties

            - element p with property {section[category + '_content']}

                    */
function editable(section, category, handleChange, handleSave, handleSaveAll, handleCommit) {

    console.log(section[section + '_editable']);

    if (section[category + '_editable']) {

        if (section[category + '_content']) {

            console.log('YAAAW');

            return (

                <Card title={capitalize(category)}>

                    <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>
                        {section[category + '_content']}
                    </textarea>

                    <div>
                        <Button name={category} onClick={handleSave}>Save</Button>
                    </div>

                </Card>

            );

        } else {

            return (

                <Card title={category}>

                    <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange} />

                    <Button name={category} onClick={handleSave}>Save</Button>

                </Card>

            );

        }

    } else if (section[category + '_editable'] === null || section[category + '_content'] === null) {

        return

    } else {

        return (

            <Card title={capitalize(category)}>

                <p>{section[category + '_content']}</p>

            </Card>

        );
    }

}

/*
- function committed with parameters section, category

    - condition if section[category + '_content']

        - return Card with attribute title {capitalize(category)} and properties

            - element p wit property {section[category + '_content']}
                    */
function committed(section, category) {

    if (section[category + '_content']) {

        return (

            <Card title={capitalize(category)}>

                <p>{section[category + '_content']}</p>

            </Card>

        );

    }

}


/*
- function capitalize with parameter word

    - returns word with charAt(0) and toUpperCase() +(plus) word.slice(1)
*/
function capitalize(word) {

    return word.charAt(0).toUpperCase() + word.slice(1);

}

/*
- function getAssignmenName with parameters assignmentId, classId, studentInfo

    - log string 'getAssignName: ' and parameter studentInfo

    - variable currCourse has value of parameter studentInfo and course, then use filter with parameter course to access to fucntion
    
        - return classId as course.course_id
        
    - log cariable currCourse

    - variable currAssignhas value of currCourse[0].assignments then with filter and parameter asgnmt access to function

        - return assignmentId as asgnmt.assignment_id

    - on the end return JavaScript template `${currCourse[0].course_name}:  ${currAssign[0].assignment_name}`
*/
function getAssignmenName(assignmentId, classId, studentInfo) {

    console.log('getAssignName: ', studentInfo);

    var currCourse = studentInfo.courses.filter(course => {

        return course.course_id = classId;

    });

    console.log(currCourse);

    var currAssign = currCourse[0].assignments.filter(asgnmt => {

        return asgnmt.assignment_id = assignmentId;

    });

    return `${currCourse[0].course_name}:  ${currAssign[0].assignment_name}`;
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