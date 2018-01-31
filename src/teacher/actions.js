import axios from '../api/axios';
import { browserHistory } from 'react-router';

// action Type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST',
    UPDATE_RECENT_ASSIGNMENTS = 'UPDATE_RECENT_ASSIGNMENTS',
    ADD_TEACHER_INFO = 'ADD_TEACHER_INFO',
    RECEIVE_STUDENT_ASSIGNMENT_LIST = 'RECEIVE_STUDENT_ASSIGNMENT_LIST',
    UPDATE_STUDENT_CATEGORY_DATA = 'UPDATE_STUDENT_CATEGORY_DATA',
    GET_COMMITS = 'GET_COMMITS',
    RECEIVE_ASSIGNMENT_PROPERTIES = 'RECEIVE_ASSIGNMENT_PROPERTIES',
    ERROR = 'ERROR';


/************ PREPARING TO GRADE *************/

/*
- function getCategoriesForGrading with parameters assignmentId, category

    - return axios get with path `/api/teacher/grading/${assignmentId}/${category}`
    - then with word 'then' with parameter results access to function 

        - log string 'Back from getting Category Data' and parameter result

        - return properties
            - type as UPDATE_STUDENT_CATEGORY_DATA
            - payload as results.data.categoryData
          

    - then with word 'catch' with parameter e access to function
        - set the state , property error has value of parameter e
*/
export function getCategoriesForGrading(assignmentId, category) {

    return axios.get(`/api/teacher/grading/${assignmentId}/${category}`).then(results => {

        console.log('Back from getting Category Data', results);

        return {
            type: UPDATE_STUDENT_CATEGORY_DATA,
            payload: results.data.categoryData
        };

    }).catch(e => {

        return {
            error: e
        };

    });

}


/*
- function getAssignmentProperties with parameter assignmentId

    - log string 'ACTIONS: getAssignmentProperties' and parameter assignmentId

    - return axios get with path '/teacher/assignment/properties/' and +(plus) parameter assignmentId
    - then with word 'then' with parameter results access to function 

        - log string 'Back from getting Assignment Properties' and parameter results

        - return properties
            - type as RECEIVE_ASSIGNMENT_PROPERTIES,
            - payload as results.data.assignmentProps
            
    - then with word 'catch' with parameter e access to function
        - set the state , property error has value of parameter e
*/
export function getAssignmentProperties(assignmentId) {

    console.log('ACTIONS: getAssignmentProperties', assignmentId);

    return axios.get('/teacher/assignment/properties/' + assignmentId).then(results => {

        console.log('Back from getting Assignment Properties', results);

        return {
            type: RECEIVE_ASSIGNMENT_PROPERTIES,
            payload: results.data.assignmentProps
        };

    }).catch(e => {

        this.setState({
            error: e
        });

    });
}


/************ ASSIGNMENTS *************/


/*
- function getStudentAssignmentList with parameter assignmentId

    - log string 'ACTIONS: in get student assignment list'

    - return axios get with path '/api/teacher/students/' and +(plus) parameter assignmentId
    - then with word 'then' with parameter results access to function 

        - log string 'Back from getting student assignment list' and parameter results

        - return properties
            - type as RECEIVE_STUDENT_ASSIGNMENT_LIST
            - payload as results.data.studentList
            - currAssignmentId as assignmentId

    - then with word 'catch' with parameter e access to function
        - set the state , property error has value of parameter e
*/
export function getStudentAssignmentList(assignmentId) {

    console.log('ACTIONS: in get student assignment list');

    return axios.get('/api/teacher/students/' + assignmentId).then((results) => {

        console.log('Back from getting student assignment list', results);

        return {
            type: RECEIVE_STUDENT_ASSIGNMENT_LIST,
            payload: results.data.studentList,
            currAssignmentId: assignmentId
        };

    }).catch((e) => {
        this.setState({
            error: e
        });

    });

}

