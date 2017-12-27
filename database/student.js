var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if, if not process.env.DATABASE_URL, 
// secrats have value secrats.json,
// local url have value next line of code :
//     `postgres:${secrats.dbUser}:${secrats.pass}@localhost:5432/labnb`
//      -postgress:value of secrats.dbUser:value of secrats.pass@localhost:5432/labnb
if (!process.env.DATABASE_URL) {
    const secrats = require('../secrats.json');
    localUrl = `postgres:${secrats.dbUser}:${secrats.pass}@localhost:5432/labnb`;
}

// dbUrl has value process.env.DATABASE_URL or localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// dbU has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);

// export
module.exports.makeCourse = (data) => {

}; 