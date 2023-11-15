import React from 'react';
import SharePost from './Share';
import Posts from './Posts';

export default function Home() {

  return (
    <div className='flex flex-col md:w-[74%] lg:w-[75%] h-auto'>
      {/* <Stories /> */}
      <SharePost />
      <Posts />
    </div>
  )
}
