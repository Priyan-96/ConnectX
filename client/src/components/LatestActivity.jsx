import React from 'react';

export default function LatestActivity({ activity }) {

  return (
    <div className='flex items-center mt-[5px] p-[5px] md:p-[8px] lg:p-2'>
      <img className='w-[35px] h-[35px] md:w-[40px] md:h-[40px] border-black border-[1px] rounded-[50%] mr-[10px]' src={activity.profilepic} alt='' />
      <span className='w-auto text-[14px] md:text-[13px] lg:text-sm font-medium mr-[7px]'>{activity.username}</span>
      <span className='w-auto text-[14px] md:text-[13px]'>{activity.aname}</span>
    </div>
  )
}
