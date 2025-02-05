/* eslint-disable react/prop-types */

import TaskCard from "../TaskCard/TaskCard";
import "@/globals.css"
const TaskList = (({ tasks, handleChangeStatus }) => {
  

  return (
    <div 
    
    className="flex flex-col gap-1 hmt-0.5">
      {tasks.map((task) => (
        <TaskCard key={task.id} initialTask={task} handleChangeStatus={handleChangeStatus} />
      ))}
    </div>
  );
});

export default TaskList;
