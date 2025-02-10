import "@/globals.css"
import React, { useState } from "react";
import SideBar from "./SideBar";
import TasksContainer from "../TasksContainer";
import HeaderBar  from "./HeaderBar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("tasks");
  const renderContent = () => {
    switch (activeSection) {
      case "tasks":
        return <TasksContainer />;
      case "teams":
        return <div>Teams</div>;
      case "categories":
        return <div>Categories</div>;
      
      default:
        return <div>Please select a section in the sidebar</div>;
    }
  }
  return (
    <div className="globalContainer flex wlex-wrap flex-col h-screen "> 
      <HeaderBar />
      <div className="sideBarContentListContainer flex bg-amber-100 flex-1">
        <SideBar setActiveSection={setActiveSection}/>
        {renderContent()}        
      </div>

    </div>
  );
};

export default Dashboard;
