var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if, if not process.env.DATABASE_URL, 
// secrets have value secrets.json,
// local url have value next line of code :
//      `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`
if (!process.env.DATABASE_URL) {
    // const secrets = require('../secrets.json');
    const secrets = 'test';
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}

// dbUrl has value process.env.DATABASE_URL or localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// dbU has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);

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
//      - insert has value of string `SELECT first_name, last_name, email, role, section_id, sections.id FROM users JOIN users_sections  ON users.id = users_sections.user_id JOIN sections ON section_id = sections.id WHERE email = $1`,
//      - result has value of db.query(select, [email]); 
//      - return result
module.exports.getStudentData = function (email) {

    const select = `SELECT first_name, last_name, email, role, section_id, sections.id FROM users JOIN users_sections  ON users.id = users_sections.user_id JOIN sections ON section_id = sections.id WHERE email = $1`
    const result = db.query(select, [email]);
    return result;

}