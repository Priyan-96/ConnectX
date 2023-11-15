import React from 'react';
import Post from "../components/Post";
import { useDarkMode } from '../contexts/DarkModeContext';
import Suggestion from './Suggestions';
import LatestActivities from './LatestActivities';
import { useQuery } from 'react-query';
import { makeRequest } from '../axios.js';
import { useMobileView } from "../contexts/MobileViewContext";

export default function Posts({ userId }) {

  
  const { isDarkMode } = useDarkMode();
  const { isMobileView } = useMobileView();

  const { isLoading, error, data } = useQuery(['posts'], () => {
    return makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    });
  })

  return (
    <div className='w-full h-full flex flex-col'>
      {error ? "Something went wrong!" : (
        isLoading ? (<div>Loading Posts!</div>) :
          (data.map(post => (
            <Post post={post} key={post.pid} />
          )))
      )}
      <div className='opacity-100 md:opacity-0 md:w-0 md:h-0'>
        <div className={`flex flex-col md:p-[2px] lg:p-1 xl:p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
          <span className='mt-[20px] px-[20px]'>Suggestions For You</span>
          <Suggestion />
        </div>
        <div className={`flex flex-col p-4 md:p-3  lg:p-2 xl:p-5 bg-white shadow-md mb-3 ${isDarkMode ? 'dark' : ''}`}>
          <span className='py-[5px]'>Latest Activities</span>
          <LatestActivities />
        </div>
      </div>
      <div className='mb-[10px] opacity-0'>PostBottom</div>
    </div>
  )
}
