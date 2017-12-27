import axios from '../api/axios';

// action Type
var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';

export function saveNewCourse(name, desc) {

    return {
        type: SAVE_NEW_COURSE,
    }
}