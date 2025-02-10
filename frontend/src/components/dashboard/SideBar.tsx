import React from "react";

function SideBar({setActiveSection}:{setActiveSection: (section: string) => void}) {
  return (
    <div className="sidebar w-30 bg-gray-800 text-white rounded p-2 pt-10">
      <ul className="flex flex-col gap-4">
        <li><ButtonSideBar title="Tasks" onClick={() => setActiveSection("tasks")}/></li>
        <li><ButtonSideBar title="Categories" onClick={() => setActiveSection("categories")}/></li>
        <li><ButtonSideBar title="Teams" onClick={() => setActiveSection("teams")}/></li>
      </ul>
    </div>
  );
}

function ButtonSideBar({title, onClick}:{title:string, onClick: () => void}) {
  return (
    <div >
      <button 
      type="button" 
      className="cursor-pointer"
      onClick={onClick}
      >{title}
    </button>
    </div>
  );
}
export default SideBar;