const taskRoutes = require('express').Router();
const bodyParser = require('body-parser');
const validator = require('../helper/validator');
const path = require('path');

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

let autoId = 2;

let taskData = {"tasks":[{
    "id":1,
    "title":"Check Emails",
    "description":"Need to check emails for important meetings",
    "completed":false,
    "priority":"low"
}]};

taskRoutes.get('/',(req,res)=>{
    res.status(200);
    res.send(taskData.tasks);
});

taskRoutes.get('/:id',(req,res)=>{
    let tasks = taskData.tasks;
    let taskid = parseInt(req.params.id);

    let result = tasks.find(task => task.id === taskid);
    
    if(result === undefined){
        res.status(404).send("Task Not Found");
    }else{
        res.status(200).send(result); 
    }
})

taskRoutes.get('/priority/:level',(req,res)=>{
    let priority = req.params.level;

    let result = taskData.tasks.filter(task => task.priority == priority);
    res.status(200).send(result);
})

taskRoutes.post('/',(req,res)=>{
    const taskInfo = req.body;
    if(validator.validateTaskInfo(taskInfo).status){
        taskInfo["id"]=autoId;
        autoId++;
        taskData.tasks.push(taskInfo);
        res.status(200).json(validator.validateTaskInfo(taskInfo));
    } else{
        res.status(400).json(validator.validateTaskInfo(taskInfo));
    }
});

taskRoutes.put('/:id',(req,res)=>{
    let tasks = taskData.tasks;
    let taskid = parseInt(req.params.id);
    let taskInfo = req.body;

    let result = tasks.findIndex(task => task.id === taskid);
    
    if(result === -1){
        res.status(404).send("Resource Not Found");
    }else{
        if(validator.validateTaskInfo(taskInfo).status){
            taskData.tasks[result].title=req.body.title;
            taskData.tasks[result].description=req.body.description;
            taskData.tasks[result].completed=req.body.completed;
            taskData.tasks[result].priority=req.body.priority;
            res.status(200).json(validator.validateTaskInfo(taskInfo));
        } else{
            res.status(400).json(validator.validateTaskInfo(taskInfo));
        }
    }
})

taskRoutes.delete('/:id',(req,res)=>{
    let taskId = req.params.id;
  
  let newTaskData = taskData.tasks.filter(task => task.id != taskId);
  
  // Check if a task was actually deleted by comparing the length of the original and new arrays
  if (newTaskData.length === taskData.tasks.length) {
    res.status(404).send(`Task with ID ${taskId} not found`);
  } else {
    // Update the taskData object to use the new array without the deleted task
    taskData.tasks = newTaskData;
    res.status(200).send(`Task with ID ${taskId} deleted successfully`);
  }
})

module.exports = taskRoutes;