import axios from '../api/axios';

// action Type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST',
    UPDATE_RECENT_ASSIGNMENTS = 'UPDATE_RECENT_ASSIGNMENTS',
    ERROR = 'ERROR';


/************ ASSIGNMENTS *************/

/*
- function saveNewAssignment with property info
    - log string "ACTIONS: in save assignment" and parameter info
    - condition if parameter info
        - return axios post with path '/api/teacher/assignment', and object {info}
        - then with word then with parameter results we access to function
            - condition if results.data.success
                - return next properties
                    - type as UPDATE_RECENT_ASSIGNMENTS,
                    - payload as results.data.assignmentId
        - catch with parameter e
            - return next properties
                - type as ERROR,
                - payload as e
*/
export function saveNewAssignment(info) {
    console.log('ACTIONS: in save assignment', info);
    if (info) {
        return axios.post('/api/teacher/assignment', { info }).then((results) => {
            if (results.data.success) {
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