/*
- reducer funcction with parameter epmpty state and action
    - condition if action.type is strictly the same as 'GET_STUDENT_DATA'
        - log string 'reducer get student data' and action.data
        - state have value of new Object
            - empty object and state has property of data witgh action.data
    - log string 'state' and state
    - return state
*/
export default function (state = {}, action) {

    if (action.type === 'GET_STUDENT_DATA') {

        console.log('reducer get student data', action.data)
        state = Object.assign({}, state, {
            data: action.data
        });

    }

    console.log("state", state);

    return state;
}