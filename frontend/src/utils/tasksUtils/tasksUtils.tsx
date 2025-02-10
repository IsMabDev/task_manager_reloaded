
import api from "../api/api";
import {Task} from "./tasksTypeAndDB"
export const sortTasksByDate = (tasks:Task[]) => {
  return tasks.sort((a:Task, b:Task) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY;
    return dateA - dateB;
  });
  
}


export const getColumns = (tasks:Task[]) => {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return [todoTasks, inProgressTasks, doneTasks];
}


  