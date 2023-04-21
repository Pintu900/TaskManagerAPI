class validator {
    static validateTaskInfo(taskInfo) {
      if(taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completed") && this.validateTitle(taskInfo)
        && this.validateDescription(taskInfo) && this.validateCompletdStatus(taskInfo)
        && this.validatePriorityStatus(taskInfo)) {
          return {
            "status": true,
            "message": "Task has been added"
          };
        }
        if(!this.validateTitle(taskInfo)){
          return {
            "status": false,
            "message": "Title must be present"
          };
        }
        if(!this.validateDescription(taskInfo)){
            return {
              "status": false,
              "message": "Description must be present"
            };
          }
        if(!this.validateCompletdStatus(taskInfo)){
            return {
              "status": false,
              "message": "Completed status must me boolean"
            };
          }

          if(!this.validatePriorityStatus(taskInfo)){
            return {
              "status": false,
              "message": "Priority must be 'low', 'medium', 'high'"
            };
          }
        return {
          "status": false,
          "message": "Course Info is malformed please provide all the properties"
        }
    }
  
    static validateTitle(task) {
        if (!task.title || task.title.trim().length === 0) {
          return false;
        }
        return true;
      }

      static validateDescription(task) {
        if (!task.description || task.description.trim().length === 0) {
          return false;
        }
        return true;
      }

      static validateCompletdStatus(task) {
        if (typeof task.completed !== 'boolean') {
          return false;
      }
      return true;
    }
    static validatePriorityStatus(task) {
      if (task.priority == "low" || task.priority == "medium" || task.priority == "high") {
        return true;
    }
    return false;
  }
}
  
  module.exports = validator;