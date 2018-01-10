const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');

// component studentRoutes with parameter app,
// app get have path "/student" and function with parameters: req and res,
// log: string: 'req.session.user.email' and req.session.user.email
// return res sand file to the path with join __dirname + /index.html
var studentRoutes = (app) => {
    app.get('/student', (req, res) => {

        console.log('req.session.user.email: ', req.session.user.email);
        return res.sendFile(path.join(__dirname, '../index.html'));
    });

    /*
    - app get with path '/api/student/data' and function with parameters: req and res
        - id, first_name, last_name, email, role belong to req.session.user
        - dbStudent access to getStudentData(from student.js file), with parameter email
        - then with word then we use parameter result to access function
            - log string: 'STUDENT DATA' and parameter result
            - rows has value of result.rows
            - course has value of rows and map with parameter obj through which we access next lines of code
                - courseName has property name, and name has value of obj.name
                - return courseName;
            - log courses
            - id, first_name, last_name, user_id  belong to result.rows[0]
            - studentData has next properties:
                id: id,
                first_name: first_name,
                last_name: last_name,
                user_id: user_id,
                courses: courses
            - res.json has properties:
                - success has value true
                - studentData has value studentData
        - catch with parameter err
            - log parameter err
    */
    app.get('/api/student/data', (req, res) => {

        const { id, first_name, last_name, email, role } = req.session.user;

        dbStudent.getStudentData(email)
            .then((result) => {
                console.log('STUDENT DATA', result);

                const rows = result.rows;

                const courses = rows.map((obj) => {
                    var courseName = {
                        name: obj.name
                    }

                    return courseName;

                });

                console.log(courses);

                const { id, first_name, last_name, user_id } = result.rows[0];

                var studentData = {
                    id: id,
                    first_name: first_name,
                    last_name: last_name,
                    user_id: user_id,
                    courses: courses
                }

                res.json({
                    success: true,
                    studentData: studentData
                })

            })
            .catch((err) => {
                console.log(err);
            });

    })

};

// export module 
// module.exports.studentRoutes = studentRoutes;
module.exports = studentRoutes;