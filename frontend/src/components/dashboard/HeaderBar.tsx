import React from "react"
import {notificationIcon} from '../../assets/icons';

const HeaderBar=()=> {
  const userImageUrl="@/../public/userPhoto.jpg"
  
  return (
    <div className="header  gap-x-2 flex justify-between w-full items-center px-10  border-2" >
        <h1 className="title text-gray-500 text-sm">Task Management</h1>
        <input className="search text-sm" type="text" placeholder="Search tasks" />
        <img src={notificationIcon} alt="notification" />
        <img className="userImage w-10 h-10 border-2 rounded-full " src={userImageUrl} alt="user" />
        <h4 className="userName text-sm">Minzo le Grand</h4>
      </div>
  )

}

export default HeaderBar;