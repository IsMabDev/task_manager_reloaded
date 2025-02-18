import React from "react"
import {notificationIcon} from '../../assets/icons';

const HeaderBar=()=> {
  const userImageUrl="@/../public/userPhoto.jpg"
  
  return (
    <div className="header bg-white shadow-sm w-full flex justify-between items-center px-8 py-4 border-b border-gray-200" >
        <h1 className="text-gray-700 text-lg font-semibold">Task Management</h1>
        <input className="search w-full max-w-md px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Search tasks" />
        <div className="relative">
  <img
    src={notificationIcon}
    alt="notification"
    className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
  />
  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
</div>
<div className="flex items-center space-x-3">
  <img
    src={userImageUrl}
    alt="user"
    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
  />
  <h4 className="text-sm text-gray-700 font-medium">Minzo le Grand</h4>
</div>
      </div>
  )

}

export default HeaderBar;