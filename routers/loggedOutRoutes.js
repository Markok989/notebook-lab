// component loggedOutRoutes with parameter app,
// app get have function with parameters: req and res,
// res sand file to the path __dirname + /index.html
var loggedOutRoutes = (app) => {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });
};

// export module 
module.exports.loggedOutRoutes = loggedOutRoutes;