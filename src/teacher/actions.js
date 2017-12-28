import axios from '../api/axios';

// action Type
var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';

export function saveNewCourse(name, desc) {

    console.log('ACTIONS: saveNewCourse');

    // return axios using post,
    // with path 'api/teacher/course' and parameters name and desc,
    // afther that with than with parameter results , next line of code is working:
    //      - log string : Actions: back from creating new course, and
    //      return type  SAVE_NEW_COURSE
    return axios.post('api/teacher/course', { name, desc }).then((result) => {
        // console.log('Actions: back from creating new course');

        // condition if results.data.success next line of code is working :
        // log string: 'success adding new course',
        if (results.data.success) {
            console.log('success adding new course');
        }

        // return axios get with path '/api/teacher/courses/' combine with '1',
        // then with "then" with paremeter results access next line of code:
        //      log string: 'Actions:back from getting coursrs',
        // return type SAVE_NEW_COURSE
        return axios.get('/api/teacher/courses/' + '1');
    }).then((results) => {
        console.log('Actions:back from getting coursrs');

        return {
            type: SAVE_NEW_COURSE,
        };
    });
}