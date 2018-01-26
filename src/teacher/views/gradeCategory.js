import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { getCategoriesForGrading } from '../actions';
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
   
        - log string 'GradeACategory' and this.props.params.assignmentid

        - constants assignmentid and category belongs to this.props.params

        - props dispatch getCategoriesForGrading(from actions) and parameters assignmentid, category
           
       */
    componentWillMount() {

        console.log('GradeACategory', this.props.params.assignmentid);

        const { assignmentid, category } = this.props.params;

        this.props.dispatch(getCategoriesForGrading(assignmentid, category))

    } //end component will mount

    render() {

        return (

            <div>
                Category Grading...
            </div>

        );

    }

}



/************ CONNECTED COMPONENT *************/
var mapStateToProps = function (state) {

    return {
        studentCategoryData: state.teachers.studentCategoryData,
        currAssignmentId: state.teachers.currAssignmentId
    }

}

export default connect(mapStateToProps)(GradeACategory);