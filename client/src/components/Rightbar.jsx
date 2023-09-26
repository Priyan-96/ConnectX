import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import "../styles/App.css"
import UserProfile from "../assets/user_profile.jpg";
import Suggestion from './Suggestions';
import LatestActivities from './LatestActivities';

export default function Rightbar() {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`w-[27%] mr-[20px] fixed top-[80px] right-0 bottom-0 overflow-y-scroll scrollbar`}>
      <div className={`flex flex-col p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span>Suggestions For You</span>
        <Suggestion />
      </div>
      <div className={`flex flex-col p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span>Latest Activities</span>
        <LatestActivities />
      </div>
      {/* <div className={`flex flex-col p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span>Online Activities</span>
        <div className='flex items-center mt-[5px] p-2 relative'>
          <img className='w-[40px] h-[40px] rounded-[50%] mr-[10px]' src={UserProfile} alt='' />
          <div className='w-[10px] h-[10px] absolute bg-red-light rounded-[50%] top-3 left-9'></div>
          <span className='w-auto text-sm font-medium mr-[7px]'>Henry Williams</span>
        </div>
        <div className='flex items-center mt-[5px] p-2 relative'>
          <img className='w-[40px] h-[40px] rounded-[50%] mr-[10px]' src={UserProfile} alt='' />
          <div className='w-[10px] h-[10px] absolute bg-green-light rounded-[50%] top-3 left-9'></div>
          <span className='w-auto text-sm font-medium mr-[7px]'>Henry Williams</span>
        </div>
        <div className='flex items-center mt-[5px] p-2 relative'>
          <img className='w-[40px] h-[40px] rounded-[50%] mr-[10px]' src={UserProfile} alt='' />
          <div className='w-[10px] h-[10px] absolute bg-red-light rounded-[50%] top-3 left-9'></div>
          <span className='w-auto text-sm font-medium mr-[7px]'>Henry Williams</span>
        </div>
      </div> */}
      <div className='opacity-0 h-[50px]'></div>
    </div>
  )
}
