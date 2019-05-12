const express = require('express');
const bodyParser = require("body-parser");
const cors= require('cors');
const morgan = require('morgan');

require('./config/database');
const app = express();
const routev1= require('./routes/route');
app.use(morgan('combined'));


app.use(cors())
app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',routev1)
app.listen(5000, () => {
 console.log("Server running on port 5000");
});

module.exports = app
