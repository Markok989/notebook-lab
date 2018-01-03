// This will have 2 sections
// A make a new course section
// A list of current courses and sections

import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';

import { Link } from 'react-router';
import { filterList } from '../utils/makeList';

// component TeacherCourses
class TeacherCourses extends React.Component {

    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);

    }

    // component did mount: is invoked immediately after a component is mounted
    componentDidMount() {

        // access props of TeacherCourses, dispatch actions(Teacher actions) getCourseList
        this.props.dispatch(getCourseList());
        // access props of TeacherCourses, dispatch actions(Teacher actions) getAllSections
        this.props.dispatch(getAllSections());

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
    // this.courseNameInput.value has value '' (empty string)
    submit() {
        this.props.dispatch(saveNewCourse(this.state.courseName));
        this.courseNameInput.value = '';
    }

    render() {

        // courses, sections are props from TeacherCoursesF
        var { courses, sections } = this.props;

        // condition if courses, next code is working,
        //   - courseList has value:
        //      - course use .map with parameter course ,
        //      - link has value path '/teacher/course/' combine with course.id,
        //      - condition if sections, next code is working,
        //          - log string: 'There are sections',
        //          - sectionsForThisCourse has value of function sectionsForThisCourse with parameters section and course.id
        //          - log: sectionsForThisCourse,
        //          - sectionList has value function makeList with parameter sectionsForThisCourse
        //          - return :
        //              - li element with Link element with path to={link} and property {course.name}
        //              - ul element with property {sectionList}
        //          - else/otherwise:
        //              - returns li element with attribute key {course.id.toString()}
        //                with property element Link with attribute path to {link} ,
        //              - Link has property of {course.name}  
        if (courses) {
            var courseList = courses.map((course) => {
                var link = '/teacher/course/' + course.id;

                if (sections) {
                    console.log('There are sections');
                    var sectionsForThisCourse = filterListByCourseId(sections, course.id);
                    console.log(sectionsForThisCourse);
                    var sectionList = makeList(sectionsForThisCourse);

                    return (
                        <li key={course.id.toString()}>
                            <Link to={link}>{course.name}</Link>
                            <ul>
                                {sectionList}
                            </ul>
                        </li>
                    );
                } else {
                    <li key={course.id.toString()}>
                        <Link to={link}>{course.name}</Link>
                    </li>
                }
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
                <input type="text" name="courseName" placeholder="Name of course" onChange={this.handleInput}
                    ref={el => this.courseNameInput = el} />

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

/*
- function filterListByCourseId with parameters section and courseId
    - log: string:sections, and parameter sections
    - log: string:id, and parameter courseId
    - filteredList has value of section which one is filtered with parameter section,
        - and returns section.course_id when has same value as courseId
    - un the end returns filteredList
*/
function filterListByCourseId(sections, courseId) {
    console.log('sectios: ', sections);
    console.log('id: ', courseId);
    var filteredList = sections.filter((section) => {
        return section.course_id == courseId;
    });
    return filteredList;
}

/*
- function makeList with paramerer items
    - itemList has value of items which goes through .map with parameter item,
        - log: string 'item' and parameter from map item
        - return:
            - element li with attribute key {item.id.toString()} (use item from map's parameter),
                - Link element with path to={`/teacher/section/${item.id}` and property {item.name}
        - return element ul with property {itemList}
*/
function makeList(items) {
    var itemList = items.map((item) => {
        console.log('item', item);
        return (
            <li key={item.id.toString()}>
                <Link to={`/teacher/section/${item.id}`}>
                    {item.name}
                </Link>
            </li>
        );
    });
    return (
        <ul>
            {itemList}
        </ul>
    );
}