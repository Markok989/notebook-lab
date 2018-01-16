const path = require('path');
const mw = require('./middleware');

const {
    saveNewCourse,
    getCoursesByTeacher,
    deleteCourse,
    getAllSections,
    getSectionsByCourseId,
    saveNewSection,
    getStudentIdsBySectionId
    } = require("../database/teacherDb");

const {
    saveNewAssignmentTemplate,
    saveNewStudentReport,
    newTitle, newQuestion,
    newAbstract,
    newHypothesis,
    newVariables,
    newMaterials,
    newProcedure,
    newData,
    newCalculations,
    newDiscussion
            } = require("../database/assignmentsDb");


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

        // variable assignments has value of empty array
        var assignments = [];

        /*
        - req.body.assignmentInfo.section use forEach loop with section parameter
            - return makeNewAssignment with parameters
                - section
                - req.body.assignmentInfo
            - then with word 'then' with parameter assignmentId we access to function
                - ssignments push to objects/ properties { section, assignmentId },

                - return getStudentIdsBySectionId with parameter [section]
                - then with word 'then' with paramerer results we access to function
                    - log string: 'assignments: ' and variable assignments,
                    - students has value results.rows
                    - include, editable, defaults belongs to req.body.assignmentInfo;
                    - log string: 'MAKING STUDENT ASSINGMENTS!!!',
                    - return function makeStudentAssignments with parameters students, section, assignmentId, include, editable, defaults
            - catch with paramerter e we access to function
                - log parameter e
       */
        req.body.assignmentInfo.sections.forEach((section) => {

            return makeNewAssignment(section, req.body.assignmentInfo).then((assignmentId) => {

                //now get list of students and for each student make a student report, using user_id make student assignment
                assignments.push({ section, assignmentId });

                //now get list of students and for each student make a student report, using user_id make student assignment
                return getStudentIdsBySectionId([section]).then(results => {

                    console.log('assignments: ', assignments);

                    var students = results.rows;

                    var { include, editable, defaults } = req.body.assignmentInfo;

                    console.log('MAKING STUDENT ASSINGMENTS!!!');

                    return makeStudentAssignments(students, section, assignmentId, include, editable, defaults);

                });

            }).catch(e => {

                console.log(e); // end makeNewAssignment

            });

        }); // end forEach



        //for each student make a row in the appropriate category's table and return the id to the student report.

        console.log(req.body);

        res.json({
            success: true,
            assignmentId: 5
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

        });
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
            });

        }).catch(e => {
            res.json({
                error: e
            });
        });
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
- function makeNewAssignment with parameters sectionId and info
    - include, shared, defaults belongs to info
    - condition if not info.group_lab
        - info.group_lab is flase
   
    - condition if not info.due
        - info.due is null
   
    - condition if not info.instructions
        - info.instructions is null
 
    - newInclude has value of massageIncludeObject with parameters include and shared
 
    - data has own properties
 
    - return saveNewAssignmentTemplate with parameter data,
        - then with word "then" with parameter results access to function
            - log string :"Resulting AssignmentId: " and parameter results.rows[0].id
            - return results.rows[0].id
        - catch with parameter e access to function
            - log parameter e
*/
function makeNewAssignment(sectionId, info) {

    const { include, shared, defaults } = info;

    if (!info.group_lab) {
        info.group_lab = false;
    }

    if (!info.due) {
        info.due = null;
    }

    if (info.instructions) {
        info.instructions = null;
    }

    var newInclude = massageIncludeObject(include, shared);


    var data = [
        sectionId,
        info.group_lab,
        info.assignmentName,
        info.instructions,
        info.due,
        newInclude.title, defaults.default_title,
        newInclude.abstract, defaults.default_abstract,
        newInclude.question, defaults.default_question,
        newInclude.hypothesis, defaults.default_hypothesis,
        newInclude.variables, defaults.default_variables,
        newInclude.materials, defaults.default_materials,
        newInclude.procedures, defaults.default_procedures,
        newInclude.data, defaults.default_data,
        newInclude.calculations, defaults.default_calc,
        newInclude.discussion, defaults.default_discussion
    ];


    return saveNewAssignmentTemplate(data).then((results) => {

        console.log('Resulting AssignmentId: ', results.rows[0].id)
        return results.rows[0].id;
    }).catch(e => {
        console.log(e);
    });

}

/* 
- function massageIncludeObject with parameters include and shared
    - for loop var key in include
        - condition if include[key]
 
            - condition if shared[key]
                - include[key] has value of string 'group'
            - else
                - include[key] has value of string 'individual'
 
        - else
            - include[key] has value of null
            
    - log include
                  
    - return include 
 */
function massageIncludeObject(include, shared) {

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

    return include;
}


/*
This function uses the list of included categories to make a row in each category table for each student
At the end it calls the function make a row in the student report table
*/


