var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
//const secrets = require('../secrets.json');
const secrets = 'test';
//const secrets = 'postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf';
const db = spicedPg(`postgres:qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`);

// module export addNewClass
// use function with parameter user_id and code,
//      - insert has value of string "INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id"
//      - result has value of db.query(insert, [user_id, code]);
//      - return result
module.exports.addNewClass = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result

};

// module export getStudentData
// use function with parameter email,
//      - select has value of string 
//          `SELECT users.id, first_name, last_name, users_sections.user_id, users_sections.section_id, sections.id, sections.course_id, courses.id, courses.name AS course_name
//           FROM users
//           JOIN users_sections ON users.id = user_id
//           JOIN sections ON users_sections.section_id = sections.id
//           JOIN courses ON course_id=courses.id
//           WHERE email=$1`,
//      - result has value of db.query(select, [email]); 
//      - return result
module.exports.getStudentData = function (email) {

    const select = `SELECT users.id, first_name, last_name, users_sections.user_id, users_sections.section_id, sections.id, sections.course_id, courses.id, courses.name AS course_name
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