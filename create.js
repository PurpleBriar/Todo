var bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();
var dataModel = require('./model.js');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/newtask', function(req, res){
    res.render('newtask');
});

router.post('/newtask', function(req, res){
    console.log(req.body);
    var taskInfo = req.body; //Get the parsed information
    if(!taskInfo.name || !taskInfo.description || !taskInfo.targetCompletionDate){
       res.render('showmessage', {
          message: "Sorry, you did not fill out all task fields.", type: "error",
          previous: '/create/newtask', home: '/home'});
    } else {
       var newTask = new dataModel.Task({
          name: taskInfo.name,
          description: taskInfo.description,
          targetCompletionDate: taskInfo.targetCompletionDate
       });
         
       newTask.save(function(err){
          if(err)
             res.render('showmessage', {message: "Database error", type: "error"});
          else
             res.render('showmessage', {
                message: "New task added", type: "success", task: taskInfo,
                previous: '/create/newtask', home: '/home'});
       });
    }
});

//Error message
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});
 
//export this router to use in our index.js
module.exports = router;