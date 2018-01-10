
// action type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST',
    UPDATE_RECENT_ASSIGNMENTS = 'UPDATE_RECENT_ASSIGNMENTS',
    ERROR = 'ERROR';

// reducer for teacher, take state and action, on end give new state 
export default function (state = {}, action) {

    // log :
    //      string 'REDCUER: the action is: ' and action
    console.log('REDUCER: the action is: ', action);

    /*
    - condtion if action.type is strictly the same as UPDATE_RECENT_ASSIGNMENTS
        - log string 'REDUCER: getting assignment list'
        - state has value of Object
            - empty object, state with property latestAssignment as action.payload
    */
    if (action.type == UPDATE_RECENT_ASSIGNMENTS) {
        console.log('REDUCER: getting assignment list');
        state = Object.assign({}, state, {
            latestAssignment: action.payload
        });
    }

    // condition if action.type is the same as SAVE_SECTION_LIST next line of code is working,
    // log string : 'REDUCER: saving section list',
    // state has value - new empty object, state with sections who has value action.payload
    if (action.type == SAVE_SECTION_LIST) {
        console.log('REDUCER: saving section list');
        state = Object.assign({}, state, {
            sections: action.payload
        });
    }

    // condition if action.type and SAVE_COURSE_COURSE are the same,
    // log REDUCER: saving course list,
    // state has value: 
    //      - create new obejct (Object.assign), empty object {}, with state,
    //          - courses have value action.payload
    if (action.type == SAVE_COURSE_LIST) {
        console.log('REDUCER: saving course list');
        state = Object.assign({}, state, {
            courses: action.payload
        });
    }

    // condition if action.type and ERROR are the same,
    // state has value: 
    //      - create new obejct (Object.assign), empty object {}, with state,
    //          - error have value action.payload
    if (action.type == ERROR) {
        state = Object.assign({}, state, {
            error: action.payload
        })
    }

    // log state
    console.log(state);
    return state;
}
