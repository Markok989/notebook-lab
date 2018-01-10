const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');
const mw = require('./middleware');

var loggedOutRoutes = (app) => {

    // app get have path "/", mw.registerLoginCheck(from middleware) and function with parameters: req and res,
    // res sand file to the path with join __dirname + /index.html
    app.get('/', mw.registerLoginCheck, (req, res) => {
        return res.sendFile(path.join(__dirname, '../index.html'));
    });

    /*
       - app post have path '/api/student/register' and function with parameters: req and res,
            - log: string "student server post",   
            - first_name, last_name, email, password, course belong to req.body
            - condition if parametes first_name and last_name and email and password
                - log: string "success", 
                - log: parameters first_name and last_name,
                - dbHashing.hashPassword with parameter password, with word "then" we use function with parameter hash access to:
                    - return dbHashing.addStudent has parameters first_name, last_name, email, hash,
                    - then with word "then" access function with parameter result,
                        - constants id, first_name, last_name, email and role belong to result.rows[0];
                        - req.session.user has properties:
                                id: id,
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                role: role
                        - dbStudent makeCourse has parameters (id, course);
                        - res.json has property success with value true
                - catch access function with parameter err      
                    - log parameter err
                    - res.json has property success with value false
            - catch access function with parameter err      
                - log parameter err        
       */
    app.post('/api/student/register', (req, res) => {
        console.log('student server post');
        const { first_name, last_name, email, password, course } = req.body;

        if (first_name && last_name && email && password && course) {

            console.log("success")
            console.log(first_name, last_name);

            dbHashing.hashPassword(password)
                .then((hash) => {

                    return dbHashing.addStudent(first_name, last_name, email, hash)

                        .then((result) => {

                            const { id, first_name, last_name, email, role } = result.rows[0];

                            req.session.user = {
                                id: id,
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                role: role
                            }

                            dbStudent.makeCourse(id, course);

                            res.json({
                                success: true
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                success: false
                            })
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });

    /*
        - app post have path '/api/teacher/register' and function with parameters: req and res,
             - log: string "student server post",   
             - first_name, last_name, email, password belong to req.body
             - condition if parametes first_name and last_name and email and password
                 - dbHashing.hashPassword with parameter password, with word "then" we use function with parameter hash access to:
                    - log string 'adding user to DB', and parameter hash,
                    - return dbHashing.addStudent has parameters first_name, last_name, email, hash,
                    - then with word "then" access function with parameter result,
                        - log string 'teacher'', and parameter result,
                        - constants id, first_name, last_name, email and role belong to result.rows[0];
                        - req.session.user has properties:
                                 id: id,
                                 first_name: first_name,
                                 last_name: last_name,
                                 email: email,
                                 role: role
                        - res.json has property success with value true
                 - catch access function with parameter err      
                     - log err.stack
             - catch access function with parameter err      
                 - log log err.stack       
        */
    app.post('/api/teacher/register', (req, res) => {
        console.log('teacher server post');

        const { first_name, last_name, email, password } = req.body;

        //unless we make two different app.post depending on if teacher or student

        if (first_name && last_name && email && password) {

            dbHashing.hashPassword(password)
                .then((hash) => {
                    console.log('adding user to DB', hash);
                    return dbHashing.addTeacher(first_name, last_name, email, hash)
                        .then((result) => {
                            console.log('teacher', result);

                            const { id, first_name, last_name, email, role } = result.rows[0]

                            req.session.user = {
                                id: id,
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                role: role
                            }

                            res.json({
                                success: true
                            });
                        })
                        .catch((err) => {
                            console.log(err.stack);
                        })
                })
                .catch((err) => {
                    console.log(err.stack);
                })
        }
    })

    /*
    - app post have path '/api/login' and function with parameters: req and res,
        - email, password, course belong to req.body
        - dbHashing.hashPassword with parameter email
        - with word "then" we use function with parameter result
            - dbHashing.checkPassword with parameter password and  result.rows[0].password 
            - with word "then" we use function with parameter doesMatch
                - condition if not doesMatch
                    - throw string 'Password is incorrect.'
                    - alert: 'Your email or password are incorrect'
                - elese:
                    - log string: 'password is correct' and result.rows, 
                    - req.session.user has properties: id, first, last, email, role
                    - res.json has property success with value true and role has value role
                    - condition if role is strictly the same as ;student
                        - res redirect to '/api/student'
                    - else 
                        - res redirect to '/api/teacher'
            - catch access function with parameter err      
                - log parameter err 
        - catch access function with parameter err      
            - log parameter err      
    */
    app.post('/api/login', (req, res) => {
        const { email, password } = req.body;

        dbHashing.getUserByEmail(email)
            .then((result) => {
                dbHashing.checkPassword(password, result.rows[0].password)
                    .then((doesMatch) => {
                        if (!doesMatch) {
                            throw 'Password is incorrect.';
                            alert('Your email or password are incorrect');
                        } else {
                            console.log('password is correct', result.rows);

                            const { id, first_name, last_name, email, role } = result.rows[0];

                            req.session.user = {
                                id, first_name, last_name, email, role
                            }

                            res.json({
                                success: true,
                                role: role
                            });

                            if (role === 'student') {
                                res.redirect('/api/student');
                            } else {
                                res.redirect('/api/teacher');
                            }

                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            }).catch((err) => {
                console.log(err);
            })
    })

    /*
    - app post have path '/logout' and function with parameters: req and res,
        - req session has value null,
        - res redirect to '/'
    */
    app.get('/logout', (req, res) => {
        req.session = null;
        res.redirect('/');
    });
};

//should put app.get with restrictions for req.session.user to not access the teacher side and vice versa.

// export module 
// module.exports.loggedOutRoutes = loggedOutRoutes;
module.exports = loggedOutRoutes;