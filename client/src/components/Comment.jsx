import React from 'react';
import moment from 'moment';

export default function Comment({comment}) {
  return (
    <div className='flex items-center'>
        <img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={comment.profilepic} alt='' />
        <div className='flex flex-col w-3/4 ml-[15px]'>
            <span>{comment.username}</span>
            <span>{comment.cdesc}</span>
        </div>
        <span className='text-sm'>{moment(comment.ccreateat).fromNow()}</span>
    </div>
  )
}
