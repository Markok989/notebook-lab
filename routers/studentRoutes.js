const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');
const mw = require('./middleware');

// component studentRoutes with parameter app,
// app get have path "/student" mw.loggedInCheck(from middleware file) and function with parameters: req and res,
// log: string: 'req.session.user.email' and req.session.user.email
// return res sand file to the path with join __dirname + /index.html
var studentRoutes = (app) => {
    app.get('/student', mw.loggedInCheck, (req, res) => {

        console.log('req.session.user.email: ', req.session.user.email);
        return res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    /*
    - app get with path '/api/student/data' and function with parameters: req and res
        - id, first_name, last_name, email, role belong to req.session.user
        - dbStudent access to getStudentData(from student.js file), with parameter email
        - then with word then we use parameter result to access function
            - log string 'getting student data' and result.rows,
            - rows has value of result.rows
            - course has value of rows and map with parameter obj through which we access next lines of code
                - variable course has own properties
                    - course_id: obj.course_id,
                    - course_name: obj.course_name,
                    - section_id: obj.section_id
                - return course;
            - id, first_name, last_name, user_id  belong to result.rows[0]
            
            - constant studentData has next properties:
                - id: id,
                - first_name: first_name,
                - last_name: last_name,
                - user_id: user_id

            - constant info has owen properties
                - studentData,
                - courses
            return info

        - then with word 'then' with parameter studentInfo access to function
            
            - dbStudent(from student file) and getAssignmentList(from student file, modul export getAssignmentList)
              with paraneter id
            - then with word 'then' with parameter result access to function
                - studentInfo(parameter).course use forEach loop with parameter course, access to function
                    - course.assignments has value of result.row and filtred with parameter ass,
                      ass.selection is the same as course.section_id

            - res.json has properties:
                - success has value true
                - studentInfo has value studentInfo
            
        - word 'catch' use parameter err, access to function
            - log parameter e
  
        - word 'catch' use parameter err, access to function
            - log parameter e

*/
    app.get('/api/student/data', (req, res) => {

        const { id, first_name, last_name, email, role } = req.session.user;

        dbStudent.getStudentData(email)
            .then((result) => {

                console.log('getting student data', result.rows);

                const rows = result.rows;

                const courses = rows.map((obj) => {

                    var course = {
                        course_id: obj.course_id,
                        course_name: obj.course_name,
                        section_id: obj.section_id
                    }

                    return course;

                });


                const { id, first_name, last_name, user_id } = result.rows[0];

                const studentData = {
                    id: id,
                    first_name: first_name,
                    last_name: last_name,
                    user_id: user_id
                }


                const info = {
                    studentData,
                    courses
                }
                return info;

            }).then((studentInfo) => {

                dbStudent.getAssignmentList(id).then((result) => {

                    studentInfo.course.forEach((course) => {
                        course.assignments = result.row.filter((ass) => ass.section_id == course.section_id);
                    });

                    res.json({
                        success: true,
                        studentInfo: studentInfo
                    });

                })
                    .catch((err) => {
                        console.log(err);
                    })

            })
            .catch((err) => {
                console.log(err);
            });
    });

    /*
    - app post with path '/api/student/class' and function with parameters: req and res
        - constant id belongs to req.session.user
        - constant classID belongs to req.body

        -log string: 'course' and req.body.classID

        - dbStudent access to addNewClass(from student.js file), with parameters id and classID,
        - then with word 'then' with parameter result , access to function
            
            - log string 'addNewClass post' and parameter result, 
            - constant section_id belongs to result.row[0]
            - log section_id

            - dbStudent access to addNewClass(from student.js file).updateClassList with parameter id ,
            - then with word 'then' sith parameter result, access to function
                
                - constant courses has value of result.rows and use .map with parameter obj, access to function
                    - course has own properties
                        - course_name: obj.course_name,
                        - course_id: obj.course_id,
                        - section_id: obj.section_id
                    - return course

              - res.json has properties:
                - success has value true
                - courses has value courses

        - catch with parameter err
            - log parameter err

        - catch with parameter err
            - log parameter err
    */
    app.post('/api/student/class', (req, res) => {

        const { id } = req.session.user;
        const { classID } = req.body;

        console.log('course', req.body.classID);

        dbStudent.addNewClass(id, classID).then((result) => {

            console.log('addNewClass post', result);
            const { section_id } = result.rows[0];
            console.log(section_id);

            dbStudent.updateClassList(id).then((result) => {

                const courses = result.rows.map((obj) => {

                    var course = {
                        course_name: obj.course_name,
                        course_id: obj.course_id,
                        section_id: obj.section_id
                    }
                    return course;

                })

                res.json({
                    success: true,
                    courses: courses
                })

            })
                .catch((err) => {
                    console.log(err);
                });
        })
            .catch((err) => {
                console.log(err);
            })
    });


    /*
    - app post with path '/api/student/assignments' and function with parameters: req and res
         
        - constant id belongs to req.session.user
        
        - dbStudent access to getAssignmentList(from student.js file), with parameter id,
         - then with word 'then' with parameter result , access to function
             
             - log string 'get ass list' and result.rows,     
        
               - res.json has properties:
                 - success has value true
                 - assignments has value result.rows
     */
    app.post('/api/student/assignments', (req, res) => {

        const { id } = req.session.user;

        dbStudent.getAssignmentList(id).then((result) => {
            console.log('get ass list', result.rows);

            res.json({
                success: true,
                assignments: result.rows
            });

        })

    })

}


// export module 
// module.exports.studentRoutes = studentRoutes;
module.exports = studentRoutes;