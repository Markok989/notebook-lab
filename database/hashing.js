var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
//const secrets = require('../secrets.json');
// const secrets = 'test';
// // const db = spicedPg(`postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`);
// const db = spicedPg(`postgres:qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`);
var localUrl = '';

if (!process.env.DATABASE_URL) {

    const secrets = 'test';
    localUrl = `postgres:qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf`;

}

var dbUrl = process.env.DATABASE_URL || localUrl;

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

    //  console.log("about to hash", plainTextPassword);
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
                // console.log('users.js: hashPassword successful', hash)

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
- module export - addStudent has value of function which one have next parameters: first_name, last_name, email, password,
    - insert has value of string : `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'student') RETURNING id, first_name, last_name, email, role `;
    - result has value of db.query(insert, [first_name, last_name, email, password])
    - returns result 
*/
module.exports.addStudent = function (first_name, last_name, email, password) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'student') RETURNING id, first_name, last_name, email, role `;
    const result = db.query(insert, [first_name, last_name, email, password]);
    return result;

}

/*
- module export - addTeacher has value of function which one have next parameters: first_name, last_name, email, password,
    - insert has value of string : `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'teacher') RETURNING id, first_name, last_name, email, role `,
    - result has value of db.query(insert, [first_name, last_name, email, password])
    - returns result 
*/
module.exports.addTeacher = function (first_name, last_name, email, password) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'teacher') RETURNING id, first_name, last_name, email, role `;
    const result = db.query(insert, [first_name, last_name, email, password]);
    return result;

}

/*
- module export - getUserByEmail has value of function which one have next parameter email,
    - insert has value of string : `SELECT * FROM users WHERE email=$1`
    - result has value of db.query(select, [email]);
    - returns result 
*/
module.exports.getUserByEmail = function (email) {

    const select = `SELECT * FROM users WHERE email=$1`;
    const result = db.query(select, [email]);
    return result;

}