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

app.get('/', function (req, res) {
    // find all tasks 
    dataModel.Task.find(function (err, allTasks) {
         if (err) return handleError(err);
         // 'allTasks' contains the list of all tasks.
         console.log(allTasks);
         res.render('homepage',{allTasks: allTasks} );
    })
  });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.use('/home', routes);
app.use('/create', newtask);
app.use('/viewUpdate', taskRecord);

app.listen(port, function(){
    console.log("app running");
});