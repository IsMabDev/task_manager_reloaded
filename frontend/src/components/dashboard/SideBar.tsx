import React from "react";

function SideBar({setActiveSection}:{setActiveSection: (section: string) => void}) {
  return (
    <div className="sidebar  p-6 text-2xl font-bold border-b border-gray-700">
      <ul className="flex flex-col gap-4 ">
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
      className="buttonSideBar w-full px-6 py-3 text-left text-gray-500 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:bg-gray-700"
      onClick={onClick}
      >{title}
    </button>
    </div>
  );
}
export default SideBar;