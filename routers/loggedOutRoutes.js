const path = require('path');
// component loggedOutRoutes with parameter app,
// app get have path "/" and function with parameters: req and res,
// res sand file to the path with join __dirname + /index.html
var loggedOutRoutes = (app) => {
    app.get('/', function (req, res) {
        return res.sendFile(path.join(__dirname + '../index.html'));
    });
};

// export module 
// module.exports.loggedOutRoutes = loggedOutRoutes;
module.exports = loggedOutRoutes;