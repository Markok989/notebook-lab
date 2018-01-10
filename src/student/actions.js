import axios from 'axios';

//***************getStudentData****************//

// action function getStudentData
// return acios get with path '/api/student/data',
// then with word "then" with parameter result we access to next function
//      - return next propeties
//          - type as 'GET_STUDENT_DATA'
//          - data as result.data.studentData  
export function getStudentData() {
    return axios.get('/api/student/data').then((result) => {

        return {
            type: 'GET_STUDENT_DATA',
            data: result.data.studentData
        }

    })
}