import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Input, Card, Collection, CollectionItem, CollapsibleItem } from 'react-materialize';
import { getStudentAssignmentList } from '../actions';

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

        - log string 'Specific Assignment sectionId' and this.props.params.id

        - props dispatch togetStudentAssignmentList(from actions) and parameter this.props.params.id
        
    */
    componentWillMount() {

        //needt to get list of students in this section and the id of their students_report

        console.log('Specific Assignment sectionId', this.props.params.id);

        this.props.dispatch(getStudentAssignmentList(this.props.params.id));

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

        // constants studentList, currAssignmentId belongs to this.props
        const { studentList, currAssignmentId } = this.props;

        /* 
        - condition if studentList
            - variable studentHtmlList has value of makeInnerList with parameters studentList, assignmentId
        */
        if (studentList) {
            var studentHtmlList = makeInnerList(studentList, currAssignmentId)
        }

        /*
        - return div element with property {studentHtmlList}
        */
        return (

            <div>

                <Row>

                    <Input type="checkbox" label="Grade Anonymously" />
                    <Input type="checkbox" lable="Randomize Students" />
                    <Input type="checkbox" label="Grade By Group" />
                    <Input type="checkbox" label="Grade By Category" onClick={this.showCategories} />
                    <Input type="checkbox" label="Grade All Sections" />

                </Row>

                {showCategories && <div>

                    <Link to={`/teacher/assignment/${currAssignmentId}/title`}>
                        Grade Titles
                    </Link>

                    <Button>Grade Questions</Button>
                    <Button>Grade Hypotheses</Button>

                </div>}

                <p>Click a student to grade his/her report</p>

                {studentHtmlList}

            </div>

        );
    }

}


/************* HELPER FUNCTIONS ***************/
/*
- function makeInnerList with parameters items and assignmentId

    - variable itemList has value of items and use map with parameter item to access to function

        - log parameter item
        - variable status has value of function determineStatus with parameters item.status and assignmentId

        - return

            - element CollapsibleItem with attribute key {item.report_id.toString()} and peroperty

                - element link with path {`/teacher/assignment/${assignmentId}/student/${item.report_id}`}
                  and property 

                    -   {item.first_name}  {item.last_name}
                
                - element p with style {statusStyle} and proprerty text 'Status: ' {status}

    - return 

        - element Collection with property  {itemList}
*/
function makeInnerList(items, assignmentId) {

    var itemList = items.map((item) => {

        console.log(item);
        var status = determineStatus(item.status, assignmentId);

        return (

            <CollapsibleItem key={item.report_id.toString()}>

                <Link to={`/teacher/assignment/${assignmentId}/student/${item.report_id}`}>
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

/************* STYLE ***************/
var statusStyle = {

    display: 'inline',
    paddingLeft: '40px'

}


/************ CONNECTED COMPONENT *************/
var mapStateToProps = function (state) {

    return {
        studentList: state.teachers.studentAssignmentList,
        currAssignmentId: state.teachers.currAssignmentId
    }

}

export default connect(mapStateToProps)(SpecificAssignment);