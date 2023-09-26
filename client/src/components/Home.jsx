import React from 'react';
import Stories from './Stories';
import SharePost from './Share';
import Posts from './Posts';

export default function Home() {

  return (
    <div className='w-[63%] h-full'>
      {/* <Stories /> */}
      <SharePost />
      <Posts />
    </div>
  )
}
