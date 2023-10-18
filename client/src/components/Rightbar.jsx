import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import UserProfile from "../assets/user_profile.jpg";
import Suggestion from './Suggestions';
import LatestActivities from './LatestActivities';

export default function Rightbar() {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`w-[27%] mr-[20px] fixed top-[80px] right-[5%] bottom-0 overflow-y-scroll scrollbar`}>
      <div className={`flex flex-col p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span>Suggestions For You</span>
        <Suggestion />
      </div>
      <div className={`flex flex-col p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span>Latest Activities</span>
        <LatestActivities />
      </div>
      <div className='opacity-0 h-[50px]'></div>
    </div>
  )
}
