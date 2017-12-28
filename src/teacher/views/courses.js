// This will have 2 sections
// A make a new course section
// A list of current courses and sections

import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList } from '../actions';

import { Link } from 'react-router';

// component TeacherCourses
class TeacherCourses extends React.Component {

    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentDidMount() {

        //this.props.dispatch(getCourseList());

    }

    // method for input,
    // [e.target.name] takes value of path e.target.value
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            // log for state of this(TeacherCourses) component
            console.log('COURSES: handleInput state', this.state);
        });
    }

    // method submit,
    // take props.dispatch, than use action saveNewCourse,

    submit() {
        this.props.dispatch(saveNewCourse(this.state.courseName));
    }

    render() {

        // courses, sections are props from TeacherCoursesF
        var { courses, sections } = this.props;

        // condition if courses, next code is working,
        //   - courseList has value:
        //      - course use .map with parameter course ,
        //      - link has value path '/course/' combine with course.id,
        //      - return :
        //          - li element with Link element with path to={link} and property {course.name}
        if (courses) {
            var courseList = courses.map((course) => {
                var link = '/course/' + course.id;
                return (
                    <li><Link to={link}>{course.name}</Link></li>
                );
            })
        }

        return (
            <div>
                <header>
                    Make a new course
                </header>
                <input type="text" placeholder="Name of course" />
                <button type="submit">Save new course</button>
                {
                    /*
                    - courses and 
                    - element div with properties header and ul with property {courseList}
                    */
                    courses &&
                    <div>
                        <header>
                            Course List
                        </header>
                        <ul>
                            {courseList}
                        </ul>
                    </div>
                }
                <input type="text" name="courseName" placeholder="Name of course" onChange={this.handleInput} />

                <button type="submit" onClick={this.submit}>Save new course</button>
            </div>
        );
    }
}

{/********* CONNECTED COMPONENT ********/ }

// conect component with store and takes state(state.teachers.courses) and state(state.teachers.sections)
const mapStateToProps = function (state) {
    return {
        courses: state.teachers.courses,
        sections: state.teachers.sections
    };
}
// conect can combine component with mapStateToProps
export default connect(mapStateToProps)(TeacherCourses);