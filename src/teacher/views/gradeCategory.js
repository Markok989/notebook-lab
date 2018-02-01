import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategoriesForGrading, getStudentAssignmentList } from '../actions';
import { capitalize } from '../../helpers';
import { Row, Col, Button, Input, Card, Collection, CollectionItem, Breadcrumb, MenuItem } from 'react-materialize';

// component GradeACategory
class GradeACategory extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            titles: []
        };

        // binding
        this.handleChange = this.handleChange.bind(this);
        this.saveEach = this.saveEach.bind(this);
        this.saveAll = this.saveAll.bind(this);
    }



    /* 
    - componentWillMount is invoked immediately before a component is mounted
   
        - condition if not this.props.studentAssignmentList

            - props dispatch to getStudentAssignmentList(from actions) wiht parameter this.props.params.sectionid

        - log string 'GradeACategory' and this.props

        - constants assignmentid and category belongs to this.props.params

        - props dispatch getCategoriesForGrading(from actions) and parameters assignmentid, category
           
       */
    componentWillMount() {

        if (!this.props.studentAssignmentList) {

            this.props.dispatch(getStudentAssignmentList(this.props.params.sectionid));

        }

        console.log('GradeACategory', this.props);

        const { assignmentid, category } = this.props.params;

        this.props.dispatch(getCategoriesForGrading(assignmentid, category))

    } //end component did mount


    /* 
    - componentDidMount is invoked immediately after a component is mounted
      
        - run componentWillMount method
                 
    */
    componentDidMount() {

        this.componentWillMount();

    }

    /*
    - method handleChange with paameter e    

        - set the state

            - [e.target.name] has value of e.target.value

            - then with anonymous function run log state
    */
    handleChange(e) {

        this.setState({

            [e.target.name]: e.target.value

        }, () => console.log(this.state));

    }


    /*
    - method saveEach with paameter e    

        - log string 'you clicked save each'
    */
    saveEach(e) {
        console.log('you clicked save each');
    }


    /*
    - method saveAll with paameter e   
    
         - log string 'you clicked save all'
    */
    saveAll(e) {
        console.log('you clicked save all');
    }


    /*
    - method render 
    */
    render() {

        // log string 'PROPS in gradeACategory: ' and this.props
        console.log('PROPS in gradeACategory: ', this.props);

        /*
        - condition if not !this.props.studentCategoryData

            - log string 'returning null'
            - returns null
        */
        if (!this.props.studentCategoryData) {

            console.log('returning null');
            return null;

        }

        // constants studentCategoryData and studentAssignmentList belongs to this.props
        const { studentCategoryData, studentAssignmentList } = this.props;

        // constants sectionid, assignmentid belongs to this.props.params
        const { sectionid, assignmentid } = this.props.params;

        // constant events with properties
        const events = {
            inputChange: this.handleChange,
            saveEach: this.saveEach,
            saveAll: this.saveAll
        }

        // variable gradeList has value of function makeList with parameters studentCategoryData, sectionid, assignmentid, events
        var gradeList = makeList(studentCategoryData, sectionid, assignmentid, events);

        /*
        - condition if studentAssignmentList

            - variable assignmentName has value studentAssignmentList[0].name
        */
        if (studentAssignmentList) {

            var assignmentName = studentAssignmentList[0].name;

        }

        // variable capCat has value of function capitalize (from helper file) and parameter this.props.params.category
        var capCat = capitalize(this.props.params.category);

        // log string 'CAPCAT' and variable capCat
        console.log('CAPCAT', capCat);

        return (

            <div>

                <Row>

                    <Col m={12}>

                        <Breadcrumb className="indigo">

                            <MenuItem>Assignments</MenuItem>
                            <MenuItem>{assignmentName}</MenuItem>
                            <MenuItem>{capCat}</MenuItem>
                            
                        </Breadcrumb>

                    </Col>

                </Row>

                <Row>

                    <Col m={12}>
                        {gradeList}
                    </Col>

                </Row>

                <Row>

                    <div>
                        <Button onClick={this.saveAll}>Save All</Button>
                    </div>

                </Row>

            </div>

        );

    }

}

/*************** HELPER FUNCTIONS ***************/

/*
- function makeList with parameter data

    - log string 'Make list', parameter event

    - return data and use map with parameter studentData to access function

        - returns

            -element Card with attribute title={studentData.first_name}

                - element Row with property
                    - element Col with attributes s={12} m={6} and property

                        - element div with property of {studentData.content}

                    - element Col with attributes s={12} m={6} and property

                        - element div with property

                            - element Input with attributes:
                                - s - {12}
                                - type - "textarea"
                                - name - {`comments_${studentData.id}`}
                                - onChange - {events.inputChange}
                                - label - "Comments"

                        - element div with property
                        
                            - element Input with attributes:
                                - s - {12}
                                - name - {`grade_${studentData.id}`}
                                - type - "textarea"
                                - label - "Grade"
                                - onChange - {events.inputChange}

                            - element Button with attribute
                                - onClick - {events.saveEach}
                                - property:
                                    - text Save
                            
                        
            
*/
function makeList(data, sectionid, assignmentid, events) {

    console.log('Make list', events);


    return data.map(studentData => {

        return (

            <Card title={studentData.first_name}>

                <Row>

                    <Col s={12} m={6}>

                        <div>
                            {studentData.content}
                        </div>

                    </Col>

                    <Col s={12} m={6}>

                        <div>

                            <Input
                                s={12}
                                type="textarea"
                                name={`comments_${studentData.id}`}
                                onChange={events.inputChange}
                                label="Comments" />

                        </div>

                        <div>

                            <Input
                                s={12}
                                name={`grade_${studentData.id}`}
                                type="text" label="Grade"
                                onChange={events.inputChange} />

                            <Button onClick={events.saveEach}>Save</Button>

                        </div>

                    </Col>

                </Row>

            </Card>

        );

    });

}



/************ CONNECTED COMPONENT *************/
var mapStateToProps = function (state) {

    return {
        studentCategoryData: state.teachers.studentCategoryData,
        currAssignmentId: state.teachers.currAssignmentId,
        studentAssignmentList: state.teachers.studentAssignmentList
    }

}

export default connect(mapStateToProps)(GradeACategory);