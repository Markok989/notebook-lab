import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategoriesForGrading, getStudentAssignmentList } from '../actions';
import { Row, Col, Button, Card, Collection, CollectionItem } from 'react-materialize';

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

    }

    /*
    - method handleChange with paameter e    
    */
    handleChange(e) {

    }

    /* 
    - componentDidMount is invoked immediately after a component is mounted
   
        - condition if not this.props.studentAssignmentList

            - props dispatch to getStudentAssignmentList(from actions) wiht parameter this.props.params.sectionid

        - log string 'GradeACategory' and this.props

        - constants assignmentid and category belongs to this.props.params

        - props dispatch getCategoriesForGrading(from actions) and parameters assignmentid, category
           
       */
    componentDidMount() {

        if (!this.props.studentAssignmentList) {

            this.props.dispatch(getStudentAssignmentList(this.props.params.sectionid));

        }

        console.log('GradeACategory', this.props);

        const { assignmentid, category } = this.props.params;

        this.props.dispatch(getCategoriesForGrading(assignmentid, category))

    } //end component did mount

    render() {

        // log string 'PROPS in gradeACategory: ' and this.props
        console.log('PROPS in gradeACategory: ', this.props);

        /*
        - condition if not !this.props.currAssignmentId

            - log string 'returning null'
            - returns null
        */
        if (!this.props.currAssignmentId) {

            console.log('returning null');
            return null;

        }

        // constant studentCategoryData belongs to this.props
        const { studentCategoryData } = this.props;

        // constants sectionid, assignmentid belongs to this.props.params
        const { sectionid, assignmentid } = this.props.params;

        // variable gradeList has value of function makeList with parameters studentCategoryData, sectionid, assignmentid, this.handleChange
        var gradeList = makeList(studentCategoryData, sectionid, assignmentid, this.handleChange);

        console.log("GRADELIST: ", gradeList);

        return (

            <div>

                <p>Grade these:</p>
                {gradeList}

            </div>

        );

    }

}

/*************** HELPER FUNCTIONS ***************/
/*
- function makeList with parameter data

    - log string 'Make list', parameter data end event

    - return data and use map with parameter studentData to access function

        - returns

            - element Row with property
                - element Col with attributes s={12} m={6} and property

                    - element p with property of text Name: 
                    - element div with property of {studentData.content}

                - element Col with attributes s={12} m={6} and property

                    - element Input with attributes:
                        - type - "textarea"
                        - name - {`comments_${studentData.id}`}
                        - onChange - {event}
                        - label - "Comments"
                    - element Input with attributes:
                        - type - "text"
                        - label - "Grade"
                        - onChange - {event}
                        
            
*/
function makeList(data) {

    console.log('Make list', data, event);

    return data.map(studentData => {

        return (

            <Row>

                <Col s={12} m={6}>

                    <p>Name: </p>
                    <div>
                        {studentData.content}
                    </div>

                </Col>

                <Col s={12} m={6}>

                    <Input type="textarea" name={`comments_${studentData.id}`} onChange={event} label="Comments" />
                    <Input type="text" label="Grade" onChange={event} />

                </Col>

            </Row>);

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