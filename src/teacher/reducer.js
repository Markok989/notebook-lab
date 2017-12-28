// action type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
var SAVE_COURSE_COURSE = 'SAVE_COURSE_COURSE';

// reducer for teacher, take state and action, on end give new state 
export default function (state = {}, action) {

    // log :
    //      string 'REDCUER: the action is: ' and action
    console.log('REDCUER: the action is: ', action);

    // condition if action.type and SAVE_COURSE_COURSE are the same,
    // log REDUCER: saving new course,
    // state has value: 
    //      - create new obejct (Object.assign), empty object {}, with state,
    //          -state has value of courses: action.payload
    if (action.type == SAVE_COURSE_COURSE) {
        console.log('REDUCER: saving new course');

        state = Object.assign({}, state, {
            courses: action.payload
        });
    }
    // log state
    console.log(state);
    return state;
}