/*
- function saveNewAssignment with property assignmentInfo
    - log string "ACTIONS: in save assignment" and parameter assignmentInfo
    - condition if parameter assignmentInfo
        - return axios post with path '/api/teacher/assignment', and object {assignmentInfo}
        - then with word then with parameter results we access to function
            - condition if results.data.success
                - browserHistory push to path '/teacher/assignments'
                - return next properties
                    - type as UPDATE_RECENT_ASSIGNMENTS,
                    - payload as results.data.assignmentId
        - catch with parameter e
            - return next properties
                - type as ERROR,
                - payload as e
*/
export function saveNewAssignment(assignmentInfo) {

    console.log('ACTIONS: in save assignment', assignmentInfo);

    if (assignmentInfo) {

        return axios.post('/api/teacher/assignment', { assignmentInfo }).then((results) => {

            if (results.data.success) {

                browserHistory.push('/teacher/assignments')
                return {
                    type: UPDATE_RECENT_ASSIGNMENTS,
                    payload: results.data.assignmentId
                };

            }

        }).catch((e) => {

            return {
                type: ERROR,
                payload: e
            };

        });
    }
}


/************ SECTIONS *************/

// function saveNewSection with parameters: courseId, name, start, end
//  - condition if name 
//      - return axios post with path /api/teacher/section and properties: courseId, name, start, end,
//      - then with word "then" return function getAllSections
//  - else 
//      - return type: ERROR and payload with string "You must give a name for the section"
export function saveNewSection(courseId, name, start, end) {

    if (name) {

        return axios.post('/api/teacher/section', { courseId, name, start, end }).then(() => {
            return getAllSections();
        });

    } else {

        return {
            type: ERROR,
            payload: "You must give a name for the section"
        };

    }
}

// function getAllSections
export function getAllSections() {

    // return axios get with path '/api/teacher/section'
    // then with word "then" access next line of code with parameter results,
    //      type with value SAVE_SECTION_LIST,
    //      payload with value results.data.sections
    // after that goes catch with parameter e
    //      return type: ERROR and payload with parameter e  
    return axios.get('/api/teacher/sections').then((results) => {

        console.log('ACTIONS getAllSections', results);

        return {
            type: SAVE_SECTION_LIST,
            payload: results.data.sections
        };

    }).catch((e) => {

        return {
            type: ERROR,
            payload: e
        }

    });
}

/************ COURSES *************/

// function getCourseList
export function getCourseList() {

    // return axios get with path '/api/teacher/courses',
    // then with "then" with parameter results access next code,
    //  - log: 'Actions: back from getting courses'
    //  - return  type: SAVE_COURSE_LIST,
    //            payload: results.data.courses
    return axios.get('/api/teacher/courses').then((results) => {

        console.log('Actions: back from getting courses', results);

        return {
            type: SAVE_COURSE_LIST,
            payload: results.data.courses
        };

    });
}

export function saveNewCourse(name, desc) {

    console.log('ACTIONS: saveNewCourse');

    // return axios using post,
    // with path 'api/teacher/course' and parameters name and desc,
    // afther that with than with parameter results , next line of code is working:
    //      - log string : Actions: back from creating new course, and
    //      return type  SAVE_NEW_COURSE
    return axios.post('/api/teacher/course', { name, desc }).then((results) => {

        // console.log('Actions: back from creating new course');

        // condition if results.data.success next line of code is working :
        // log string: 'success adding new course',
        // return getCourseList
        if (results.data.success) {
            console.log('success adding new course');

            // return axios.get('/api/teacher/courses');
            return getCourseList();
        }
    });
}

/*
- function getTeacherInfo
    - log string: 'ACTIONS: getUserInfo'
    - return axios get with path '/api/teacher'
    - then with word 'then' with parmaeter results access to function
        
        - condition if results.data.success

            - log string 'got teacher info:' and parameter results
            - return 
                - type as ADD_TEACHER_INFO,
                payload as results.data.teacherInfo
*/
export function getTeacherInfo() {

    console.log('ACTIONS: getUserInfo');
    return axios.get('/api/teacher').then(results => {

        if (results.data.success) {

            console.log('got teacher info:', results);

            return {
                type: ADD_TEACHER_INFO,
                payload: results.data.teacherInfo
            }

        }

    })
}

/*
- function getCommittedAssignments with parameters id and studentid

    - return axios get with path `/api/teacher/grading/assignment/${id}/student/${reportid}`
    - then with word 'then' access to function result

        - log string 'got assignment per student report'

        - return 
            - type as string 'GET_COMMITS'
            - assignment as result.data.assignment
*/
export function getCommittedAssignments(id, studentid) {

    return axios.get(`/api/teacher/grading/assignment/${id}/student/${reportid}`).then((result) => {

        console.log('got assignment per student report');

        return {
            type: GET_COMMITS,
            assignment: result.data.assignment
        }

    });

}