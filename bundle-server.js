// server

const express = require('express');

const app = express();
var x = require('./build');
console.log('X: ', x);
app.use(x);

app.listen(7071, () => console.log('Ready to compile and serve bundle.js'));