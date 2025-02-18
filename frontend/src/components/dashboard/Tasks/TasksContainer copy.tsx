import React, { useEffect, useState } from "react";
import {tasks as localTasks, Status, Task } from "../../../utils/tasksUtils/tasksTypeAndDB";
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

const getTasksFromFile = async () => {
    setLoading(true); // Start loading

    try {
        
        setTasks(sortTasksByDate(localTasks)); // Update state with the retrieved tasks

    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    } finally {

        setLoading(false); // Stop loading regardless of success or failure
    }
};

  // group objects by key the result is an object with the key as the key and the value as the array of objects 
  const groupObjectsByKey= ((arrayOfObjects:Object[],keyToGroup:string)=> {
    const result= arrayOfObjects.reduce((groupedObjects:any,object:any)=>{
    if (!groupedObjects[object[keyToGroup]]) groupedObjects[object[keyToGroup]]=[]
    groupedObjects[object[keyToGroup]].push(object)
    return groupedObjects
  },{})
  return result})

  const [targetedColumn, setTargetedColumn] = React.useState<string | null >(null)
  const [classOnDrag, setClassOnDrag] = React.useState("");

  const handleDragEnter = ()=>{
    setClassOnDrag("bg-gray-200")
  }
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const handleChangeStatus = (taskId: number, newStatus: Status) => { // Log the updated value to the consoleevent);

    
  
    
    const updatedTask = tasks.filter((task) => task.id === taskId);
    updatedTask[0].status = newStatus;
    
    const updatedTasks=[...tasks]
    setTasks(updatedTasks);
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
        
        className={`cardsListContent  flex flex-wrap w-full $`}>
          {Object.entries(groupObjectsByKey(tasks,"status")).map(([key, value]) => {
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
                
      
               
                const newStatus: Status = e.currentTarget.title as Status;
                const updatedTasks: Task[]=tasks.map((task:Task) => {
                  if (task.id === Number(taskId)) {
                    return {
                      ...task,
                      status: newStatus
                    };
                  }
                  return task;
                });
          
                setTasks(updatedTasks);}}

              key={key} title={key} className={`cardList  mx-0.5  ${key=== targetedColumn ?classOnDrag:""}`}>
                <h2 className="text-center">{key}</h2>
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