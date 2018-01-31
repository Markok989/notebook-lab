import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';
import { getStudentAssignmentList, getAssignmentProperties } from '../actions';

// component SpecificAssignment
class SpecificAssignment extends React.Component {

    //constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            studentList: [],
            showCategoriesToggle: false
        };

        // binding
        this.showCategories = this.showCategories.bind(this);

    }

    /* 
    - componentWillMount is invoked immediately before a component is mounted

        - log string 'Specific Assignment for a given section assignmentId' and this.props.params.id

        - props dispatch togetStudentAssignmentList(from actions) and parameter this.props.params.id

        - props dispatch getAssignmentProperties(from actions) and parameter this.props.params.id
        
    */
    componentWillMount() {

        //needt to get list of students in this section and the id of their students_report

        console.log('Specific Assignment for a given section assignmentId', this.props.params.id);

        this.props.dispatch(getStudentAssignmentList(this.props.params.id));

        this.props.dispatch(getAssignmentProperties(this.props.params.id))

    }

    /*
    - showCategories method

        - set the state with property
            - showCategories is not this.state.showCategoriesToggle
    */
    showCategories() {

        console.log('clicked');

        this.setState({
            showCategories: !this.state.showCategoriesToggle
        });

    }


    // render method
    render() {

        // constants showCategories belongs to this.state
        const { showCategories } = this.state;

        // constants studentList, currAssignmentId, assignmentProperties belongs to this.props
        const { studentList, currAssignmentId, assignmentProperties } = this.props;

        // variable assignmentName has for value empty string
        var assignmentName = '';

        /* 
        - condition if studentList

            - variable studentHtmlList has value of makeInnerList with parameters studentList, assignmentId
            - assignmentName has for value studentList[0].name
        */
        if (studentList) {

            var studentHtmlList = makeInnerList(studentList, currAssignmentId);
            assignmentName = studentList[0].name;

        }

        /* 
        - condition if studentList
      
            - variable selector has value of function makeSelector with parameter assignmentProperties
        */
        if (assignmentProperties) {

            var selector = makeSelector(assignmentProperties);

        }

        /*
        - return div element with property {studentHtmlList}
        */
        return (

            <div>

                <Row>

                    <Col m={12}>

                        <Breadcrumb className="indigo">
                            <MenuItem>Assignments</MenuItem>
                            <MenuItem>{assignmentName}</MenuItem>
                        </Breadcrumb>

                    </Col>

                </Row>

                <Row>

                    <Col m={6}>

                        <Input type="checkbox" label="Grade Anonymously" />
                        <Input type="checkbox" label="Randomize Students" />
                        <Input type="checkbox" label="Grade By Group" />
                        <Input type="checkbox" label="Grade By Category" onClick={this.showCategories} />

                    </Col>

                </Row>

                <Row>

                    <Col m={12}>

                        {showCategories && <div>

                            <Row>

                                <Col m={8}>

                                    {makeSelector(assignmentProperties)}

                                </Col>

                                <Col m={4}>

                                    <div>

                                        <Button name="selectCategory">Select</Button>

                                    </div>

                                </Col>

                            </Row>

                            <div>

                                <Link to={`/teacher/grading/assignment/${this.props.params.id}/${currAssignmentId}/titles`}>>
                                    Grade Titles
                                </Link>

                            </div>

                        </div>}

                    </Col>

                </Row>

                <Row>

                    <Col m={12}>
                        <p>Click a student to grade his/her report</p>
                    </Col>

                </Row>

                <Row>

                    <Col m={12}>
                        {studentHtmlList}
                    </Col>

                </Row>

            </div>

        );
    }

}


/************* HELPER FUNCTIONS ***************/
/*
- function makeInnerList with parameters items and assignmentId

    - variable itemList has value of items and use map with parameter item to access to function

        - log string 'studentListItem: ' and parameter item
        - variable status has value of function determineStatus with parameters item.status and assignmentId

        - return

            - element CollapsibleItem with attribute key {item.report_id.toString()} and peroperty

                - element link with path {`/teacher/grading/assignment/${assignmentId}/student/${item.report_id}`}
                and property

                    -   {item.first_name}  {item.last_name}

                - element p with style {statusStyle} and proprerty text 'Status: ' {status}

                - return

        - element Collection with property  {itemList}
                */
function makeInnerList(items, assignmentId) {

    var itemList = items.map((item) => {

        console.log('studentListItem: ', item);
        var status = determineStatus(item.status, assignmentId);

        return (

            <CollapsibleItem key={item.report_id.toString()}>

                <Link to={`/teacher/grading/assignment/${assignmentId}/student/${item.report_id}`}>
                    {item.first_name}  {item.last_name}
                </Link>

                <p style={statusStyle}>Status: {status} </p>

            </CollapsibleItem>

        );

    });

    return (

        <Collection>
            {itemList}
        </Collection>

    );

}

/*
- function determineStatus with parameter status

    - condition if status
        - return status
    else
        - return string 'Not Started'
*/
function determineStatus(status) {

    if (status) {
        return status;
    } else {
        return 'Not Started';
    }

}

/*
- function makeSelector with parameter assignmentProps

    - log string 'MAKE SELECTOR' and parameter assignmentProps
    
    - returns

        - elemet Input with attribute 
            - s - {12} 
            - type - 'select' 
            - label - "Category to Grade Selection"
            - defaultValue - '1'
            - property

                - element option with attribute value '1' and property text Title
                - element option with attribute value '2' and property text Question
                - element option with attribute value '3' and property text Option 3
*/
function makeSelector(assignmentProps) {

    console.log('MAKE SELECTOR', assignmentProps);

    return (

        <Input s={12} type='select' label="Category to Grade Selection" defaultValue='1'>

            <option value='1'>Title</option>
            <option value='2'>Question</option>
            <option value='3'>Option 3</option>

        </Input>

    );
}



/************* STYLE ***************/
var statusStyle = {

    display: 'inline',
    paddingLeft: '40px'

}


/************ CONNECTED COMPONENT *************/
var mapStateToProps = function (state) {

    return {
        studentList: state.teachers.studentAssignmentList,
        currAssignmentId: state.teachers.currAssignmentId,
        assignmentProperties: state.teachers.assignmentProperties
    }

}

export default connect(mapStateToProps)(SpecificAssignment);