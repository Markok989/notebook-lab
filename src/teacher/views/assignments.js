// this will have a button to make new assignment at the top
// this will show a list of all the assignments by section

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';

// TeacherAssignments component
class TeacherAssignments extends React.Component {

    // constructor
    constructor(props) {
        super(props);


    }

    // componentDidMount is invoked immediately after a component is mounted,
    // condition if not this.props.courses 
    //      - with dispatch we access to function getCourseList from actions

    // condition if not this.props.sections
    //      - with dispatch we access to function getAllSections from actions
    componentDidMount() {

        if (!this.props.courses) {
            this.props.dispatch(getCourseList());
        }

        if (!this.props.sections) {
            this.props.dispatch(getAllSections());
        }

    }

    // render method
    render() {

        // course and section belong to props of component
        const { courses, sections } = this.props;

        return (
            <div>
                <ul>
                    <li>Courses will eventually be listed here...
                        <Link to='/teacher/new/assignment'>New Assignment</Link>
                        <ul>
                            <li>Assignments will eventually be listed here...</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );

    }

}


/********* CONNECTED COMPONENT ********/
const mapStateToProps = function (state) {
    return {
        courses: state.teachers.courses,
        sections: state.teachers.sections,
    }
}

export default connect(mapStateToProps)(TeacherAssignments);