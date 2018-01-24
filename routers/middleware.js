/*
- function registerLoginCheck with parameters req, res and next
    - condition if req.session.user
        - condition if req.session.user.role is the same as string "teacher"
            - res redirect to '/teacher
        - else
            - res redirect to '/student'
    - else next
*/
function registerLoginCheck(req, res, next) {

    if (req.session.user) {

        // logged in
        if (req.session.user.role == 'teacher') {
            res.redirect('/teacher');
        } else {
            res.redirect('/student');
        }

    } else {
        // not logged in to registration page
        next();
    }

}

/*
- function loggedInCheck with parameters req, res and next
    - condition if req.session.user

        - log string "user is logged in sending to next"

        - next()
    - else 
        - res redirect to '/'
*/
function loggedInCheck(req, res, next) {

    if (req.session.user) {
        // logged in!

        console.log('user is logged in sending to next');

        next();
    } else {
        res.redirect('/');
    }

}

//add student check and teacher check.
/*
- function checkIfTeacher with parameters req, res and next

    - log string 'checking if teacher'
    - condition if req.session.user.role is the same as 'teacher'

        - next()

    - else 

        -log string 'user is not teacher, routing to student'
        - res. reditect to path '/student'
*/
function checkIfTeacher(req, res, next) {

    console.log('checking if teacher');
    if (req.session.user.role == 'teacher') {

        next();

    } else {

        console.log('user is not teacher, routing to student');
        res.redirect('/student');

    }

}

/*
- function checkIfStudent with parameters req, res and next

    - log string 'checking if student'
    - condition if req.session.user.role is the same as 'student'

        - next()

    - else 

        - log string 'user is not student, routing to teacher'
        - res. reditect to path '/student'
*/
function checkIfStudent(req, res, next) {

    console.log('checking if student');
    if (req.session.user.role == 'student') {

        next();

    } else {

        console.log('user is not student, routing to teacher');
        res.redirect('/teacher');

    }
}

// export as modul
module.exports.checkIfTeacher = checkIfTeacher;
module.exports.checkIfStudent = checkIfStudent;
module.exports.loggedInCheck = loggedInCheck;
module.exports.registerLoginCheck = registerLoginCheck; 