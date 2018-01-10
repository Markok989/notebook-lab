var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
//const secrets = require('../secrets.json');
const secrets = 'test';
const db = spicedPg(`postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`);

// module export makeCourse
// use function with parameter user_id and code,
//      - insert has value of string "INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id"
//      - result has value of db.query(insert, [user_id, code]);
//      - return result
module.exports.makeCourse = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result

};

// module export getStudentData
// use function with parameter email,
//      - insert has value of string `SELECT users.id, first_name, last_name, user_id, section_id, sections.id, sections.id, sections.name, course_id, courses.id, courses.name, teacher_id
//        FROM users
//        JOIN users_sections ON users.id = user_id
//        JOIN sections ON section_id = sections.id JOIN courses ON course_id=courses.id WHERE email=$1`,
//      - result has value of db.query(select, [email]); 
//      - return result
module.exports.getStudentData = function (email) {

    const select = `SELECT users.id, first_name, last_name, user_id, section_id, sections.id, sections.id, sections.name, course_id, courses.id, courses.name, teacher_id
        FROM users
        JOIN users_sections ON users.id = user_id
        JOIN sections ON section_id = sections.id JOIN courses ON course_id=courses.id WHERE email=$1`;

    const result = db.query(select, [email]);

    return result;

}