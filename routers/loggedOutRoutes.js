const path = require('path');
const dbHashing = require('../database/hashing');

var loggedOutRoutes = (app) => {

    // app get have path "/" and function with parameters: req and res,
    // res sand file to the path with join __dirname + /index.html
    app.get('/', (req, res) => {
        return res.sendFile(path.join(__dirname, '../index.html'));
    });

    /*
       - app post have path '/student/register' and function with parameters: req and res,
            - log: string "student server post",   
            - first, last, email, password, course belong to req.body
            - condition if parametes first and last and email and password
                - log: string "success", 
                - log: parameters first and last,
                - dbHashing.hashPassword with parameter password, with word "then" we use function with parameter hash access to:
                    - return dbHashing.addStudent has parameters first, last, email, hash, course,
                    - then with word "then" access function with parameter result,
                       - log: string 'studet' and parameter result
                       - res.json has property success with value true
                - catch access function with parameter err      
                    - log parameter err
            - catch access function with parameter err      
                - log parameter err        
       */
    app.post('/student/register', (req, res) => {
        console.log('student server post');
        const { first, last, email, password, course } = req.body;

        if (first && last && email && password && course) {

            console.log("success")
            console.log(first, last);

            dbHashing.hashPassword(password)
                .then((hash) => {

                    return dbHashing.addStudent(first, last, email, hash, course)

                        .then((result) => {
                            console.log('studet', result);

                            res.json({
                                success: true
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    });

    /*
    - app post have path '/teacher/register' and function with parameters: req and res,
        - log: string "teacher server post",   
        - first, last, email, password, course belong to req.body
        - condition if parametes first and last and email and password
            - dbHashing.hashPassword with parameter password, with word "then" we use function with parameter hash
               - log: string "adding user to DB" and parameter hash
               - return dbHashing.addTeacher has parameters first, last, email, hash,
                    - then with word "then" access function with parameter result,
                        - log: string 'teacher' and parameter result
                        - res.json has property success with value true
                    - catch access function with parameter err      
                        - log parameter err 
            - catch access function with parameter err      
                - log parameter err      
    */
    app.post('/teacher/register', (req, res) => {
        console.log('teacher server post');

        const { first, last, email, password, course } = req.body;

        //unless we make two different app.post depending on if teacher or student

        if (first && last && email && password) {

            dbHashing.hashPassword(password)
                .then((hash) => {
                    console.log('adding user to DB', hash);
                    return dbHashing.addTeacher(first, last, email, hash)
                        .then((result) => {
                            console.log('teacher', result);
                            res.json({
                                success: true
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })

    /*
    - app post have path '/login' and function with parameters: req and res,
        - email, password, course belong to req.body
        - dbHashing.hashPassword with parameter email
        - with word "then" we use function with parameter result
            - dbHashing.checkPassword with parameter password and  result.rows[0].password 
            - with word "then" we use function with parameter doesMatch
                - condition if not doesMatch
                    - throw string 'Password is incorrect.'
                - elese:
                    -  id, first, last, email, course, role belong to result.rows[0]
                    - req.session.user has properties: id, first, last, email, couse, role
                    - res.json has property success with value true
            - catch access function with parameter err      
                - log parameter err 
        - catch access function with parameter err      
            - log parameter err      
    */
    app.post('/login', (req, res) => {
        const { email, password } = req.body;

        dbHashing.getUserByEmail(email)
            .then((result) => {
                dbHashing.checkPassword(password, result.rows[0].password)
                    .then((doesMatch) => {
                        if (!doesMatch) {
                            throw 'Password is incorrect.'
                        } else {
                            const { id, first, last, email, course, role } = result.rows[0];

                            req.session.user = {
                                id, first, last, email, couse, role
                            }

                            res.json({
                                success: true
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
            }).catch((err) => {
                console.log(err);
            })
    })
};

// export module 
// module.exports.loggedOutRoutes = loggedOutRoutes;
module.exports = loggedOutRoutes;