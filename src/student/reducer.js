/*
- reducer funcction with parameter epmpty state and action
    - condition if action.type is strictly the same as 'GET_STUDENT_DATA'
        
        - state have value of new Object
            - empty object and state has property of studentInfo with action.studentInfo

    - contition if action.type is strictly the same as 'ADD_CLASS'
       
        - state have value of new Object
            - empty object and state has property of studentInfo wich one has value of new Object
                - empty object and state has property of courses with action.newClassList
  
     - contition if action.type is strictly the same as 'GET_ASSIGNMENT'
       
        - state have value of new Object
            - empty object and state has property of assignment witgh action.assignment

    - log string 'state' and state
    - return state
*/
export default function (state = {}, action) {

    if (action.type === 'GET_STUDENT_DATA') {

        state = Object.assign({}, state, {
            studentInfo: action.studentInfo

        });

    }

    if (action.type === 'ADD_CLASS') {

        state = Object.assign({}, state, {

            studentInfo: Object.assign({}, state, {

                courses: action.newClassList

            })

        });

    }

    if (action.type === 'GET_ASSIGNMENT') {

        state = Object.assign({}, state, {
            assignment: action.assignment
        });

    }


    console.log('state', state);

    return state;

}