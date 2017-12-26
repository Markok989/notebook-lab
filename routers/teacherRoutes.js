const path = require('path');

// component teacherRoutes with parameter app,
// app get have path "/teacher" and function with parameters: req and res,
// res sand file to the path with join __dirname + /index.html
var teacherRoutes = (app) => {
    app.get('/teacher', function (req, res) {
        return res.sendFile(path.join(__dirname + '../index.html'));
    });
};

// export module 
// module.exports.teacherRoutes = teacherRoutes;
module.exports = teacherRoutes;