import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
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
    }

    /* 
    - componentWillMount is invoked immediately before a component is mounted
   
        - condition if not this.props.studentAssignmentList

            - props dispatch to getStudentAssignmentList(from actions) wiht parameter this.props.params.sectionid

        - log string 'GradeACategory' and this.props.params

        - constants assignmentid and category belongs to this.props.params

        - props dispatch getCategoriesForGrading(from actions) and parameters assignmentid, category
           
       */
    componentWillMount() {

        if (!this.props.studentAssignmentList) {

            this.props.dispatch(getStudentAssignmentList(this.props.params.sectionid));

        }

        console.log('GradeACategory', this.props.params);

        const { assignmentid, category } = this.props.params;

        this.props.dispatch(getCategoriesForGrading(assignmentid, category))

    } //end component will mount

    render() {

        // constant studentCategoryData belongs to this.props
        const { studentCategoryData } = this.props;

        // constants sectionid, assignmentid belongs to this.props.params
        const { sectionid, assignmentid } = this.props.params;

        // variable gradeList has value of function makeList with parameters studentCategoryData, sectionid, assignmentid
        var gradeList = makeList(studentCategoryData, sectionid, assignmentid);

        return (

            <div>
                Category Grading...
            </div>

        );

    }

}

/*************** HELPER FUNCTIONS ***************/
/*
- function makeList with parameter data

    - return string 'list'
*/
function makeList(data) {

    // var cards = data.map(student => {
    //
    // })
    return 'list';

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