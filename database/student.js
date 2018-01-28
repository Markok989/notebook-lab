var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
//const secrets = require('../secrets.json');
const secrets = 'test';
const db = spicedPg(`postgres:qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`);

// module export addNewClass
// use function with parameter user_id and code,
//      - insert has value of string "INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id"
//      - result has value of db.query(insert, [user_id, code]);
//      - return result
module.exports.addNewClass = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result;

};

// module export addStudentsReports
// use function with parameter user_id and code,
//      - insert has value of string `INSERT INTO students_reports (student_id, section_id) VALUES ($1, $2) RETURNING section_id`
//      - result has value of db.query(insert, [user_id, code])
//      - return result
module.exports.addStudentsReports = function (user_id, code) {

    const insert = `INSERT INTO students_reports (student_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result;

};



// module export getStudentData
// use function with parameter email,
//      - select has value of string 
//           `SELECT users.id AS student_id, first_name, last_name, users_sections.user_id, users_sections.section_id, sections.course_id, courses.id AS course_id, courses.name AS course_name//           FROM users
//           JOIN users_sections ON users.id = user_id
//           JOIN sections ON users_sections.section_id = sections.id
//           JOIN courses ON course_id=courses.id
//           WHERE email=$1`,
//      - result has value of db.query(select, [email]); 
//      - return result
module.exports.getStudentData = function (email) {

    const select = `SELECT users.id AS student_id, first_name, last_name, users_sections.user_id, users_sections.section_id, sections.course_id, courses.id AS course_id, courses.name AS course_name
    FROM users
    JOIN users_sections ON users.id = user_id
    JOIN sections ON users_sections.section_id = sections.id
    JOIN courses ON course_id=courses.id
    WHERE email=$1`;

    const result = db.query(select, [email]);

    return result;

}

/*
- module export updateClassList has value of function with parameter user_id
    - select has value of string 
        `SELECT courses.name AS course_name, sections.id AS section_id, courses.id AS course_id FROM users_sections
        JOIN sections ON section_id = sections.id
        JOIN courses ON course_id=courses.id WHERE user_id=$1`

    - result has value of db.query(select, [user_id]); 
    - return result
*/
module.exports.updateClassList = function (user_id) {

    const select = `SELECT courses.name AS course_name, sections.id AS section_id, courses.id AS course_id FROM users_sections
        JOIN sections ON section_id = sections.id
        JOIN courses ON course_id=courses.id WHERE user_id=$1`;

    const result = db.query(select, [user_id]);
    return result;

}


/*
- module export getAssignmentList has value of function with parameters user_id and section_id
    - select has value of string 
          `SELECT assignments.name AS assignment_name, assignments.section_id, assignments.id AS assignment_id FROM users_sections JOIN assignments ON users_sections.section_id = assignments.section_id WHERE user_id=$1;`

    - result has value of db.query(select, [user_id]); 
    - return result
*/
module.exports.getAssignmentList = function (user_id, section_id) {

    const select = `SELECT assignments.name AS assignment_name, assignments.section_id, assignments.id AS assignment_id FROM users_sections JOIN assignments ON users_sections.section_id = assignments.section_id WHERE user_id=$1;`;

    const result = db.query(select, [user_id]);

    return result;

}


/*
- module export checkStudentClasses has value of function with parameter user_id

    - select has value of string 
        SELECT section_id FROM users_sections WHERE user_id=$1`
    - result has value of db.query(select, [user_id]); 
    - return result
*/
module.exports.checkStudentClasses = function (user_id) {

    const select = `SELECT section_id FROM users_sections WHERE user_id=$1`;
    const result = db.query(select, [user_id]);
    return result;

}

/*
- module export updateAssignmentStatus has value of function with parameters student_id, assignment_id and status

    - update has value of string 
        `UPDATE students_reports SET status=$3 WHERE student_id=$1 AND assignment_id=$2 RETURNING status`
    - result has value of db.query(update, [student_id, assignment_id, status])
    - return result
*/
module.exports.updateAssignmentStatus = function (student_id, assignment_id, status) {

    const update = `UPDATE students_reports SET status=$3 WHERE student_id=$1 AND assignment_id=$2 RETURNING status`;
    const result = db.query(update, [student_id, assignment_id, status]);
    return result;

}

/*
- module export getAssignmentStatus has value of function with parameters student_id, assignment_id

    - select has value of string 
       'SELECT status FROM students_reports WHERE student_id=$1 AND assignment_id=$2'
    - result has value of db.query(select, [student_id, assignment_id])
    - return result
*/
module.exports.getAssignmentStatus = function (student_id, assignment_id) {

    const select = 'SELECT status FROM students_reports WHERE student_id=$1 AND assignment_id=$2';
    const result = db.query(select, [student_id, assignment_id]);
    return result;

}

//****************UPDATE ASSIGNMENTS *********************//

/*
- module export updateTitles has value of function with parameters assignment_id and content

    - update has value of string `UPDATE titles SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateTitles = function (assignment_id, content) {

    const update = `UPDATE titles SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateQuestions has value of function with parameters assignment_id and content

    - update has value of string `UPDATE questions SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateQuestions = function (assignment_id, content) {

    const update = `UPDATE questions SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateAbstracts has value of function with parameters assignment_id and content

    - update has value of string `UPDATE abstracts SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateAbstracts = function (assignment_id, content) {

    const update = `UPDATE abstracts SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateHypotheses has value of function with parameters assignment_id and content

    - constant update has value of string `UPDATE hypotheses SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content]); 
    - return result
*/
module.exports.updateHypotheses = function (assignment_id, content) {

    const update = `UPDATE hypotheses SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateVariables has value of function with parameters assignment_id and content

    - update has value of string `UPDATE variables SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateVariables = function (assignment_id, content) {

    const update = `UPDATE variables SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateMaterials has value of function with parameters assignment_id and content

    - update has value of string `UPDATE materials SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateMaterials = function (assignment_id, content) {

    const update = `UPDATE materials SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateProcedures has value of function with parameters assignment_id and content

    - update has value of string `UPDATE procedures SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateProcedures = function (assignment_id, content) {

    const update = `UPDATE procedures SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateData has value of function with parameters assignment_id and content

    - update has value of string `UPDATE data SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateData = function (assignment_id, content) {

    const update = `UPDATE data SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

/*
- module export updateCalculations has value of function with parameters assignment_id and content

    - update has value of string `UPDATE calculations SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateCalculations = function (assignment_id, content) {

    const update = `UPDATE calculations SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}

/*
- module export updateDiscussions has value of function with parameters assignment_id and content

    - update has value of string `UPDATE discussions SET content = $2 WHERE assignment_id = $1 RETURNING content`
    - result has value of db.query(update, [assignment_id, content])
    - return result
*/
module.exports.updateDiscussions = function (assignment_id, content) {

    const update = `UPDATE discussions SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;

}


//************************ getAssignment ************************//

/*
- module export getAssignment has value of function with parameters student_id and assignment_id

    - select has value of string 
        `SELECT students_reports.assignment_id, students_reports.status, titles.editable AS title_editable, titles.content AS title_content, titles.comments AS title_comments, titles.grade AS title_grade, questions.editable AS question_editable, questions.content AS question_content, questions.comments AS question_comments, questions.grade AS question_grade, abstracts.editable AS abstract_editable, abstracts.content AS abstract_content, abstracts.comments AS abstract_comments, abstracts.grade AS abstract_grade, hypotheses.editable AS hypothesis_editable, hypotheses.content AS hypothesis_content, hypotheses.comments AS hypothesis_comments, hypotheses.grade AS hypothesis_grade, variables.editable AS variable_editable, variables.content AS variable_content, variables.comments AS variable_comments, variables.grade AS variable_grade, materials.editable AS material_editable, materials.content AS material_content, materials.comments AS material_comments, materials.grade AS material_grade, procedures.editable AS procedure_editable, procedures.content AS procedure_content, procedures.comments AS procedure_comments, procedures.grade AS procedure_grade, data.editable AS data_editable, data.content AS data_content, data.comments AS data_comments, data.grade AS data_grade, calculations.editable AS calculation_editable, calculations.content AS calculation_content, calculations.comments AS calculation_comments, calculations.grade AS calculation_grade, discussions.editable AS discussion_editable, discussions.content AS discussion_content, discussions.comments AS discussion_comments, discussions.grade AS discussion_grade FROM students_reports
        FULL OUTER JOIN titles ON students_reports.assignment_id = titles.assignment_id
        FULL OUTER JOIN questions ON students_reports.assignment_id = questions.assignment_id
        FULL OUTER JOIN abstracts ON students_reports.assignment_id = abstracts.assignment_id
        FULL OUTER JOIN hypotheses ON students_reports.assignment_id = hypotheses.assignment_id
        FULL OUTER JOIN variables ON students_reports.assignment_id = variables.assignment_id
        FULL OUTER JOIN materials ON students_reports.assignment_id = materials.assignment_id
        FULL OUTER JOIN procedures ON students_reports.assignment_id = procedures.assignment_id
        FULL OUTER JOIN data ON students_reports.assignment_id = data.assignment_id
        FULL OUTER JOIN calculations ON students_reports.assignment_id = calculations.assignment_id
        FULL OUTER JOIN discussions ON students_reports.assignment_id = discussions.assignment_id
        WHERE students_reports.student_id = $1 AND students_reports.assignment_id = $2`

    - result has value of db.query(student_id, assignment_id); 
    - return result
*/
module.exports.getAssignment = function (student_id, assignment_id) {

    const select = `SELECT students_reports.assignment_id, students_reports.status, titles.editable AS title_editable, titles.content AS title_content, titles.comments AS title_comments, titles.grade AS title_grade, questions.editable AS question_editable, questions.content AS question_content, questions.comments AS question_comments, questions.grade AS question_grade, abstracts.editable AS abstract_editable, abstracts.content AS abstract_content, abstracts.comments AS abstract_comments, abstracts.grade AS abstract_grade, hypotheses.editable AS hypothesis_editable, hypotheses.content AS hypothesis_content, hypotheses.comments AS hypothesis_comments, hypotheses.grade AS hypothesis_grade, variables.editable AS variable_editable, variables.content AS variable_content, variables.comments AS variable_comments, variables.grade AS variable_grade, materials.editable AS material_editable, materials.content AS material_content, materials.comments AS material_comments, materials.grade AS material_grade, procedures.editable AS procedure_editable, procedures.content AS procedure_content, procedures.comments AS procedure_comments, procedures.grade AS procedure_grade, data.editable AS data_editable, data.content AS data_content, data.comments AS data_comments, data.grade AS data_grade, calculations.editable AS calculation_editable, calculations.content AS calculation_content, calculations.comments AS calculation_comments, calculations.grade AS calculation_grade, discussions.editable AS discussion_editable, discussions.content AS discussion_content, discussions.comments AS discussion_comments, discussions.grade AS discussion_grade FROM students_reports
    FULL OUTER JOIN titles ON students_reports.assignment_id = titles.assignment_id
    FULL OUTER JOIN questions ON students_reports.assignment_id = questions.assignment_id
    FULL OUTER JOIN abstracts ON students_reports.assignment_id = abstracts.assignment_id
    FULL OUTER JOIN hypotheses ON students_reports.assignment_id = hypotheses.assignment_id
    FULL OUTER JOIN variables ON students_reports.assignment_id = variables.assignment_id
    FULL OUTER JOIN materials ON students_reports.assignment_id = materials.assignment_id
    FULL OUTER JOIN procedures ON students_reports.assignment_id = procedures.assignment_id
    FULL OUTER JOIN data ON students_reports.assignment_id = data.assignment_id
    FULL OUTER JOIN calculations ON students_reports.assignment_id = calculations.assignment_id
    FULL OUTER JOIN discussions ON students_reports.assignment_id = discussions.assignment_id
    WHERE students_reports.student_id = $1 AND students_reports.assignment_id = $2`;

    const result = db.query(select, [student_id, assignment_id]);
    return result;

}