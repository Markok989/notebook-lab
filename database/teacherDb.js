var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if not process.env.DATABASE_URL, next line of code is working,
// secrets use secrets from path 'test'
// localUrl has value js template: `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`

if (!process.env.DATABASE_URL) {
    var secrets = 'test';
    // const secrets = require('test');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}

// dbUrl has value process.env.DATABASE_URL or localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// db has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);



/********** SECTIONS ************/

// function getAllSections with parameter data,
// log string: 'DBQUERY: getAllSections, ' and parameter data,
// queryStr has value of string : 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.teacher_id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.teacher_id = $1',
// return db query with parameters : queryStr and data
function getAllSections(data) {
    console.log('DBQUERY: getAllSections, ', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.teacher_id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.teacher_id = $1';
    return db.query(queryStr, data);
}

// function getSectionsByCourseId with parameter data,
// log string: DBQUERY: getSectionsByCourseId ' and parameter data,
// queryStr has value of string : 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.id = $1',
// return db query with parameters : queryStr and data
function getSectionsByCourseId(data) {
    console.log('DBQUERY: getSectionsByCourseId ', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.id = $1';
    return db.query(queryStr, data);
}

/********** COURSES ************/

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

// function deleteCourse with parameter id,
// log string: 'DBQUERY: deleteCourse. '
// queryStr has value of string 'DELETE FROM courses WHERE id=$1',
// return db.query with parameters queryStr and data
function deleteCourse(id) {
    console.log('DBQUERY: deleteCourse. ');
    let queryStr = 'DELETE FROM courses WHERE id=$1';
    return db.query(queryStr, id);
}



// module export for saveNewCourse with value saveNewCourse
module.exports.saveNewCourse = saveNewCourse;

// module export for getCoursesByTeacher with value saveNewCourse
module.exports.getCoursesByTeacher = getCoursesByTeacher;

// module export for deleteCourse with value deleteCourse
module.exports.deleteCourse = deleteCourse;

// module export for getSectionsByCourseId with value getSectionsByCourseId
module.exports.getSectionsByCourseId = getSectionsByCourseId;

// module export for getAllSections with value getAllSections
module.exports.getAllSections = getAllSections;


// saveNewCourse([1, 'Biology']);
// getCoursesByTeacher([1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => console.error(e));
// deleteCourse([5]);

// 
getAllSections([1]).then((results) => {
    console.log(results.rows);
}).catch(e => console.error(e));