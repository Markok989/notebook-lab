import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from '../../api/axios';
import { Row, Col, Button, Card, Collection, CollectionItem } from 'react-materialize';

// component SpecificAssignment
class SpecificAssignment extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            titles: []
        };
    }


    componentWillMount() {

    }//end component will mount

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