import React, { useState } from 'react'
import StoryData from "../datas/StoriesData";
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'react-query'
import { makeRequest } from '../axios'
import Story from './Story';

export default function Stories() {

  const [isViewStory, setIsViewStory] = useState(false);

  const { currentUser } = useAuth();

  const { isLoading, error, data } = useQuery(['users'], async () => {
    return await makeRequest.get("/users?userId=" + currentUser.uid).then(async (res) => {
      return await res.data;
    });
  });

  return (
    <div className='w-full h-[32%] mb-[20px] flex cursor-pointer relative gap-[15px]'>
      <div className='flex-1 overflow-hidden rounded-md relative'>
        <img className='h-full object-cover' src={(data) ? (data.profilepic) : (currentUser.profilepic)} alt='' />
        <span className='absolute left-[10px] bottom-[10px] text-white font-medium'>{(data) ? (data.username) : (currentUser.username)}</span>
        <button className='absolute w-[25px] h-[25px] left-[10px] bottom-[33px] bg-blue-light rounded-[50%] text-white border-none flex items-center justify-center text-[15px] cursor-pointer'>+</button>
      </div>
      {StoryData.map(story => (
        <Story story={story} setIsViewStory={setIsViewStory} isViewStory={isViewStory}/>
      ))}
    </div>
  )
}
