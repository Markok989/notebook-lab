var spicedPg = require('spiced-pg');
var localUrl = '';

if (!process.env.DATABASE_URL) {

    // const secrets = require('../secrets.json');
    const secrets = 'test'

    // connected to base
    localUrl = `postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`;

}

var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);

/*
- function getCategoriesForGrading with parameter data

    - log string 'Grading_DB: getStudentIdsBySectionId, ' and parameter data
    - queryStr has value of string :
      'SELECT titles.content, students_reports.id AS report_id, students_reports.student_id, students_reports.status FROM students_reports JOIN titles ON students_reports.assignment_id = titles.assignment_id WHERE students_reports.assignment_id = 1'
    - returns db.query(queryStr, data)
*/
function getCategoriesForGrading(data) {

    console.log('Grading_DB: getStudentIdsBySectionId, ', data);
    let queryStr = 'SELECT titles.content, students_reports.id AS report_id, students_reports.student_id, students_reports.status FROM students_reports JOIN titles ON students_reports.assignment_id = titles.assignment_id WHERE students_reports.assignment_id = 1';
    return db.query(queryStr, data);

}

module.exports.getCategoriesForGrading = getCategoriesForGrading;