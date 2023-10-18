import React from 'react';

export default function LatestActivity({ activity }) {

  return (
    <div className='flex items-center mt-[5px] p-2'>
      <img className='w-[40px] border-black border-[1px] h-[40px] rounded-[50%] mr-[10px]' src={activity.profilepic} alt='' />
      <span className='w-auto text-sm font-medium mr-[7px]'>{activity.username}</span>
      <span className='w-auto'>{activity.aname}</span>
    </div>
  )
}
