// action type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST';

// reducer for teacher, take state and action, on end give new state 
export default function (state = {}, action) {

    // log :
    //      string 'REDCUER: the action is: ' and action
    console.log('REDCUER: the action is: ', action);

    // condition if action.type is the same as SAVE_SECTION_LIST next line of code is working,
    // log string : 'REDUCER: saving section list',
    // state has value - new empty object, state with section who has value action.payload
    if (action.type == SAVE_SECTION_LIST) {
        console.log('REDUCER: saving section list');
        state = Object.assign({}, state, {
            section: action.payload
        });
    }

    // condition if action.type and SAVE_COURSE_COURSE are the same,
    // log REDUCER: saving course list,
    // state has value: 
    //      - create new obejct (Object.assign), empty object {}, with state,
    //          -state has value of courses: action.payload
    if (action.type == SAVE_COURSE_LIST) {
        console.log('REDUCER: saving course list');

        state = Object.assign({}, state, {
            courses: action.payload
        });
    }f
    // log state
    console.log(state);
    return state;
}