const express = require('express');
const app = express();
const path = require('path');

//middleware modules
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const mw = require('./routers/middleware');

//route modules
const loggedOutRoutes = require("./routers/loggedOutRoutes.js");
const studentRoutes = require("./routers/studentRoutes.js");
const teacherRoutes = require("./routers/teacherRoutes.js");
const teacherGradingRoutes = require("./routers/teacherGrading.js");

// For DB
// DBUrl: postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf

/* Start bundle-server.js in terminal to have webpack compile bundle.js
    Then start server.js in another terminal which will get bundle.js from the proxy.s
*/
if (process.env.NODE_ENV != 'production') {

    // app.use(require('./build'));
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:7071'

    }));
}

// var secret = process.env.SESSION_SECRET || require('./secrets.json').sessionSecret;
var secret = 'test';
// var secret = 'postgres://qdzpwmxf:4QKHT0tKxYTWp02dCMPk6sCg0RExLYwj@dumbo.db.elephantsql.com:5432/qdzpwmxf';

//use middleware here
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'session',
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

//csurf check

// app.use(csurf());
// app.use(function(req, res, next) {
//     res.cookie('north_Shore__Wave___Rider', req.csrfToken());
//     next();
// });

//get static files from public directory
app.use(express.static('./public'));

loggedOutRoutes(app);
studentRoutes(app);
teacherRoutes(app);
teacherGradingRoutes(app);

// 404.html
app.get('*', mw.loggedInCheck, function (req, res) {

    console.log('file not found');
    return res.sendFile(path.join(__dirname + './public/index.html'));

});

app.listen(7070, function () {
    console.log("I'm listening.");
});