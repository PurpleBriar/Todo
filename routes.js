var express = require('express');
var router = express.Router();

var dataModel = require('./model.js');

router.get('/', function(req, res){
   // find all tasks 
   dataModel.Task.find(function (err, allTasks) {
        if (err) return handleError(err);
        // 'allTasks' contains the list of all tasks.
        console.log(allTasks);
        res.render('homepage',{allTasks: allTasks} );
   })
   
});

router.get('/remove/:id', function(req, res){
   dataModel.Task.findByIdAndRemove(req.params.id, function(err, removedTask){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else {
          //res.json({message: "Record with id " + req.params.id + " removed."});
          res.render('recordRemoved',{removedTask: removedTask} );
      }
   });
});

/*
router.post('/', function(req, res){
   res.send('POST route on things.');
});*/

//Error message
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });

//export this router to use in our index.js
module.exports = router;