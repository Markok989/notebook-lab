// action type
//var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';
const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST',
    UPDATE_RECENT_ASSIGNMENTS = 'UPDATE_RECENT_ASSIGNMENTS',
    ADD_TEACHER_INFO = 'ADD_TEACHER_INFO',
    RECEIVE_STUDENT_ASSIGNMENT_LIST = 'RECEIVE_STUDENT_ASSIGNMENT_LIST',
    UPDATE_STUDENT_CATEGORY_DATA = 'UPDATE_STUDENT_CATEGORY_DATA',
    GET_COMMITS = 'GET_COMMITS',
    RECEIVE_ASSIGNMENT_PROPERTIES = 'RECEIVE_ASSIGNMENT_PROPERTIES',
    ADD_COMMENT_CATEGORY = 'ADD_COMMENT_CATEGORY',
    ADD_GRADE_CATEGORY = 'ADD_GRADE_CATEGORY',
    ERROR = 'ERROR';

// reducer for teacher, take state and action, on end give new state 
export default function (state = {}, action) {

    // log :
    //      string 'REDCUER: the action is: ' and action
    console.log('REDUCER: the action is: ', action);

    /*
    - condition if action.type is the same as RECEIVE_ASSIGNMENT_PROPERTIES
          
        - state has value of: empty object, state and
            - properties:
                - assignmentProperties as action.payload
            
    */
    if (action.type == RECEIVE_ASSIGNMENT_PROPERTIES) {

        state = Object.assign({}, state, {

            assignmentProperties: action.payload

        });

    }

    /*
    - condition if action.type is the same as UPDATE_STUDENT_CATEGORY_DATA
        
        - state has value of: empty object, state and
            - properties:
                - studentCategoryData as action.payload
          
    */
    if (action.type == UPDATE_STUDENT_CATEGORY_DATA) {

        state = Object.assign({}, state, {

            studentCategoryData: action.payload

        });

    }


    /*
    - condition if action.type is the same as RECEIVE_STUDENT_ASSIGNMENT_LIST

        - log string 'REDUCER: addTeacherInfo'

        - state has value of: empty object, state and
            - properties:
                - studentAssignmentList as action.payload
                - currAssignmentId as action.currAssignmentId
    */
    if (action.type == RECEIVE_STUDENT_ASSIGNMENT_LIST) {

        console.log('REDUCER: addTeacherInfo');

        state = Object.assign({}, state, {

            studentAssignmentList: action.payload,
            currAssignmentId: action.currAssignmentId

        });

    }


    /*
      - condtion if action.type is the same as ADD_TEACHER_INFO
          - log string ''REDUCER: addTeacherInfo''
          - state has value of Object
              - empty object, state with property teacherInfo as action.payload
    */
    if (action.type == ADD_TEACHER_INFO) {

        console.log('REDUCER: addTeacherInfo');

        state = Object.assign({}, state, {

            teacherInfo: action.payload

        });

    }


    /*
    - condtion if action.type is the same as UPDATE_RECENT_ASSIGNMENTS
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


    // condition if action.type and GET_COMMITS are the same,
    // log string 'GET_COMMITS' and action.assignment
    // state has value: 
    //      - create new obejct (Object.assign), empty object {}, with state,
    //          - committedAssignment have value action.assignment
    if (action.type == GET_COMMITS) {

        console.log('GET_COMMITS', action.assignment);

        state = Object.assign({}.state, {

            committedAssignment: action.assignment

        });

    }


    // if(action.type == ADD_COMMENT_CATEGORY) {
    //     console.log('adding comment per category');
    //     state = Object.assign({}, state, {
    //
    //     })
    // }




    // condition if action.type and ERROR are the same,
    // state has value: 
    //      - create new obejct (Object.assign), empty object {}, with state,
    //          - error have value action.payload
    if (action.type == ERROR) {

        state = Object.assign({}, state, {

            error: action.payload

        });

    }

    // log state
    console.log('STATE', state);
    return state;
}
