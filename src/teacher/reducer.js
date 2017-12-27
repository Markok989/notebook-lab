// action type
var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';

// reducer for teacher, take state and action, on end give new state 
export default function (state = {}, action) {

    // condition if action.type and SAVE_NEW_COURSE are the same,
    // log REDUCER: saving new course,
    // and
    if (action.type == SAVE_NEW_COURSE) {
        console.log('REDUCER: saving new course');
        Object.assign({}, state, {

        });
    }
    return state;
}