import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import Suggestion from './Suggestions';
import LatestActivities from './LatestActivities';

export default function Rightbar() {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`opacity-0 w-0 md:opacity-100 md:w-[34%] lg:w-[29%] xl:w-[27%] mr-[20px] fixed top-[80px] md:right-[0%] lg:right-[2%] xl:right-[3%] bottom-0 overflow-y-scroll scrollbar`}>
      <div className={`flex flex-col md:p-[2px] lg:p-1 xl:p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span className='md:px-[20px] md:pt-[15px] xl:p-[0px]'>Suggestions For You</span>
        <Suggestion />
      </div>
      <div className={`flex flex-col md:p-3  lg:p-2 xl:p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
        <span className='md:px-[10px] md:pt-[5px] xl:p-[0px]'>Latest Activities</span>
        <LatestActivities />
      </div>
      <div className='opacity-0 h-[50px]'></div>
    </div>
  )
}
