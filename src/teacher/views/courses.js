// This will have 2 sections
// A make a new course section
// A list of current courses and sections

import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';

import { Link } from 'react-router';
import AddSection from '../components/addSection';
import {
    Row,
    Col,
    Container,
    Card,
    Modal,
    Button,
    Input,
    Collapsible,
    CollapsibleItem,
    Collection,
    CollectionItem
} from 'react-materialize'

// component TeacherCourses
class TeacherCourses extends React.Component {

    constructor(props) {
        super(props);

        // state
        this.state = {
            courseName: ''
        }

        // binding
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
            console.log('state', this.state);
        });

    }

    // method submit,
    // condition if this.state.courseName
    //      - access props of TeacherCourses, dispatch actions(Teacher actions) saveNewCourse
    //          - take state courseName,
    //      - this.courseNameInput.value has value '' (empty string),
    //      - set the state courseName is empty string,
    // else
    //      - set the state error has string 'Please provide a course name.'
    submit() {
        if (this.state.courseName) {

            this.props.dispatch(saveNewCourse(this.state.courseName));
            this.courseNameInput.value = '';
            this.setState({
                courseName: ''
            });

        } else {

            this.setState({
                error: 'Please provide a course name.'
            })

        }
    }

    render() {

        // courses, sections, error are props from TeacherCoursesF
        var { courses, sections, error } = this.props;

        // condition if courses, next code is working,
        //   - courseList has value of function makeCourseList with parameteres
        //     courses and sections

        if (courses) {
            var courseList = makeCourseList(courses, sections);
        }

        return (

            <Container>

                <Card>

                    <Modal header="Add A Course" trigger={<Button>Add A Course</Button>}>

                        {
                            /*
                            state eroor and shows element p with property {this.state.error}
                            */
                        }
                        {this.state.error && <p>{this.state.error}</p>}

                        {
                            /*
                             eroor and shows element p with property {error}
                            */
                        }
                        {error && <p>{error}</p>}

                        <Input
                            type="text"
                            cname="courseName"
                            placeholder="Name of course"
                            onChange={this.handleInput}
                            ref={el => this.courseNameInput = el} />

                        <Button onClick={this.submit}>Save new course</Button>

                    </Modal>

                </Card>
                {
                    /*
                    - courses and 
                    - element Collapsible with property {courseList}
                    */
                    courses &&
                    <Collapsible>

                        {courseList}

                    </Collapsible>
                }

            </Container>

        );
    }
}


/********** LIST MAKING FUNCTIONS ************/


/*
- function filterListByCourseId with parameters section and courseId
    - log: string:sections, and parameter sections
    - log: string:id, and parameter courseId
    - filteredList has value of section which one is filtered with parameter section,
        - and returns section.course_id when has same value as courseId
    - un the end returns filteredList
*/
function filterListByCourseId(sections, courseId) {

    console.log('sections: ', sections);
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

                - Col element with attribute s={3}
                    - Link element with path to={`/teacher/section/${item.id}` and property {item.name}

                - Col element with attribute s={9}
                    - p element with property string Code For Students: and {item.id}

                - return element ul with property {itemList}
                */
function makeList(items) {

    var itemList = items.map((item) => {

        console.log('item', item);
        return (

            <li key={item.id.toString()}>

                <CollectionItem>

                    <Col s={3}>
                        <Link to={`/teacher/section/${item.id}`}>{item.name}</Link>
                    </Col>

                    <Col s={9}>
                        <p>Code For Students: {item.id}</p>
                    </Col>

                </CollectionItem>

            </li>

        );
    });

    return (

        <Collection>
            {itemList}
        </Collection>

    );
}

/*
-function makeCourseList with parameters courses and sections
    - return courses with .map with parameter courses
        - link has value/path: '/teacher/course/' and plus(+) courses.id
        - condition if sections
            - sectionsForThisCourse has value of function filterListByCourseId with
              parameters sections and course.id,
            - sectionList has value of function makeList with parameter sectionsForThisCourse
            - return :
                - element li with attribute key={course.id.toString()} and properties:
                    - Linik element with attribute to/path {link} and property {course.name}
                - component AddSection with attribute courseId={course.id}
                - element ul with property {sectionList}

                - else
            - return:
                - element li with attribute key={course.id.toString()} and property {course.name}

                */
function makeCourseList(courses, sections) {

    return courses.map((course) => {

        if (sections) {

            var sectionsForThisCourse = filterListByCourseId(sections, course.id);
            var sectionList = makeList(sectionsForThisCourse);

            return (

                <CollapsibleItem header={course.name}>

                    <AddSection courseId={course.id} />
                    <ul>
                        {sectionList}
                    </ul>

                </CollapsibleItem>

            );
        } else {

            return (

                <li key={course.id.toString()}>{course.name}</li>

            );
        }

    });
}


{/********* CONNECTED COMPONENT ********/ }

// conect component with store and takes 
//      state(state.teachers.courses), state(state.teachers.sections) 
//      error(state.teachers.error)
const mapStateToProps = function (state) {

    return {
        courses: state.teachers.courses,
        sections: state.teachers.sections,
        error: state.teachers.error
    };

}
// conect can combine component with mapStateToProps
export default connect(mapStateToProps)(TeacherCourses);