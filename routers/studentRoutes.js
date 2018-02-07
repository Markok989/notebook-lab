const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');
const mw = require('./middleware');

// component studentRoutes with parameter app,
// app get have path "/student" mw.loggedInCheck and mw.checkIfStudent(from middleware file) and function with parameters: req and res,
// log: string: 'req.session.user.email' and req.session.user.email
// return res sand file to the path with join __dirname + /index.html
var studentRoutes = (app) => {

    app.get('/student', mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        console.log('req.session.user.email: ', req.session.user.email);
        return res.sendFile(path.join(__dirname, '/public/index.html'));

    });

    /*
    - app get with path '/api/student/data', mw.loggedInCheck and mw.checkIfStudent(from middleware file) and function with parameters: req and res
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
                      ass.section_id is the same as course.section_id

            - res.json has properties:
                - success has value true
                - studentInfo has value studentInfo
            
        - word 'catch' use parameter err, access to function
            - log parameter e
  
        - word 'catch' use parameter err, access to function
            - log parameter e

*/
    app.get('/api/student/data', mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        const { id, first_name, last_name, email, role } = req.session.user;

        dbStudent.getStudentData(email).then((result) => {

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

                studentInfo.courses.forEach((course) => {

                    course.assignments = result.rows.filter(ass => ass.section_id == course.section_id);

                });

                res.json({
                    success: true,
                    studentInfo: studentInfo
                });

            }).catch((err) => {
                console.log(err);
            });

        }).catch((err) => {
            console.log(err);
        });

    });

    /*
    - app post with path '/api/student/class', mw.loggedInCheck and mw.checkIfStudent(from middleware file) and function with parameters: req and res

        - constant id belongs to req.session.user
        - constant classID belongs to req.body

        - dbStudent access to checkStudentClasses(from student.js file), with parameters id and classID,
        - then with word 'then' with parameter result , access to function
            
            - log string 'addNewClass post' and parameter result, 
            - constant section_id belongs to result.row[0]
            - log section_id

            - dbStudent access to addNewClass(from student.js file) with parameter id ,
            - then with word 'then' sith parameter result, access to function
                
                - log result.rows

                - condition if result.rows and find with parameter section
                    - section.section_id is the same as classID

                        - throw string 'Error student is already enrolled in this class'

                - else
                    
                    - dbStudent access to addNewClass(from student.js file), with parameters id and classID,
                    - then with word 'then' with parameter result , access to function
            
                        - log string 'add new class get section id' and result.rows[0], 
                        - constant sectionID has value of result.rows[0].section_id
                        - returns dbStudent getAssignmentsPerSection (from student.js file) with parameter sectionID

                    - then with word 'then' with parameter result to access next function

                            - log string 'assignment list' and parameter result, 
                            - constant sectionID has value of result.rows[0].section_id
                            - constant assignmentIDList  has value of result.rows and use map with parameter assignment to access to function

                                - returns assignment.id
                         
                            - assignmentIDList use forEach loop with parameter assignment to access to function

                                - log assignment
                                - dbStudent.addStudentsReports (from student.js file) with parameters id, sectionID, assignment


                        - then with word 'then' with anonymous function

                            - return dbStudent updateClassList(from student.js file) with parameter id
                            
                    
                        - then with word 'then' with parameter result , access to function 

                            - .log string 'update class list' and result.rows


                            - constant courses has value of result.rows and use map with parameter obl to access function

                                - variable course has properties
                                    - course_id has value of obj.course_id,
                                    - course_name has value of obj.course_name,
                                    - section_id has value of obj.section_id
                              
                                - return course

                            - return coueses


                        - then with word 'then' with parameter courses, access to function 

                            - dbStudent getAssignmentList with parameter id
                            - then with word 'then' with parameter result access to function

                                - courses use forEach loop with parameter course

                                    -  course.assignments has value of result.rows and use filter with parameter ass to filter

                                        - ass.section_id has to be same as course.section_id

                                - res.json has properties:
                                    - success has value true
                                    - courses has value courses

                        - catch with parameter err
                            - log parameter err

        - catch with parameter err
            - log parameter err
    */
    app.post('/api/student/class', mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        const { id } = req.session.user;
        const { classID } = req.body;

        dbStudent.checkStudentClasses(id).then((result) => {

            console.log(result.rows);

            if (result.rows.find(section => section.section_id == classID)) {

                throw 'Error student is already enrolled in this class'

            } else {

                dbStudent.addNewClass(id, classID).then((result) => {

                    console.log('add new class get section id', result.rows[0]);
                    const sectionID = result.rows[0].section_id;
                    return dbStudent.getAssignmentsPerSection(sectionID);

                }).then((result) => {

                    console.log('assignment list', result.rows);
                    // const sectionID = result.rows[0].section_id;
                    const assignmentIDList = result.rows.map((assignment) => {

                        return assignment.id;

                    });

                    assignmentIDList.forEach((assignment) => {

                        console.log(assignment);
                        dbStudent.addStudentsReports(id, classID, assignment);

                    });

                }).then(() => {

                    return dbStudent.updateClassList(id);

                }).then((result) => {

                    console.log('update class list', result.rows);

                    const courses = result.rows.map((obj) => {

                        var course = {
                            course_id: obj.course_id,
                            course_name: obj.course_name,
                            section_id: obj.section_id
                        }

                        return course;

                    });

                    return courses

                }).then((courses) => {

                    dbStudent.getAssignmentList(id).then((result) => {

                        courses.forEach((course) => {

                            course.assignments = result.rows.filter(ass => ass.section_id == course.section_id);

                        });

                        res.json({
                            success: true,
                            courses: courses
                        });

                    }).catch((err) => {

                        console.log(err);

                    });

                }).catch((err) => {

                    console.log(err);

                });

            }

        });

    });


    /*
    - app get with path '/api/student/assignment/:id' , mw.loggedInCheck and mw.checkIfStudent(from middleware file)
      and function with parameters: req and res
         
        - constant assignmentID  has value of req.params.id
        - constant userID has value of req.session.user.id
          
        - dbStudent access to getReportByID(from student.js file), with parameters userID and assignmentID,
        - then with word 'then' with parameter result , access to function
             
            - log string result.rows[0],     
        
            - const reportID has value of result.rows[0].id
            - return dbStudent getAssignment with parameters reportID, assignmentID
     
        - then with word 'then' with parameter result , access to function

            - log string 'assignment' and result.rows[0]

             constants {
                assignment_id,
                status,
                report_comments,
                report_grade,
                title_editable,
                title_content,
                title_comments,
                title_grade,
                question_editable,
                question_content,
                question_comments,
                question_grade,
                abstract_editable,
                abstract_content,
                abstract_comments,
                abstract_grade,
                hypothesis_editable,
                hypothesis_content,
                hypothesis_comments,
                hypothesis_grade,
                variable_editable,
                variable_content,
                variable_comments,
                variable_grade,
                material_editable,
                material_content,
                material_comments,
                material_grade,
                procedure_editable,
                procedure_content,
                procedure_comments,
                procedure_grade,
                data_editable,
                data_content,
                data_comments,
                data_grade,
                calculation_editable,
                calculation_content,
                calculation_comments,
                calculation_grade,
                discussion_editable,
                discussion_content,
                discussion_comments,
                discussion_grade
            } belongs to result.rows[0];

     
            - constant title with propertues: title_editable, title_content, title_comments, title_grade
                
            - constant question with propertues: question_editable, question_content, question_comments, question_grade
     
            - constant abstract with propertues: abstract_editable, abstract_content, abstract_comments, abstract_grade
     
            - constant hypothesis with propertues: hypothesis_editable, hypothesis_content, hypothesis_comments, hypothesis_grade
                
            - constant variable with propertues: variable_editable, variable_content, variable_comments, variable_grade
                
            - constant material with propertues: material_editable, material_content, material_comments, material_grade
        
            - constant procedure with propertues: procedure_editable, procedure_content, procedure_comments, procedure_grade
                
            - constant data with propertues: data_editable, data_content, data_comments, data_grade
                
            - constant calculation with propertues: calculation_editable, calculation_content, calculation_comments, calculation_grade
            
            - constant discussion with propertues: discussion_editable, discussion_content, discussion_comments, discussion_grade
            
     
                - res.json has properties:
                    - success has value true
                    - assignments has properties
                        assignment_id,
                        status,
                        report_comments,
                        report_grade,
                        title,
                        question,
                        abstract,
                        hypothesis,
                        variable,
                        material,
                        procedure,
                        data,
                        calculation,
                        discussion
    */
    app.get('/api/student/assignment/:id', mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        const assignmentID = req.params.id;
        const userID = req.session.user.id;

        dbStudent.getReportByID(userID, assignmentID).then((result) => {

            console.log(result.rows[0]);
            const reportID = result.rows[0].id;
            return dbStudent.getAssignment(reportID, assignmentID);

        }).then((result) => {

            console.log('assignment', result.rows[0]);


            const {
                assignment_id,
                status,
                report_comments,
                report_grade,
                title_editable,
                title_content,
                title_comments,
                title_grade,
                question_editable,
                question_content,
                question_comments,
                question_grade,
                abstract_editable,
                abstract_content,
                abstract_comments,
                abstract_grade,
                hypothesis_editable,
                hypothesis_content,
                hypothesis_comments,
                hypothesis_grade,
                variable_editable,
                variable_content,
                variable_comments,
                variable_grade,
                material_editable,
                material_content,
                material_comments,
                material_grade,
                procedure_editable,
                procedure_content,
                procedure_comments,
                procedure_grade,
                data_editable,
                data_content,
                data_comments,
                data_grade,
                calculation_editable,
                calculation_content,
                calculation_comments,
                calculation_grade,
                discussion_editable,
                discussion_content,
                discussion_comments,
                discussion_grade
            } = result.rows[0];



            const title = {
                title_editable, title_content, title_comments, title_grade
            }

            const question = {
                question_editable, question_content, question_comments, question_grade
            }

            const abstract = {
                abstract_editable, abstract_content, abstract_comments, abstract_grade
            }

            const hypothesis = {
                hypothesis_editable, hypothesis_content, hypothesis_comments, hypothesis_grade
            }

            const variable = {
                variable_editable, variable_content, variable_comments, variable_grade
            }

            const material = {
                material_editable, material_content, material_comments, material_grade
            }

            const procedure = {
                procedure_editable, procedure_content, procedure_comments, procedure_grade
            }

            const data = {
                data_editable, data_content, data_comments, data_grade
            }

            const calculation = {
                calculation_editable, calculation_content, calculation_comments, calculation_grade
            }

            const discussion = {
                discussion_editable, discussion_content, discussion_comments, discussion_grade
            }

            res.json({
                success: true,
                assignments: {
                    assignment_id,
                    status,
                    report_comments,
                    report_grade,
                    title,
                    question,
                    abstract,
                    hypothesis,
                    variable,
                    material,
                    procedure,
                    data,
                    calculation,
                    discussion
                }

            });

        });

    });


    // after updating. either do another query to get all rows again orrrrr write if clauses in reducer
    // to update the state. another issue is when you save to locak state it adds on to the list of this.state.

    /*
    - app post with path '/api/student/save-assignment', mw.loggedInCheck and mw.checkIfStudent(from middleware file) and function with parameters: req and res
     
        - constant assignmentID has value req.body.id
        - constant {part} has value of req.body
        - constant {id} has value of req.session.user
        - log constants: id, assignmentID 
     
       
        - dbStudent access to getAssignmentStatus with parameters id and assignmentID
        - then with word 'then' with parameter result access to function
                
             - constant status has value of result.rows[0].status
                                      
     
        //////////////////////////////////////////////////////
     
            - condition if prop is strictly the same as null
     
                - dbStudent access to updateAssignmentStatus with parameters id, assignmentID and string 'IN PROGRESS'
                - then with word 'then' with parameter result access to function
                
                    - log string 'in progress' and parameter result
                     
     
        //////////////////////////////////////////////////////
      
      
            - for loop with variable prop in part
     
            - condition if prop is strictly the same as string 'title'
     
                - dbStudent access to updateTitles with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant title has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
     
      
        //////////////////////////////////////////////////////
     
            - condition if prop is strictly the same as string 'question'
     
                - dbStudent access to updateQuestions with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant question has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                     
     
        //////////////////////////////////////////////////////
     
            - condition if prop is strictly the same as string 'abstract'
     
                - dbStudent access to updateAbstracts with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant abstract has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                 
     
        //////////////////////////////////////////////////////
     
            - condition if prop is strictly the same as string 'hypothesis'
     
                - log string 'yaa' and part[prop]
                - dbStudent access to updateHypotheses with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - log parameter result
                    - constant hypothesis  has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                  
     
        //////////////////////////////////////////////////////
     
            - condition if prop is strictly the same as string 'variable'
     
                - dbStudent access to updateVariables with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - return variable as result.rows[0].content
     
        //////////////////////////////////////////////////////
     
            - condition if prop is strictly the same as string 'material'
     
                - dbStudent access to updateMaterials with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant updateMaterials has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                       
     
        //////////////////////////////////////////////////////
            
            - condition if prop is strictly the same as string 'procedure'
     
                - dbStudent access to updateProcedures with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant procedure  has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                      
     
        //////////////////////////////////////////////////////
            
            - condition if prop is strictly the same as string 'data'
     
                - dbStudent access to updateData with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant data  has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                       
     
        //////////////////////////////////////////////////////
            
            - condition if prop is strictly the same as string 'calculation'
     
                - dbStudent access to updateCalculations with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant calculation  has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
                     
        //////////////////////////////////////////////////////
            
            - condition if prop is strictly the same as string 'discussion'
     
                - dbStudent access to updateDiscussions with parameters assignmentID and part[prop]
                - then with word 'then' with parameter result access to function
                
                    - constant discussion  has value of result.rows[0].content
                    - res.json has properties:
                        - success has value true
     
        //////////////////////////////////////////////////////
                            
    */
    app.post('/api/student/save-assignment', mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        const assignmentID = req.body.id;
        const { part } = req.body;
        const { id } = req.session.user;
        console.log(id, assignmentID);

        dbStudent.getAssignmentStatus(id, assignmentID).then((result) => {

            const status = result.rows[0].status;

        });

        if (status === null) {

            dbStudent.updateAssignmentStatus(id, assignmentID, 'IN PROGRESS').then((result) => {

                console.log('in progress', result);

            });

        }

        for (var prop in part) {

            if (prop === 'title') {

                dbStudent.updateTitles(assignmentID, part[prop]).then((result) => {

                    const title = result.rows[0].content;

                    res.json({

                        success: true

                    });

                });

            }

            if (prop === 'question') {

                dbStudent.updateQuestions(assignmentID, part[prop]).then((result) => {

                    const question = result.rows[0].content;

                    res.json({

                        success: true

                    });

                })

            }

            if (prop === 'abstract') {

                dbStudent.updateAbstracts(assignmentID, part[prop]).then((result) => {

                    const abstract = result.rows[0].content;

                    res.json({
                        success: true
                    });

                });

            }


            if (prop === 'hypothesis') {

                console.log('yaa', part[prop]);
                dbStudent.updateHypotheses(assignmentID, part[prop]).then((result) => {

                    console.log(result);
                    const hypothesis = result.rows[0].content;

                    res.json({
                        success: true
                    });

                });

            }


            if (prop === 'variable') {

                dbStudent.updateVariables(assignmentID, part[prop]).then((result) => {

                    return {
                        variable: result.rows[0].content
                    }
                })

            }


            if (prop === 'material') {

                dbStudent.updateMaterials(assignmentID, part[prop]).then((result) => {

                    const material = result.rows[0].content;

                    res.json({
                        success: true
                    });

                });

            }


            if (prop === 'procedure') {

                dbStudent.updateProcedures(assignmentID, part[prop]).then((result) => {

                    const procedure = result.rows[0].content;

                    res.json({
                        success: true
                    });

                });

            }


            if (prop === 'data') {

                dbStudent.updateData(assignmentID, part[prop]).then((result) => {

                    const data = result.rows[0].content;

                    res.json({
                        success: true
                    });

                });

            }


            if (prop === 'calculation') {

                dbStudent.updateCalculations(assignmentID, part[prop]).then((result) => {

                    const calculation = result.rows[0].content;

                    res.json({
                        success: true
                    });
                    ;
                });

            }


            if (prop === 'discussion') {

                dbStudent.updateDiscussions(assignmentID, part[prop]).then((result) => {

                    const discussion = result.rows[0].content;

                    res.json({
                        success: true
                    });

                });

            }

        }

    });


    /*
    - app post with path '/api/student/commit-assignment/', mw.loggedInCheck and mw.checkIfStudent(from middleware file) and function with parameters: req and res
     
        - log string 'server committing'
     
        - constant assignmentID has value of req.body.id
        - constant part has value of req.body
        - constant id has value of req.session.user
     
        - dbStudent access to updateAssignmentStatus(from student.js file), with parameters id, assignmentID 
          and string 'COMMITTED'
        - then with word then we use parameter result to access function
     
            - log string 'committed' and parameter results
     
           - res reditect to path '/api/student/assignment/' +(plus) assignmentID
           
    */
    app.post('/api/student/commit-assignment/', mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        console.log('server committing');

        const assignmentID = req.body.id;
        const { part } = req.body;
        const { id } = req.session.user;

        dbStudent.updateAssignmentStatus(id, assignmentID, 'COMMITTED').then((result) => {

            console.log('committed', result);

            res.redirect('/api/student/assignment/' + assignmentID);

        });

    });

}


// export module 
// module.exports.studentRoutes = studentRoutes;
module.exports = studentRoutes;