// this will have a button to make new assignment at the top
// this will show a list of all the assignments by section

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import AssignmentList from '../components/assignmentList';

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

        console.log('Komponenta TeacherAssignments');

        /*
        - condition if courses
            - log string 'making courses call'
            - variable courseList has value of function makeCourseList with parameters courses and sections
        */
        if (courses) {

            console.log('making courses call');
            var courseList = makeCourseList(courses, sections);

        }

        return (
            <div>

                {courses &&

                    <Collapsible>
                        {courseList}
                    </Collapsible>

                }
            </div>
        );

    }

}

/********** LIST MAKING FUNCTIONS ************/

/*
- function filterListByCourseId with parameters sections and courseId

    - log string 'sections: ' and parameter sections
    - log string 'Assignments: Filter list by course id: ' and parameter courseId

    - var filteredList has value of sections filtered with parameter section to access function

        - return section.course_id is the same as courseId

    - return filteredList
*/
function filterListByCourseId(sections, courseId) {

    console.log('sections: ', sections);
    console.log('Assignments: Filter list by course id: ', courseId);

    var filteredList = sections.filter((section) => {

        return section.course_id == courseId;

    });

    return filteredList;

}

/*
- function makeCourseList with parameters courses and sections

    - return courses with map with parameter course to access function
    
        - condition if sections

            - variable sectionsForThisCourse has value of finction filterListByCourseId with parameters sections and course.id
            - log string 'calling make inner courses'

            - variable sectionList has value of finction makeInnerList with parameter sectionsForThisCourse function

            -return
                - CollapsibleItem element with header {course.name}
                - ul element with property {sectionList}

        - else 

            - rerurn li element with key attribute {course.id.toString()} and as property
                - Link element use as path {link} and has property {course.name}

        - return section.course_id is the same as courseId

    - return filteredList
*/
function makeCourseList(courses, sections) {

    return courses.map((course) => {

        if (sections) {

            var sectionsForThisCourse = filterListByCourseId(sections, course.id);
            console.log('calling make inner courses');

            var sectionList = makeInnerList(sectionsForThisCourse);

            return (

                <CollapsibleItem header={course.name}>
                    <ul>
                        {sectionList}
                    </ul>
                </CollapsibleItem>

            );

        } else {

            return (

                <li key={course.id.toString()}>
                    <Link to={link}>{course.name}</Link>
                </li>

            );

        }

    })

}


/*
- function makeInnerList with parameter items

    - variable itemList has value of items and use map with parameter item to access function

        - log string 'item: ' and parameter item
    
        -return
            - rerurn li element with key attribute {item.id.toString()} and as property
            - Link element use as path {`/teacher/section/${item.id}`} and has property {item.name}

    - return ul element with property {itemList}
*/
function makeInnerList(items) {

    var itemList = items.map((item) => {

        console.log('item: ', item);

        return (

            <li key={item.id.toString()}>

                {item.name}

                <AssignmentList sectionId={item.id} />

            </li>

        );

    });

    return (

        <ul>
            {itemList}
        </ul>

    );

}


/********* CONNECTED COMPONENT ********/
const mapStateToProps = function (state) {

    return {
        courses: state.teachers.courses,
        sections: state.teachers.sections,
    }
    
}

export default connect(mapStateToProps)(TeacherAssignments);