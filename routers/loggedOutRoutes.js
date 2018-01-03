import { hashPassword } from '../database/hashing';
import { error } from 'util';

const path = require('path');
const dbHashing = require('../database/hashing');

// component loggedOutRoutes with parameter app,

var loggedOutRoutes = (app) => {

    // app get have path "/" and function with parameters: req and res,
    // res sand file to the path with join __dirname + /index.html
    app.get('/', (req, res) => {

        return res.sendFile(path.join(__dirname + '../index.html'));
    });

    // app.get('/register', (req, res) => {
    //     if(!req.session.user) {
    //         res.sendFile(__dirname + '../index.html');
    //     }
    // })

    /*
    - app post have path '/student/register' and function with parameters: req and res,
    - first, last, email, password, course belong to req.body
    - condition if parametes first and last and email and password
        - dbHashing.hashPassword with parameter password, with word "then" we use function with parameter hashedPassword
            - log: string "adding user to DB" and parameter hashedPassword
            - dbHashing.addUser has parameters first, last, email, hashedPassword, course and string "students"
                - then with word "then" access function with parameter result,
                    - id, first, last, email, role belong to result.rows[0];
                    - req.session.user has property: id, first, last, email, role
                    - res.json has property success with value true
        - catch access function with parameter err      
            - log parameter err       
    */
    app.post('/student/register', (req, res) => {

        const { first, last, email, password, course } = req.body;

        // unless we make two diffrent app.post depending on if teacher or student

        if (first && last && email && password) {

            dbHashing.hashPassword(password).then((hashedPassword) => {

                console.log('adding user to DB', hashedPassword);
                dbHashing.addUser(first, last, email, hashedPassword, course, 'student');

            })
                .then((result) => {

                    const { id, first, last, email, role } = result.rows[0];

                    req.session.user = {
                        id, first, last, email, role
                    }

                    res.json({
                        success: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });

    /*
       - app post have path '/teacher/register' and function with parameters: req and res,
       - first, last, email, password, course belong to req.body
       - condition if parametes first and last and email and password
           - dbHashing.hashPassword with parameter password, with word "then" we use function with parameter hashedPassword
               - log: string "adding user to DB" and parameter hashedPassword
               - dbHashing.addUser has parameters first, last, email, hashedPassword, course and string "teacher"
                   - then with word "then" access function with parameter result,
                       - id, first, last, email, role belong to result.rows[0];
                       - req.session.user has property: id, first, last, email, role
                       - res.json has property success with value true
           - catch access function with parameter err      
               - log parameter err       
       */
    app.post('/teacher/register', (req, res) => {

        const { first, last, email, password, course } = req.body;

        //unless we make two different app.post depending on if teacher or student

        if (first && last && email && password) {

            dbHashing.hashPassword(password).then((hashedPassword) => {
                console.log('adding user to DB', hashedPassword);
                dbHashing.addUser(first, last, email, hashedPassword, course, 'teacher');

            })
                .then((result) => {

                    const { id, first, last, email, role } = result.rows[0];

                    req.session.user = {
                        id, first, last, email, role
                    }

                    res.json({
                        success: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })
};

// export module 
// module.exports.loggedOutRoutes = loggedOutRoutes;
module.exports = loggedOutRoutes;