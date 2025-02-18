import "@/globals.css"
import React, { useState } from "react";
import SideBar from "./SideBar";
import TasksContainer from "./Tasks/TasksContainer";
import HeaderBar  from "./HeaderBar";
import CategoriesContainer from "./Categories/CategoriesContainer";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("categories");
  const renderContent = () => {
    switch (activeSection) {
      case "tasks":
        return <TasksContainer />;
      case "teams":
        return <div>Teams</div>;
      case "categories":
        return <CategoriesContainer />
      
      default:
        return <div>Please select a section in the sidebar</div>;
    }
  }
  return (
    <div className="globalContainer flex wlex-wrap flex-col h-screen "> 
      <HeaderBar />
      <div className="sideBarContentListContainer flex  flex-1">
        <SideBar setActiveSection={setActiveSection}/>
        {renderContent()}        
      </div>

    </div>
  );
};

export default Dashboard;
