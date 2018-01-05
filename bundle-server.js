const express = require('express');

const app = express();

app.use(require('./build'));

app.listen(7071, () => console.log('Ready to compile and serve bundle.js'));
