import axios from 'axios';

//***************getStudentData****************//

// action function getStudentData
// return acios get with path '/api/student/data',
// then with word "then" with parameter result we access to next function
//      - return next propeties
//          - type as 'GET_STUDENT_DATA'
//          - studentInfo as result.data.studentInfo  
export function getStudentData() {

    return axios.get('/api/student/data').then((result) => {

        return {
            type: 'GET_STUDENT_DATA',
            studentInfo: result.data.studentInfo
        }

    })
}

//******************addCourse*****************//

/*
- export function addNewClass with parameter classID

    - return axios post with path '/api/student/class' and property classID
    - then with word 'then; with parameter result access to function

        - return next propeties
            - type as 'ADD_CLASS'
            - newClassList as result.data.courses
*/
export function addNewClass(classID) {

    return axios.post('/api/student/class', {
        classID
    }).then((result) => {

        return {
            type: 'ADD_CLASS',
            newClassList: result.data.courses
        }
    })
}

//******************getAssignment*****************//

/*
- export function getAssignment with parameter id

    - return axios get with path '/api/student/assignment/'  +(plus) id,
    - then with word 'then' with parameter result access to function

        - return next propeties
            - type as 'GET_ASSIGNMENT'
            - assignment as result.data.assignment
*/
export function getAssignment(id) {

    return axios.get('/api/student/assignment/' + id, {
    }).then((result) => {
        return {
            type: 'GET_ASSIGNMENT',
            assignment: result.data.assignment
        }
    })

}

//*********************newAssignment*******************//


/*
- export function newAssignment with parmaeters id and part

    - return axios post with path'/api/student/assignment/' +(plus) id +(plus) part
    - then with word 'then' with parameter result access to function

        - return next propeties
            - type as 'NEW_ASSIGNMENT'
            - assignment as result.data.assignment
*/
export function newAssignment(id, part) {

    return axios.post('/api/student/assignment/' + id + '/' + part, {
    }).then((result) => {

        return {
            type: 'NEW_ASSIGNMENT',
            assignment: result.data.assignment
        }

    })

}