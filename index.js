let router = require('./routes/routes');
let bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 80;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
