const path = require('path');

const {
    saveNewCourse,
    getCoursesByTeacher,
    deleteCourse,
    getAllSections,
    getSectionsByCourseId,
    saveNewSection
} = require("../database/teacherDb.js");

// component teacherRoutes with parameter app,
// app get have path "/teacher" and function with parameters: req and res,
// res sand file to the path with join __dirname + /index.html
var teacherRoutes = (app) => {
    app.get('/teacher', (req, res) => {
        return res.sendFile(path.join(__dirname, '../index.html'));
    });

    /********** SECTIONS *********/

    // app post with path /api/teacher/section, and use parameters req and res
    // data has value array [req.body.courseId, req.body.name, req.body.start, req.body.end],
    // return saveNewSection (from file teacherDb.js),
    // then with "then" with anonymous function access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e
    app.post('/api/teacher/section', (req, res) => {
        let data = [req.body.courseId, req.body.name, req.body.start, req.body.end];
        console.log(data);
        return saveNewSection(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    // get all the sections a teaher has
    // app get with path 'app/teacher/sections',
    // arrow function with parameters req and res

    app.get('/api/teacher/sections', (req, res) => {

        // FIX: reset to req.session.id

        // data has value of array: [1],
        // return getAllSections (function from file teacherDb.js),
        // then with word "then" access return res.json with parameter results,
        // return res.json contains success with boolean value true and
        // sections with value results.row
        // after then goes word "catch" for errors,
        // catch with parameter e access res.json ,
        // res.json contains error with value e
        let data = [1];
        return getAllSections(data).then((results) => {
            return res.json({
                success: true,
                sections: results.rows
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    // get only the sections for a particular course
    // app get with path '/api/teacher/sections/:courseId',
    // arrow function with parameters req and res
    app.get('/api/teacher/sections/:courseId', (req, res) => {

        // data has value of array [req.params.id],
        // return getSectionsByCourseId (function from file teacherDb.js),
        // then with word "then" access return res.json with parameter results,
        // return res.json contains success with boolean value true and
        // sections with value results.row
        // after then goes word "catch" for errors,
        // catch with parameter e access res.json ,
        // res.json contains error with value e
        let data = [req.params.id];
        return getSectionsByCourseId(data).then((results) => {
            return res.json({
                success: true,
                sections: results.rows
            });
        }).catch((e) => {
            res.json({
                error: e
            });
        });
    });




    /******** COURSES ***********/

    // app post with path /api/teacher/course, and use parameters req and res
    // data has value array [1, req.body.name],
    // return saveNewCourse (from file teacherDb.js),
    // then with "then" with anonymous function access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e

    app.post('/api/teacher/course', (req, res) => {

        // FIX: rest num to req.session.id
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
    });

    // app get with path /api/teacher/courses, and use parameters req and res
    // data has value array [req.params.teacherId],
    // return saveNewCourse (from file teacherRoutes.js),
    // then with "then" with parameter results access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e
    app.get('/api/teacher/courses', (req, res) => {

        //FIX to req.session.id once there's a session
        let data = ['1'];
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

    // app delete with path '/app/teacher/course/:id'
    // arrow function with parameters req and res
    app.delete('/api/teacher/course/:id', (req, res) => {

        // data has value of array [req.params.id],
        // return deleteCourse (function from file teacherDb.js),
        // then with word "then" access return res.json,
        // return res.json contains success with boolean value true
        // after then goes word "catch" for errors,
        // catch with parameter e access res.json ,
        // res.json contains error with value e
        let data = [req.params.id];
        return deleteCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch((e) => {
            res.json({
                error: e
            });
        });
    });
};

// export module 
// module.exports.teacherRoutes = teacherRoutes;
module.exports = teacherRoutes;