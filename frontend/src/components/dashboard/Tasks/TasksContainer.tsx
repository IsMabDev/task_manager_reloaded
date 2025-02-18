import React, { useEffect, useState } from "react";
import {tasks as localTasks, Status,statusValues, Task } from "../../../utils/tasksUtils/tasksTypeAndDB";
import TaskList  from '../Tasks/TaskList/TaskList';
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api/api";
import {sortTasksByDate} from "../../../utils/tasksUtils/tasksUtils";
function TasksContainer() {

  const getTasksFromApi= ()=>{
    api
      .get("/tasks") // Example endpoint
      .then((response:any) => {
        console.log("date: " + Date.now() + "response: " + JSON.stringify(response.data))
        setTasks(sortTasksByDate(response.data) );})
      .catch((error:any) => {
        navigate("/login")
        console.log("error fetching tasks: ", error);
      })
    .finally(() => setLoading(false));
  }

  const [targetedColumn, setTargetedColumn] = React.useState<string | null >(null)
  const [classOnDrag, setClassOnDrag] = React.useState("");

  
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const handleDragEnter = ()=>{
    setClassOnDrag("bg-gray-200")
  }
  const handleChangeStatus = async (taskId: number, newStatus: Status) => { // Log the updated value to the consoleevent);

      try{
    await api.put(`/tasks/${taskId}`, { status: newStatus })
      
    const updatedTask = tasks.filter((task) => task.id === taskId);
    updatedTask[0].status = newStatus;
    console.log("update task: ");

    const updatedTasks=[...tasks]
    setTasks(updatedTasks);

      }catch(err){
        console.log(err);
      }
    
  }
  useEffect(() => {
    getTasksFromApi();
    // getTasksFromFile();
      
    
  }, []);
  
  if (loading)
    return 
    <div>Loading...</div>;
  
  return (
    <div 
        
        className={`cardsListContent flex flex-wrap w-full `}>
          {statusValues.map((key, index) => {
            
            const value = tasks.filter((task) => task.status === key);
            return (
              <div 
              onDragOver={(e) => {
                e.preventDefault();
                setTargetedColumn(e.currentTarget.getAttribute("title"))
              }}
              onDragEnter={handleDragEnter}
              
              
              onDrop={(e) => {
                e.preventDefault();
                setClassOnDrag("")
                const taskId = e.dataTransfer.getData("text/plain");
                 handleChangeStatus(Number(taskId),key as Status);}
                }

              key={key} title={key} className={`cardList  mx-0.5  ${key=== targetedColumn ?classOnDrag:""}`}>
                <h2 className="HeaderText font-bold border-2 rounded text-center">{key}</h2>
                {tasks.length>0 ? 
                <TaskList tasks={value as Task[]} handleChangeStatus={handleChangeStatus}/>
                :<p>no tasks found</p>}
              </div>
            );
          })
          }

        </div>
  );
}

export default TasksContainer;