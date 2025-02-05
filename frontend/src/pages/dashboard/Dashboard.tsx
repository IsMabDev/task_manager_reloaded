import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css"
import "@/globals.css"
import notificationIcon from "@/assets/icons/notifications.svg"
import api from "../../utils/api";
import TaskList from "@/components/TaskList/TaskList";
import {tasks as localTasks, Task} from "@/pages/tests/tasks"
import React from "react";


const sortTasksByDate = (tasks:Task[]) => {
  return tasks.sort((a:Task, b:Task) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY;
    return dateA - dateB;
  });
  
}
// group objects by key the result is an object with the key as the key and the value as the array of objects 
const groupObjectsByKey= ((arrayOfObjects:Object[],keyToGroup:string)=> {
  const result= arrayOfObjects.reduce((groupedObjects:any,object:any)=>{
  if (!groupedObjects[object[keyToGroup]]) groupedObjects[object[keyToGroup]]=[]
  groupedObjects[object[keyToGroup]].push(object)
  return groupedObjects
},{})
return result})



const getColumns = (tasks:Task[]) => {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return [todoTasks, inProgressTasks, doneTasks];
}
const Dashboard = () => {
  
  
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

  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userImageUrl="@/../public/userPhoto.jpg"
  const [tasks, setTasks] = useState([]);
  const handleChangeStatus = (taskId: number, newStatus: string) => { // Log the updated value to the consoleevent);
    const updatedTask = tasks.filter((task) => task.id === taskId);
    updatedTask[0].status = newStatus;
    
    const updatedTasks=[...tasks]
    setTasks(updatedTasks);
  }
  useEffect(() => {
    // getTasksFromApi();
    getTasksFromFile();
      
    
  }, []);

  if (loading)
    return 
    <div>Loading...</div>;

  return (
    <div className="flex wlex-wrap flex-col h-screen "> 
      <div className="header  gap-x-2 flex justify-between w-full items-center px-10  border-2" >
        <h1 className="title text-gray-500 text-sm">Task Management</h1>
        <input className="search text-sm" type="text" placeholder="Search tasks" />
        <img src={notificationIcon} alt="notification" />
        <img className="userImage w-10 h-10 border-2 rounded-full " src={userImageUrl} alt="user" />
        <h4 className="userName text-sm">Minzo le Grand</h4>
      </div>
      <div className="flex bg-amber-100 flex-1">
        <div className="sidebar w-30 bg-gray-800 text-white rounded p-2">
          <ul>
            <li>Tasks</li>
            <li>Categories</li>
            <li>Team</li>
          </ul>
        </div>
        
        <div 
        
        className="cardsListContent  flex flex-wrap w-full">
          {Object.entries(groupObjectsByKey(tasks,"status")).map(([key, value]) => {
            return (
              <div 
              onDragOver={(e) => {
                e.preventDefault();
                
              }}
              onDrop={(e) => {
                e.preventDefault();
      
                const taskId = e.dataTransfer.getData("text/plain");
                
      
               
                const newStatus = e.currentTarget.title;
                const updatedTasks=tasks.map((task:Task) => {
                  if (task.id === Number(taskId)) {
                    return {
                      ...task,
                      status: newStatus
                    };
                  }
                  return task;
                });
          
                setTasks(updatedTasks);}}
              key={key} title={key} className="cardList  mx-0.5">
                <h2 className="text-center">{key}</h2>
                {tasks.length>0 ? 
                <TaskList tasks={value} handleChangeStatus={handleChangeStatus}/>
                :<p>no tasks found</p>}
              </div>
            );
          })
          }

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
