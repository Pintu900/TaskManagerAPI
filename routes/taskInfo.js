const taskRoutes = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

let taskData = {"tasks":[{
    "id":1,
    "title":"Check Emails",
    "description":"Need to check emails for important meetings",
    "completed":false
}]};

taskRoutes.get('/',(req,res)=>{
    res.status(200);
    res.send(taskData.tasks);
});

module.exports = taskRoutes;