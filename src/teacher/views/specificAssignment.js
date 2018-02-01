import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';
import { getStudentAssignmentList, getAssignmentProperties } from '../actions';
import { capitalize } from '../../helpers';

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
        this.handleCatPick = this.handleCatPick.bind(this);
        this.selectCategory = this.selectCategory.bind(this);

    }

    /*
    - method componentWillReceiveProps() is invoked before a mounted component receives new props.

        - condition if this.props.assignmentProperties

            - variable categoryList has value of function getCategoryList with property this.props.assignmentProperties[0]

            - set the state has properties
                - categoryList and
                - category has value of categoryList[0]


    */
    componentWillReceiveProps() {

        if (this.props.assignmentProperties) {

            var categoryList = getCategoryList(this.props.assignmentProperties[0]);

            //console.log('SHOW CATEGORIES: CATEGORY LIST: ', categoryList);

            this.setState({
                categoryList,
                category: categoryList[0]
            });

        }

    }


    /* 
    - componentWillMount is invoked immediately before a component is mounted

        - props dispatch togetStudentAssignmentList(from actions) and parameter this.props.params.id

        - props dispatch getAssignmentProperties(from actions) and parameter this.props.params.id
        
    */
    componentWillMount() {

        //needt to get list of students in this section and the id of their students_report

        // console.log('Specific Assignment for a given section assignmentId', this.props.params.id);

        this.props.dispatch(getStudentAssignmentList(this.props.params.id));

        this.props.dispatch(getAssignmentProperties(this.props.params.id));

    }

    /*
    - showCategories method

        - set the state with property
            - showCategories is not this.state.showCategoriesToggle
    */
    showCategories() {

        this.setState({
            showCategories: !this.state.showCategoriesToggle
        });

    }

    /*
    - method handleCatPick with parameter e

        - set the state 
            - category has value of e.target.value
    */
    handleCatPick(e) {

        this.setState({
            category: e.target.value
        });

    }

    /*
    - method selectCategory 

        -  browserHistory push to js template `/teacher/grading/assignment/${this.props.params.id}/${this.props.currAssignmentId}/${this.state.category}`
    */
    selectCategory() {

        browserHistory.push(`/teacher/grading/assignment/${this.props.params.id}/${this.props.currAssignmentId}/${this.state.category}`);

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
      
            - variable categoryList has value of this.state.categoryList
        */
        if (assignmentProperties) {

            // var selector = makeSelector(assignmentProperties[0]);

            var categoryList = this.state.categoryList;

        }

        /*
        - return div element with property {studentHtmlList}
        */
        if (this.state.categoryList) {

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

                            {showCategories &&
                                <div>

                                    <Row>

                                        <Col m={8}>
                                            {this.state.categoryList && makeSelector(this.state.categoryList, this.handleCatPick)}
                                        </Col>

                                        <Col m={4}>

                                            <div>
                                                <Button name="selectCategory" onClick={this.selectCategory}>Select</Button>
                                            </div>

                                        </Col>

                                    </Row>

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

            ); // end of return

        } else {

            return null;

        }
    }

}


/************* HELPER FUNCTIONS ***************/
/*
- function makeInnerList with parameters items and assignmentId

    - variable itemList has value of items and use map with parameter item to access to function

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
- function getCategoryList with parameter assignmentProps

    - variable options has value of empty array [];

    - for loop - variable key in assignmentProps

        - condition if assignmentProps[key] is the same as string 'individual'
          OR(||)
          assignmentProps[key] is the same as string 'group'

            -  options push to (key)
    
    - returns options

*/
function getCategoryList(assignmentProps) {

    var options = [];

    for (var key in assignmentProps) {

        if (assignmentProps[key] == 'individual' || assignmentProps[key] == 'group') {

            options.push(key);

        }

    }

    return options;

}

/*
- function makeSelector with parameters options and handleCatPick
    
    - variable optionList has value of options and use mapt with parameter option to access to function

        - returns

            - element option with attribute value of {option} and property of {capitalize(option)}

    - returns

        - elemet Input with attribute 
            - s - {12} 
            - type - 'select' 
            - label - "Category to Grade Selection"
            - defaultValue - '1'
            - property
                - {optionList}
*/
function makeSelector(options, handleCatPick) {

    var optionList = options.map(option => {

        return (

            <option value={option}>{capitalize(option)}</option>

        );

    });

    return (

        <Input s={12} type='select' label="Category to Grade Selection" defaultValue='1' onChange={handleCatPick}>

            {optionList}

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