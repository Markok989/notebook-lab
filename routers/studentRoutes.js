const path = require('path');
// component studentRoutes with parameter app,
// app get have path "/student" and function with parameters: req and res,
// res sand file to the path with join __dirname + /index.html
var studentRoutes = (app) => {
    app.get('/student', (req, res) => {
        return res.sendFile(path.join(__dirname + '../index.html'));
    });
};

// export module 
// module.exports.studentRoutes = studentRoutes;
module.exports = studentRoutes;