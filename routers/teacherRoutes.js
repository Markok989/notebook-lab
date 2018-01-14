const path = require('path');
const mw = require('./middleware');

const {
    saveNewCourse,
    getCoursesByTeacher,
    deleteCourse,
    getAllSections,
    getSectionsByCourseId,
    saveNewSection,
    saveNewAssignment
} = require("../database/teacherDb.js");

// component teacherRoutes with parameter app,
// app get have path "/teacher", mw loggedInCheck(from midlleware) and function with parameters: req and res,
// res sand file to the path with join __dirname + /index.html
var teacherRoutes = (app) => {
    app.get('/teacher', mw.loggedInCheck, (req, res) => {
        return res.sendFile(path.join(__dirname, '../public/index.html'));
    });


    /********** ASSIGNMENTS *********/
    // creates a new assignment.
    // app post with path '/api/teacher/assignment', mw.loggedInCheck(from middleware) and use parameters req and res
    // res with json access to success with value true and assignmentId with value of results.rows[0]
    app.post('/api/teacher/assignment', mw.loggedInCheck, (req, res) => {
        //make assignment row in assignments database.
        /*
            - section has value of getSectionsFromAssignmentData with parameter res.body.info
            - section use forEach loop with section parameter
                - makeNewAssignment has parameters
                    - sectiion and
                    - res.body.info
        */
        // var sections = getSectionsFromAssignmentData(res.body.info);
        // sections.forEach((section) => {
        //     makeNewAssignment(section, res.body.info);
        // })
        //
        // req.body.assignmentInfo.sections.forEach((section) => {
        //     makeNewAssignment(section, req.body.info);
        // });


        //then for each section clicked, get list of students and for each student make a student report
        //for each student make a row in the appropriate category's table and return the id to the student report.

        console.log(req.body);

        res.json({
            success: true,
            assignmentId: results.rows[0]
        });
    });


    /********** SECTIONS *********/

    // app post with path /api/teacher/section, mw.loggedInCheck(from middleware) and use parameters req and res
    // data has value array [req.body.courseId, req.body.name, req.body.start, req.body.end],
    // return saveNewSection (from file teacherDb.js),
    // then with "then" with anonymous function access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e
    app.post('/api/teacher/section', mw.loggedInCheck, (req, res) => {
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
    // app get with path 'app/teacher/sections', mw loggedInCheck(from midlleware)
    // arrow function with parameters req and res

    app.get('/api/teacher/sections', mw.loggedInCheck, (req, res) => {

        // data has value of array: [req.session.user.id],
        // return getAllSections (function from file teacherDb.js),
        // then with word "then" access return res.json with parameter results,
        // return res.json contains success with boolean value true and
        // sections with value results.row
        // after then goes word "catch" for errors,
        // catch with parameter e access res.json ,
        // res.json contains error with value e
        let data = [req.session.user.id];
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
    // app get with path '/api/teacher/sections/:courseId', mw loggedInCheck(from midlleware)
    // arrow function with parameters req and res
    app.get('/api/teacher/sections/:courseId', mw.loggedInCheck, (req, res) => {

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

    // app post with path /api/teacher/course, mw loggedInCheck(from midlleware) and use parameters req and res
    // data has value array [req.session.user.id, req.body.name],
    // return saveNewCourse (from file teacherDb.js),
    // then with "then" with anonymous function access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e

    app.post('/api/teacher/course', mw.loggedInCheck, (req, res) => {

        let data = [req.session.user.id, req.body.name];
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

    // app get with path /api/teacher/courses, mw loggedInCheck(from midlleware) and use parameters req and res
    // data has value array [req.session.user.id]
    // return saveNewCourse (from file teacherRoutes.js),
    // then with "then" with parameter results access next line of code
    // res with json access to success with value true
    // "catch" catch errors, with parameter e res with json access to error with e
    app.get('/api/teacher/courses', mw.loggedInCheck, (req, res) => {

        let data = [req.session.user.id];
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

    // app delete with path '/app/teacher/course/:id' , mw loggedInCheck(from midlleware)
    // arrow function with parameters req and res
    app.delete('/api/teacher/course/:id', mw.loggedInCheck, (req, res) => {

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

/*************** UTILITY FUNCTIONS *****************/

/* 
- function getSectionsFromAssignmentData with parameter info
    - sections has value of empty array
    - for loop use key in info , then
        - condition if key.substring(substring - Returns the substring at the 
            specified location within a String object.) sith parameters 0 (zero) and 9
            is same as 'sectionb'
                - condition if info[key] is the same as true , then
                - sections push key.subsubstring with with parameters number 9 and
                  key.length
    - return sections 
*/
function makeNewAssignment(sectionId, info) {

    const { include, editable, shared, defaults } = info;

    for (var key in include) {
        if (include[key]) {
            if (shared[key]) {
                include[key] = 'group';
            } else {
                include[key] = 'individual';
            }
        } else {
            include[key] = null;
        }
    }

    console.log(include);



    /*
    - function makeNewAssignment with parameters sectionId and info
        - data has parameters
        - log: data
        - return data
    */


    var data = [
        sectionId,
        info.group_lab,
        info.assignmentName,
        info.instructions,
        info.due,
        title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion
    ];

    //
    // console.log(data);
    //
    // return saveNewAssignment(data).then((results) => {
    //     var assignmentId = results[0].id;
    // });

}