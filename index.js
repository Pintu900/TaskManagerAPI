const path =require('path');
const express = require('express');
const routes = require('express').Router();
const bodyParser = require('body-parser');
const tasksInfo = require('./routes/taskInfo');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.get('/', (req, res)=>{
    res.status(200).send("Welcome to the airtribe launchpad rating app");
  });

routes.use('/tasks',tasksInfo);
  
const port = process.env.PORT || 3000;
app.listen(port,(error)=>{
    if(!error)
    console.log(`server is running on port ${port}`);
    else
    console.log("Error occurred, server can't start", error);
});
