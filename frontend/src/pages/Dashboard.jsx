import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../utils/api";

const Dashboard = () => {
    const navigate = useNavigate();
const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(() => api
      .get("/tasks") // Example endpoint
      .then((response) => {
        console.log("date: " + Date.now() + "response: " + JSON.stringify(response.data))
        setTasks(response.data) })
      .catch((error) => {
        navigate("/login")
        console.log("error fetching tasks: ", error);
      })
    .finally(() => setLoading(false)));
  }, [navigate]);

  if (loading)
    return <div>Loading...</div>;
  console.log("tasks: ", tasks);
  return <div>Dashboard
        <ul> 
      {tasks.length>0 ? tasks.map((task) => (
        <li key={task.id}>
          {task.title}
        </li>
      )):<p>no tasks found</p>}
    </ul>
  </div>;
};

export default Dashboard;
