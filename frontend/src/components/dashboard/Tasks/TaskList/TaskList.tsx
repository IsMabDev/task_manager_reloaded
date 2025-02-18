/* eslint-disable react/prop-types */

import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "@/globals.css"
import { Task,Status } from "../../../../utils/tasksUtils/tasksTypeAndDB";
const TaskList = (({ tasks, handleChangeStatus }:{tasks:Task[], handleChangeStatus: (id:number, status:Status) => void}) => {
  

  return (
    <div 
    
    className="TasklistContainerflex flex-col  min-w-50 min-h-20  gap-1 hmt-0.5">
      {tasks.map((task:Task) => (
        <TaskCard key={task.id} initialTask={task} handleChangeStatus={handleChangeStatus} />
      ))}
    </div>
  );
});

export default TaskList;
