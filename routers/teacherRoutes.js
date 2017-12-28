const path = require('path');

const { saveNewCourse, getCoursesByTeacher } = require("../database/teacherDb.js");

// component teacherRoutes with parameter app,
// app get have path "/teacher" and function with parameters: req and res,
// res sand file to the path with join __dirname + /index.html
var teacherRoutes = (app) => {
    app.get('/teacher', function (req, res) {
        return res.sendFile(path.join(__dirname + '../index.html'));
    });

    // app post with path /api/teacher/course, and use parameters req and res
    // data has value array [1, req.body.name],
    // return saveNewCourse (from file teacherDb.js), then with "then" with anonymous function access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e
    app.post('/api/teacher/course', (req, res) => {
        let data = [1, req.body.name];
        return saveNewCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        })
    })

    // app get with path /api/teacher/courses/:teacherId, and use parameters req and res
    // data has value array [req.params.teacherId],
    // return saveNewCourse (from file teacherRoutes.js), then with "then" with parameter results access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e
    app.get('/api/teacher/courses/:teacherId', (req, res) => {
        let data = [req.params.teacherId];
        // call db
        return getCoursesByTeacher(data).then((results) => {
            res.json({
                success: true,
                courses: results.rows
            })
        }).catch(e => {
            res.json({
                error: e
            });
        })
    });

};

// export module 
// module.exports.teacherRoutes = teacherRoutes;
module.exports = teacherRoutes;