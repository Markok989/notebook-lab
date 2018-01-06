import axios from '../api/axios';

// action Type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST';

/************ SECTIONS *************/

// function saveNewSection with parameters: courseId, name, start, end
//  - return axios post with path /api/teacher/section and properties: courseId, name, start, end,
//  - then with word "then" return function getAllSections
export function saveNewSection(courseId, name, start, end) {
    return axios.post('/api/teacher/section', { courseId, name, start, end }).then(() => {
        return getAllSections();
    });
}

// function getAllSections
export function getAllSections() {

    // return axios get with path '/api/teacher/section'
    // then with word "then" access next line of code with parameter results,
    //      type with value SAVE_SECTION_LIST,
    //      payload with value results.data.sections
    // after that goes catch with parameter e
    //      log: string "error: " and aparameter e
    return axios.get('/api/teacher/sections').then((results) => {
        return {
            type: SAVE_SECTION_LIST,
            payload: results.data.sections
        };
    }).catch((e) => {
        console.log('error: ', e);
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
        console.log('Actions: back from getting courses');
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