var bodyParser = require('body-parser')
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var dataModel = require('./model.js');
var routes = require('./routes.js');
var newtask = require('./create.js');
var taskRecord = require('./viewUpdate.js');

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.use('/home', routes);
app.use('/create', newtask);
app.use('/viewUpdate', taskRecord);

app.listen(port, function(){
    console.log("app running");
});