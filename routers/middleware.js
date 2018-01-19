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
        res.redirect('/')
    }

}

//add student check and teacher check.

// export as modul
module.exports.loggedInCheck = loggedInCheck;
module.exports.registerLoginCheck = registerLoginCheck; 