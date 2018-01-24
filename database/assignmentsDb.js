var spicedPg = require('spiced-pg');
var localUrl = '';

/*
- contition if not process.env.DATABASE_URL
    - secreat has value of string 'test',
    - localUrl has value `postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`;
*/
if (!process.env.DATABASE_URL) {

    // const secrets = require('../secrets.json');
    const secrets = 'test';
    localUrl = `postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`;

}

// dbUrl has value process.env.DATABASE_URL OR localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// db has value of spicePg with parameter dbUrl
var db = spicedPg(dbUrl);


/********** STUDENT REPORTS *********/

/*
- function saveNewStudentReport with parameter data
    - log string 'TEACHER_DB: saveNewStudentReport',
    - queryStr has value of string `INSERT INTO students_reports (student_id, section_id, assignment_id, group_id, title_id, question_id, abstract_id, hypothesis_id, variables_id, materials_id, procedures_id, data_id, calculations_id, discussion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`
    - return db query with parameters queryStr and data
*/
function saveNewStudentReport(data) {

    console.log('TEACHER_DB: saveNewStudentReport');
    let queryStr = `INSERT INTO students_reports (student_id, section_id, assignment_id, group_id, title_id, question_id, abstract_id, hypothesis_id, variables_id, materials_id, procedures_id, data_id, calculations_id, discussion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
    return db.query(queryStr, data);

}

// TEST

// saveNewStudentReport([2, 1, 116, null, 137, 137, null, 92, null, 137, 137, 137, null, null]).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });


/*
- function newTitle with parameter data
    - log string 'TEACHER_DB newTitle',
    - queryStr has value of string `INSERT INTO titles (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newTitle(data) {

    console.log('TEACHER_DB newTitle');
    let queryStr = `INSERT INTO titles (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newQuestion with parameter data
    - log string 'TEACHER_DB newQuestion',
    - queryStr has value of string `INSERT INTO questions (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newQuestion(data) {

    console.log('TEACHER_DB newQuestion');
    let queryStr = `INSERT INTO questions (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newAbstract with parameter data
    - log string 'TEACHER_DB newAbstract',
    - queryStr has value of string `INSERT INTO abstracts (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newAbstract(data) {

    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO abstracts (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newHypothesis with parameter data
    - log string 'TEACHER_DB newHypothesis',
    - queryStr has value of string `INSERT INTO hypotheses (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newHypothesis(data) {

    console.log('TEACHER_DB newHypothesis');
    let queryStr = `INSERT INTO hypotheses (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newVariables with parameter data
    - log string 'TEACHER_DB newVariables',
    - queryStr has value of string `INSERT INTO variables (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newVariables(data) {

    console.log('TEACHER_DB newVariables');
    let queryStr = `INSERT INTO variables (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newMaterials with parameter data
    - log string 'TEACHER_DB newMaterials',
    - queryStr has value of string `INSERT INTO materials (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newMaterials(data) {

    console.log('TEACHER_DB newMaterials');
    let queryStr = `INSERT INTO materials (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newProcedure with parameter data
    - log string 'TEACHER_DB newProcedure',
    - queryStr has value of string `INSERT INTO procedures (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newProcedure(data) {

    console.log('TEACHER_DB newProcedure');
    let queryStr = `INSERT INTO procedures (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newData with parameter data
    - log string 'TEACHER_DB newData',
    - queryStr has value of string `INSERT INTO data (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newData(data) {

    console.log('TEACHER_DB newData');
    let queryStr = `INSERT INTO data (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newCalculations with parameter data
    - log string 'TEACHER_DB newCalculations',
    - queryStr has value of string `INSERT INTO calculations (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newCalculations(data) {

    console.log('TEACHER_DB newCalculations');
    let queryStr = `INSERT INTO calculations (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}


/*
- function newDiscussion with parameter data
    - log string 'TEACHER_DB newDiscussion',
    - queryStr has value of string `INSERT INTO discussions (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`
    - return db query with parameters queryStr and data
*/
function newDiscussion(data) {

    console.log('TEACHER_DB newDiscussion');
    let queryStr = `INSERT INTO discussions (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);

}

// modul export saveNewStudentReport has value saveNewStudentReport
module.exports.saveNewStudentReport = saveNewStudentReport;

// modul export newTitle has value newTitle
module.exports.newTitle = newTitle;

// modul export newQuestion has value newQuestion
module.exports.newQuestion = newQuestion;

// modul export newAbstract has value newAbstract
module.exports.newAbstract = newAbstract;

// modul export newHypothesis has value newHypothesis
module.exports.newHypothesis = newHypothesis;

// modul export newVariables has value newVariables
module.exports.newVariables = newVariables;

// modul export newMaterials has value newMaterials
module.exports.newMaterials = newMaterials;

// modul export newProcedure has value newProcedure
module.exports.newProcedure = newProcedure;

// modul export newData has value newData
module.exports.newData = newData;

// modul export newCalculations has value newCalculations
module.exports.newCalculations = newCalculations;

// modul export newDiscussion has value newDiscussion
module.exports.newDiscussion = newDiscussion;


// TEST:

/*
- function newAbstract with [42, null, true, "Starting Abstract"]
- then with word "then" with parameter results we access to function 
    - log results.rows
- word "catch" with parameter e
    - log parameter e
*/
// newAbstract([42, null, true, "Starting Abstract"]).then(results => {
//     console.log(results.rows);
// }).catch(e => {
//     console.log(e);
// });

//saveNewStudentReport([])



/********** ASSIGNMENTS *********/

/*
- function getAssignmentNameIdBySection with parameter data
    - log string ''ASSIGNMENT_DB: getAssignmentNameIdBySection, ' and parameter data
    - queryStr has value of string ''SELECT id, name FROM assignments WHERE section_id = $1'
    - return db query with parameters queryStr and data
*/
function getAssignmentNameIdBySection(data) {

    console.log('ASSIGNMENT_DB: getAssignmentNameIdBySection, ', data);
    let queryStr = 'SELECT id, name FROM assignments WHERE section_id = $1';
    return db.query(queryStr, data);

}

/*
- function saveNewAssignmentTemplate with parameter data
    - log string 'TEACHER_DB: saveNewAssignmentTemplate, ' and parameter data
    - queryStr has value of string 'INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING id'
    - return db query with parameters queryStr and data
*/
function saveNewAssignmentTemplate(data) {

    console.log('ASSIGNMENT_DB: saveNewAssignmentTemplate, ', data);
    let queryStr = 'INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING id';
    return db.query(queryStr, data);

}

//Test
// saveNewAssignmentTemplate([1, false, '3moles', 'instructions', '1999-01-01', 'word', 'word', 'word8', 'word9', 'word9','word11', 'word9','word13', 'word9', 'word15', 'word9', 'word17', 'word9', 'word19', 'word20', 'word21', 'word22', 'word23', 'word24', 'word25'])
//     .then((results) => {
//         console.log(results.rows);
//     }).catch(e => {
//         console.log(e);
//     });

// INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion) VALUES (1, false, '3moles', '4no instructions', '1999-01-01', '$6', '$7', '$8', '$9', '10', '11', '12', '13', '14', '$15', '$16', '$17', '$18', '$19', '$20', '21', '22', '$23', '$24', '$25') RETURNING id;


module.exports.getAssignmentNameIdBySection = getAssignmentNameIdBySection;
module.exports.saveNewAssignmentTemplate = saveNewAssignmentTemplate;