var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 
    'mongodb://localhost/my_db', { useNewUrlParser: true}); //, useUnifiedTopology: true 

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var taskSchema = mongoose.Schema({
    name: String,
    description: String,
    targetCompletionDate: Date,
    completionDate: Date
 });

var Task = mongoose.model("Task", taskSchema);

module.exports.Task = Task;