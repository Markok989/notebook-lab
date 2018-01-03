var spicedPg = require('spiced-pg');
var localUrl = '';

// condition if not process.env.DATABASE_URL, next line of code is working
// secrets has value of string 'test'
// localUrl has value of path `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`
if (!process.env.DATABASE_URL) {
    // const secrets = require('../secrets.json');
    const secrets = 'test';
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}
// dbUrl has value process.env.DATABASE_URL or localUrl;
var dbUrl = process.env.DATABASE_URL || localUrl;

// db has value spicedPg with parameter dbUrl
var db = spicedPg(dbUrl);

/*
- module export - hashPassword has value of function which one have plainTextPassword for parameter,
    - log: string 'about hash' and parameter plainTextPassword,
    - return new Promise, with function which one have parameters: resolve, reject
        - bcrypt.genSalt has function which one have parameters: err, salt
            - condition if err 
                - returns reject with parameter err;
            - log: string:'plainTextPassword' and plainTextPassword
                   string:'salt' and salt
            -  bcrypt.hash has next parameters: plainTextPassword, salt and function with parameters err and hash
                - condition if err 
                    - returns reject with parameter err;
                - resolve has for parameter hash,
                - log: string: 'users.js: hashPassword successful' and hash parameter
*/
module.exports.hashPassword = function (plainTextPassword) {
    console.log("about to hash", plainTextPassword);
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(function (err, salt) {
            if (err) {
                return reject(err);
            }
            console.log('plainTextPassword', plainTextPassword, 'salt', salt);
            bcrypt.hash(plainTextPassword, salt, function (err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
                console.log('users.js: hashPassword successful', hash)

            });
        });
    });
};

/*
- module export - checkPassword has value of function which one have textEnteredInLoginForm and hashedPasswordFromDatabase
  for parameter,
    - return new Promise, with function which one have parameters: resolve, reject
        - bcrypt.compare has next parmeters: textEnteredInLoginForm, hashedPasswordFromDatabase and 
          function which one have parameters: err, doesMatch
            - condition if err 
                - returns reject with parameter err;
            - else/otherwise 
                - resolve has parameter doesMath    
*/
module.exports.checkPassword = function (textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function (err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};

/*
- module export - addUser has value of function which one have next parameters:first, last, email, password, course, role,
    - insert has value of string : `INSERT INTO users (first_name, last_name, email, password, course, role ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, role`
    - result has value of db.query with parameter insert
    - returns result 
*/
module.exports.addUser = function (first, last, email, password, course, role) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, course, role ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, role`;

    const result = db.query(insert);

    return result;
}