/*
- function makeStudentAssignments(students, sectionId, assignmentId, include, editable, defaults) {
 
    
    - students use forEach loop with prameter student
 
        - log string "(((students)))", and parameter student,
        - log string "defaults" and parameter defaults,
 
        - promiseArr has value of empty array [],
        
        - for loop key in include
        
            - log string: '***** makingStudentAssigns: key:' and key,
 
            - condition if include[key]
 
                - group_id has value null;
                - function name has value
                
                - editableBoolean has value of editable key 
                    - first result: editable[key]
                    - second result: false
                
                - data has own parameters assignmentId, group_id, editableBoolean, defaults['defaults_' + key]
                    
                - log string: 'make student assignment data' and variable data
 
                - condition if key is the same as string 'title'
                    - promiseArr push to newTitle with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
                            
                - condition if key is the same as string 'question'
                    - promiseArr push to newQuestion with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
                            
                - condition if key is the same as string 'abstract'
                    - promiseArr push to newAbstract with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
                            
                - condition if key is the same as string 'hypothesis'
                    - promiseArr push to newHypothesis with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
                            
                - condition if key is the same as string 'variables'
                    - promiseArr push to newData with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
                            
                - condition if key is the same as string 'materials'
                    - promiseArr push to newMaterials with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
 
                - condition if key is the same as string 'procedures'
                    - promiseArr push to newProcedure with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
 
                - condition if key is the same as string 'data'
                    - promiseArr push to newData with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
 
                - condition if key is the same as string 'caluclations'
                    - promiseArr push to newCalculations with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
 
                - condition if key is the same as string 'discussion'
                    - promiseArr push to newDiscussion with parameter data,
                    - when with word 'then' with parameter results we access to function
                        - returns
                            - title has value results.rows[0].id
 
        
        - returns Promise.all with parameter promiseArr,
        - then with word 'then' with parameter results we access to function
            - log string: 'Results from Promise.all' and parmeter results,
           
            - return function newStudentReport with parameters student.user_id, sectionId, assignmentId, results
 
        - then with word "chatch" with parameter e we access to function
            - log: string 'Promise.all error: ' and parameter e
 
*/
function makeStudentAssignments(students, sectionId, assignmentId, include, editable, defaults) {

    students.forEach((student) => {

        console.log("(((students)))", student);
        console.log("defaults", defaults);


        var promiseArr = [];

        for (var key in include) {

            console.log('***** makingStudentAssigns: key:', key);

            if (include[key]) {

                //set data for this key
                var group_id = null;

                var editableBoolean = editable[key] ? editable[key] : false;

                var data = [
                    assignmentId,
                    group_id,
                    editableBoolean,
                    defaults['defaults_' + key]
                ];

                console.log('make student assignment data', data);

                if (key == 'title') {

                    promiseArr.push(newTitle(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == 'question') {

                    promiseArr.push(newQuestion(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "abstract") {

                    promiseArr.push(newAbstract(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "hypothesis") {

                    promiseArr.push(newHypothesis(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "variables") {

                    promiseArr.push(newData(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "materials") {

                    promiseArr.push(newMaterials(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "procedures") {

                    console.log('adding procedures: ', data);

                    promiseArr.push(newProcedure(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "data") {

                    promiseArr.push(newData(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "caluclations") {

                    promiseArr.push(newCalculations(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                }


                if (key == "discussion") {

                    promiseArr.push(newDiscussion(data).then(results => {
                        return {
                            title: results.rows[0].id
                        };
                    }));

                } //end long if check

            } //end if(includes[key])
        } //end for loop
        //make new student assignment with categoryIds, student_id and assignment_id


        return Promise.all(promiseArr).then((results) => {

            console.log('Results from Promise.all', results);

            return newStudentReport(student.user_id, sectionId, assignmentId, results);

        }).catch((e) => {
            console.log('Promise.all error: ', e);
        }); // ent catch for promise.all

    }); // end forEach

}

/*
- function newStudentReport with parameters studentId, assignmentId, categoryIds
 
    - variable categories has array of strings
 
    - variable group_id has value of null;
 
    - variable data has value of array with parameters studentId, sectionId, assignmentId, group_id
 
    - categories use forEach loop with parameter category, and acceess to function
        
        - variable gotOne has boolean value false,
        - log string: "vategory" and parameter category
        - parameter categoryIds use forEach loop with parameter id , access to function
            - log: stirng 'id' and parameter id
 
            - condition if id[category](category-from parameter in forEach loop)
                - gotOne has boolean value true
                - log string 'got one',
                - data push to id[category](category-from parameter in forEach loop)
 
        - condition if not gotOne
            - log string 'got one',
            - data push to null
 
    - log: string STUDENT REPORT DATA:' and variable data

    - return saveNewStudentReport (from file assignmentsDb.js) with parameter data 
*/
function newStudentReport(studentId, sectionId, assignmentId, categoryIds) {

    var categories = [
        "title",
        "question",
        "abstract",
        "hypothesis",
        "variables",
        "materials",
        "procedures",
        "data",
        "calculations",
        "discussion",
    ];

    var group_id = null;

    var data = [studentId, sectionId, assignmentId, group_id];

    categories.forEach((category) => {

        var gotOne = false;
        console.log('category: ', category)
        categoryIds.forEach(id => {
            console.log('id', id);

            if (id[category]) {

                gotOne = true;
                console.log('got one');
                data.push(id[category]);

            }
        });

        if (!gotOne) {
            console.log('pusshing null');
            data.push(null);
        }

    });

    console.log('STUDENT REPORT DATA:', data);

    return saveNewStudentReport(data);

}


    // TESTS

    /*
    - function makeNewAssignmentAll with parameter req
        - assignments has value of empty array []
        - req.body.assignmentInfo.sections use forEach loop with parameter section
            - makeNewAssignment with parameters section and req.body.assignmentInfo
            - then with word 'then' with parameter assignmentId we access to function
     
                - assignments push to objects: section, assignmentId 
     
                - return getStudentIdsBySectionId with parameter [section],
                - then with word 'then' with parameter assignmentId we access to function
                    - log string: assignments and variable assignments
     
                    - students  has value of results.rows,
                    - include, editable, defaults belongs to req.body.assignmentInfo,
                    - log string: 'MAKING STUDENT ASSINGMENTS!!!',
                    - returns function makeStudentAssignments with parameters students, assignmentId, includes, editable, defaults
                    
            - "catch" word with parameter e
                - log parameter e 
    */
    // function makeNewAssignmentAll(req) {

    //     var assignments = [];
    //     req.body.assignmentInfo.sections.forEach((section) => {

    //         return makeNewAssignment(section, req.body.assignmentInfo).then((assignmentId) => {

    //             //now get list of students and for each student make a student report, using user_id make student assignment
    //             assignments.push({ section, assignmentId });

    //             return getStudentIdsBySectionId([section]).then((ressults) => {
    //                 console.log('assignments', assignments);
    //             })


    //             var students = results.rows;
    //             var { include, editable, defaults } = req.body.assignmentInfo;
    //             console.log('MAKING STUDENT ASSINGMENTS!!!');
    //             return makeStudentAssignments(students, section, assignmentId, includes, editable, defaults);

    //         }).catch((e) => {

    //             console.log(e); // end makeNewAssignment

    //         });

    //     }); // end forEach
    // }



    // const req = {
    //     session: {
    //         user: {
    //             id: 1
    //         }
    //     },
    //     body1: {
    //         assignmentInfo: {
    //             sections: ['1','2'],
    //             include: {
    //                 title: 'individual',
    //                 question: null,
    //                 abstract: null,
    //                 hypothesis: null,
    //                 variables: null,
    //                 materials: null,
    //                 procedures: null,
    //                 data: null,
    //                 calculations: null,
    //                 discussion: null
    //             },
    //             editable: {},
    //             shared: {},
    //             defaults: {
    //                 defaults_title: '',
    //                 defaults_question: '',
    //                 defaults_abstract: '',
    //                 defaults_hypothesis: '',
    //                 defaults_variables: '',
    //                 defaults_materials: '',
    //                 defaults_procecures: '',
    //                 defaults_data: '',
    //                 defaults_calculations: '',
    //                 defaults_discussion: '',
    //                 default_title: 'sdfasdf'
    //             },
    //             assignmentName: 'asd',
    //             instructions: null,
    //             group_lab: false,
    //             due: null
    //         }
    //     },
    //     body: {
    //         assignmentInfo: {
    //             sections: ['1', '2'],
    //             include: {
    //                 title: 'group',
    //                 question: 'group',
    //                 abstract: null,
    //                 hypothesis: 'individual',
    //                 variables: null,
    //                 materials: 'group',
    //                 procedures: 'group',
    //                 data: 'group',
    //                 calculations: 'individual',
    //                 discussion: null
    //             },
    //             editable: {
    //                 materials: true,
    //                 procedures: true,
    //                 data: true,
    //                 calculations: true,
    //                 title: true,
    //                 question: true
    //             },
    //             shared: {
    //                 title: true,
    //                 question: true,
    //                 materials: true,
    //                 procedures: true,
    //                 data: true
    //             },
    //             defaults: {
    //                 defaults_title: '',
    //                 defaults_question: '',
    //                 defaults_abstract: '',
    //                 defaults_hypothesis: 'my starting hypothesis',
    //                 defaults_variables: '',
    //                 defaults_materials: '',
    //                 defaults_procecures: '',
    //                 defaults_data: '',
    //                 defaults_calculations: '',
    //                 defaults_discussion: '',
    //                 defaults_procedures: 'Follow the procedures on the handout.'
    //             },
    //             assignmentName: 'Soap lab',
    //             due: '2017-10-10',
    //             instructions: null,
    //             group_lab: true
    //         }
    //     }
    // };


    // makeNewAssignmentAll(req);