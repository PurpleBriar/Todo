var bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();
var dataModel = require('./model.js');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/:id', function(req, res){
    // find all tasks 
    /*dataModel.Task.find(function (err, allTasks) {
         if (err) return handleError(err);
         // 'allTasks' contains the list of all tasks.
         console.log(allTasks);
         res.render('homepage',{allTasks: allTasks} );
    })*/

    dataModel.Task.findById(req.params.id, function(err, foundTask){
        //if (err) return handleError(err);
        console.log(foundTask);
        res.render('taskdata', {currentTask: foundTask});
     });
    
});

router.post('/',function(req, res){
    console.log(req.body);
    var taskInfo = req.body;
    var updatedFields = 0;

    if((taskInfo.selectName == 'on') && (taskInfo.updatedName != "")){
        dataModel.Task.findByIdAndUpdate(taskInfo.itemId, {name: taskInfo.updatedName}, {useFindAndModify: false},
        function(err, response){
            console.log(response);
            
            updatedFields+=1;
        });
    }

    if((taskInfo.selectTargetCompletion == 'on') && (taskInfo.updatedTargetCompletion != '')){
        dataModel.Task.findByIdAndUpdate(taskInfo.itemId, {targetCompletionDate: taskInfo.updatedTargetCompletion}, {useFindAndModify: false},
        function(err, response){
            console.log(response);
            
            updatedFields+=1;
        });
    }

    if((taskInfo.selectCompletion == 'on') && (taskInfo.updatedCompletion != '')){
        dataModel.Task.findByIdAndUpdate(taskInfo.itemId, {completionDate: taskInfo.updatedCompletion}, {useFindAndModify: false},
        function(err, response){
            console.log(response);
            
            updatedFields+=1;
        });
    }

    if((taskInfo.selectDescription == 'on') && (taskInfo.updatedDescription != "")){
        dataModel.Task.findByIdAndUpdate(taskInfo.itemId, {description: taskInfo.updatedDescription}, {useFindAndModify: false},
        function(err, response){
            console.log(response);
            
            updatedFields+=1;
        });
    }
    res.render('fieldUpdated', {task: taskInfo, home: '/home'});
});

//export this router to use in our index.js
module.exports = router;