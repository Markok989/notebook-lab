var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if not process.env.DATABASE_URL, next line of code is working,
// secrets use secrets from path 'test'
// localUrl has value js template: `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`
if (!process.env.DATABASE_URL) {
    // const secrets = require('../secrets.json');
    // const secrets = 'test';
    const secrets = 'postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf';
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;

}

// dbUrl has value process.env.DATABASE_URL or localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// db has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);


/********** ASSIGNMENTS *********/

// function saveNewAssignmentTemplate with parameter data
// log: string "DBQUERY: saveNewAssignmentTemplate, " and data parameter,
// queryStr has value of string 'INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion) VALUES ($1, $2, $3, #4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)'
// return db query with parameters: queryStr and data
function saveNewAssignmentTemplate(data) {
    console.log('DBQUERY: saveNewAssignmentTemplate,', data);
    let queryStr = 'INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion) VALUES ($1, $2, $3, #4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)';
    return db.query(queryStr, data);
}

// Test
// aveNewAssignmentTemplate([1, false, '3koolaid', '4no instructions', '1999-01-01', '$6', '$7', '$8', '$9', '10', '11', '12', '13', '14', '$15', '$16', '$17', '$18', '$19', '$20', '$21', '$22', '$23', '$24', '$25']);
// INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion) VALUES (1, false, '3koolaid', '4no instructions', '1999-01-01', '$6', '$7', '$8', '$9', '10', '11', '12', '13', '14', '$15', '$16', '$17', '$18', '$19', '$20', '$21', '$22', '$23', '$24', '$25');


// module export for saveNewAssignmentTemplate with value saveNewAssignmentTemplate
module.exports.saveNewAssignmentTemplate - saveNewAssignmentTemplate;

/********** STUDENTS ************/

// function getStudentsBySectionId with parameter data
// log: string "DBQUERY: getStudentsBySection, " and data parameter,
// queryStr has value of string 'SELECT users_sections.user_id, users.first_name, users.last_name, users.profile_pic FROM users_sections JOIN users ON users_sections.user_id = users.id WHERE section_id = $1'
// return db query with parameters: queryStr and data
function getStudentsBySectionId(data) {

    console.log('DBQUERY: getStudentsBySection, ', data);
    let queryStr = 'SELECT users_sections.user_id, users.first_name, users.last_name, users.profile_pic FROM users_sections JOIN users ON users_sections.user_id = users.id WHERE section_id = $1';
    return db.query(queryStr, data);

}

function getStudentDataBySectionId(data) {
    console.log('DBQUERY: getStudentDataBySection,', data);
    let queryStr = 'SELECT users_sections.user_id, users.first_name, users.last_name, users.profile_pic FROM users_sections JOIN users ON users_sections.user_id = users.id WHERE section_id = $1';
    return db.query(queryStr, data);
}

// module export for getStudentsBySectionId with value getStudentsBySectionId
module.exports.getStudentsBySectionId = getStudentsBySectionId;

// module export for getStudentDataBySectionId with value getStudentDataBySectionId
module.exports.getStudentDataBySectionId = getStudentDataBySectionId;

/********** SECTIONS ************/

// function saveNewSection with parameter data
// log: string "DBQUERY: saveNewSection," and data parameter,
// queryStr has value of string 'INSERT INTO sections (course_id, name, start_date, end_date) VALUES ($1, $2, $3, $4)'
// return db query with parameters: queryStr and data
function saveNewSection(data) {
    console.log('DBQUERY: saveNewSection, ', data);
    let queryStr = 'INSERT INTO sections (course_id, name, start_date, end_date) VALUES ($1, $2, $3, $4)';
    return db.query(queryStr, data);
}


// function getAllSections with parameter data,
// log string: 'DBQUERY: getAllSections, ' and parameter data,
// queryStr has value of string : 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.teacher_id, courses.id AS course_id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.teacher_id = $1',
// return db query with parameters : queryStr and data
function getAllSections(data) {
    console.log('DBQUERY: getAllSections,', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.teacher_id, courses.id AS course_id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.teacher_id = $1';
    return db.query(queryStr, data);
}


// function getSectionsByCourseId with parameter data,
// log string: DBQUERY: getSectionsByCourseId ' and parameter data,
// queryStr has value of string : 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.id = $1',
// return db query with parameters : queryStr and data
function getSectionsByCourseId(data) {
    console.log('DBQUERY: getSectionsByCourseId', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.id = $1';
    return db.query(queryStr, data);
}

// module export for saveNewSection with value saveNewSection
module.exports.saveNewSection = saveNewSection;

// module export for getAllSections with value getAllSections
module.exports.getAllSections = getAllSections;

// module export for getSectionsByCourseId with value getSectionsByCourseId
module.exports.getSectionsByCourseId = getSectionsByCourseId;


/********** COURSES ************/

// function saveNewCourse with parameter data,
// log string : 'DBQUERY: saveNewCourse, ' and data(parameter),
// queryStr has value of string 'INSERT INTO courses (teacher_id, name) VALUES ($1, $2)',
// return db.query with parameters queryStr and data
function saveNewCourse(data) {
    console.log('DBQUERY: saveNewCourse,', data);
    let queryStr = 'INSERT INTO courses (teacher_id, name) VALUES ($1, $2)';
    return db.query(queryStr, data);
}

// function getCoursesByTeacher with parameter data,
// log string: 'DBQUERY: saveNewCourse.',
// queryStr has value of string: 'SELECT * FROM courses WHERE teacher_id = $1',
// return db.query with parameters queryStr and data
function getCoursesByTeacher(data) {
    console.log('DBQUERY: saveNewCourse.');
    let queryStr = 'SELECT * FROM courses WHERE teacher_id = $1';
    return db.query(queryStr, data);
};

// function deleteCourse with parameter id,
// log string: 'DBQUERY: deleteCourse. '
// queryStr has value of string 'DELETE FROM courses WHERE id=$1',
// return db.query with parameters queryStr and data
function deleteCourse(id) {
    console.log('DBQUERY: deleteCourse.');
    let queryStr = 'DELETE FROM courses WHERE id=$1';
    return db.query(queryStr, id);
}



// module export for saveNewCourse with value saveNewCourse
module.exports.saveNewCourse = saveNewCourse;

// module export for getCoursesByTeacher with value saveNewCourse
module.exports.getCoursesByTeacher = getCoursesByTeacher;

// module export for deleteCourse with value deleteCourse
module.exports.deleteCourse = deleteCourse;




// saveNewCourse([1, 'Biology']);
//  getCoursesByTeacher([1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => console.error(e));
// deleteCourse([5]);
//  getAllSections([1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => console.error(e));