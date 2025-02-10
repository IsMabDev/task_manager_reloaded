/* eslint-disable react/prop-types */

import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "@/globals.css"
import { Task,Status } from "../../utils/tasksUtils/tasksTypeAndDB";
const TaskList = (({ tasks, handleChangeStatus }:{tasks:Task[], handleChangeStatus: (id:number, status:Status) => void}) => {
  

  return (
    <div 
    
    className="flex flex-col gap-1 hmt-0.5">
      {tasks.map((task:Task) => (
        <TaskCard key={task.id} initialTask={task} handleChangeStatus={handleChangeStatus} />
      ))}
    </div>
  );
});

export default TaskList;
