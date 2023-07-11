let cors = require('cors');
let router = require('./routes/routes');
let bodyParser = require('body-parser');
const express = require('express');
const uploadConfig = require('./config/configMulter');
const app = express();

// app.use(
//   bodyParser.json({
//     type: ['application/x-www-form-urlencoded', 'application/json'], // Support json encoded bodies
//   })
// );
// var fileupload = require('express-fileupload');
// app.use(fileupload());
const port = 80;

app.use(cors());
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.get('/', (req, res) => {
//   console.log('aqui');
// });
app.use('/', router);
// app.post('/game', uploadConfig.single('capa'), (req, res) => {
//   res.send('sucess : ' + req.file.filename);
// });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
