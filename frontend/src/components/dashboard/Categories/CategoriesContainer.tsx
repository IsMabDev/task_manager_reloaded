import React from "react"
import { useQuery } from '@tanstack/react-query';
import { getCategories , Category,categoriesByTitle} from "../Categories/categoriesUtils";
import CategoryCard from "./CategoryCard";
import api from "../../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { Task } from "../../../utils/tasksUtils/tasksTypeAndDB";
import TaskCard from "../Tasks/TaskCard/TaskCard";
function CategoriesContainer() {
  const navigate = useNavigate();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const { data:categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  
  const getColorCategoryofTitle = (title: string) => {
    
    const color = categories?.find((category: Category) => category.title === title)?.color
    
    return color
  }

  const handleCategoryClick = 
  (column: string) => {
    const clickedCategory = categories?.find((category: Category) => category.title === column);
    const categoryId = clickedCategory?.id;
    api
    .get(`/categories/${categoryId}/tasks`) // Example endpoint
    .then((response:any) => {
      setTasks(response.data)
      // console.log(response.data);
    })
    .catch((error:any) => {

      console.error(error);
    });
  };  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(error) {
    navigate("/login")
    console.log("error fetching categories: ", error);
    // return <div>Error: {error.message}</div>;
  } 
  if (categories!==undefined) {
     
  const categoriesColumns=categories.map((category) => category.title)
  
  const columnContainer=categoriesColumns.map((column) => {
    return (
      <CategoryCard
        key={column}
        column={column}
        onClick={() => handleCategoryClick(column)}
        colorCategory={getColorCategoryofTitle(column)}
      />
    ); 
  })
    function handleChangeStatus(id: number, status: "todo" | "in progress" | "done"): void {
      // throw new Error("Function not implemented.");
    }

  return (

    <div className="categoriesTaskcontainer  flex   w-full  ">
      <div className=" categoryContainer flex justify-center items-center w-1/3 text-sm flex-wrap"> 
        {columnContainer}
      </div>
      <div className="TasksRelatedContainer flex flex-wrap ml-5 w-full h-full">
        { 
          tasks.map((task: Task) => (
          <div className="w-full h-20">
              <TaskCard key={task.id} initialTask={task} handleChangeStatus={handleChangeStatus}  />
          </div>
        ))}
      </div>
    </div>
  )
} else return (
  <div>no categories</div>
)
}
export default CategoriesContainer;