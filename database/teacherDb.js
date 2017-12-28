var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if not process.env.DATABASE_URL, next line of code is working,
// secrets use secrets from path '../secrets.json'
// localUrl has value js template: `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`
if (!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}

// dbUrl has value process.env.DATABASE_URL or localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// db has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);

// function saveNewCourse with parameter data,
// log string : 'DBQUERY: saveNewCourse, ' and data(parameter),
// queryStr has value of string 'INSERT INTO courses (teacher_id, name) VALUES ($1, $2)',
// return db.query with parameters queryStr and data
function saveNewCourse(data) {
    console.log('DBQUERY: saveNewCourse, ', data);
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

// module export for saveNewCourse with value saveNewCourse
module.exports.saveNewCourse = saveNewCourse;

// module export for getCoursesByTeacher with value saveNewCourse
module.exports.getCoursesByTeacher = getCoursesByTeacher;



 //saveNewCourse([1, 'Biology']);
 // getCoursesByTeacher([1]).then((results) => {
 //     console.log(results.rows);
 // }).catch(e => console.error(e));