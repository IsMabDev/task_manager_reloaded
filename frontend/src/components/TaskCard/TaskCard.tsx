import "@/globals.css"
import React, { useState } from "react";
import {Status, Task} from "../../utils/tasksUtils/tasksTypeAndDB"


const TaskCard = ({ initialTask, handleChangeStatus }:{initialTask:Task, handleChangeStatus: (id:number,status:Status) => void}) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<Task>({ ...initialTask });
  const handleChangeStatusCard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeStatus(task.id, event.target.value as Status);
  }
  function updateTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    const newTitle = event.target.value;
    task.title = newTitle;
    setTask({ ...task,title: newTitle });
  }

  return (
  
  <div 
  draggable
  onDragStart={(e) => {e.dataTransfer.setData("text/plain",(task.id).toString())}}
  className="cardContent  flex flex-col  justify-between h-full bg-green-100 border rounded px-2" >
    {isEditing? <input title="title" className="titleCard  font-bold text-sm self-center" type="text" value={task.title} onChange={updateTitle} 
    onBlur={()=>{setIsEditing(false)}}/> :
    <h3 
      className="titleCard  text-red-700 font-bold text-sm self-center" 
      onClick={()=>{setIsEditing(true)}}
    >{task.id} - {task.title}</h3>
  }
    <p className="descriptionCard text-sm text-gray-500 " >{task.description} <br />
   
    </p>
    <div className="flex justify-between w-full items-center" >
      <p className="dueDateCard text-sm">Due: {task.dueDate && new Date(task.dueDate).toLocaleDateString('fr-Fr')}</p>
      
      <select 
      title="status"
      value={task.status}
      onChange={handleChangeStatusCard}
      className="border rounded p-1 m-1 text-[0.5rem]"> 

        <option value="todo">To do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>


      </select>
    </div>
  </div>
);}


export default TaskCard;
