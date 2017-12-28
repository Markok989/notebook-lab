import axios from '../api/axios';

// action Type
var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';

export function saveNewCourse(name, desc) {

    // return axios using post,
    // with path 'api/teacher/course' and parameters name and desc,
    // afther that with than with parameter results , next line of code is working:
    //      - log string : Actions: back from creating new course, and
    //      return type  SAVE_NEW_COURSE
    return axios.post('api/teacher/course', { name, desc }).then((result) => {
        console.log('Actions: back from creating new course');
        return {
            type: SAVE_NEW_COURSE,
        };
    });
}