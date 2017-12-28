var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if, if not process.env.DATABASE_URL, 
// secrets have value secrets.json,
// local url have value next line of code :
//     `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`
//      -postgress:value of secrets.dbUser:value of secrets.pass@localhost:5432/labnb
if (!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}

// dbUrl has value process.env.DATABASE_URL or localUrl
var dbUrl = process.env.DATABASE_URL || localUrl;

// dbU has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);

// export
module.exports.makeCourse = (data) => {

}; 