import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';
import Friends from "../assets/friends.png";
import Groups from "../assets/groups.png";
import Marketplace from "../assets/marketplace.png";
import Watch from "../assets/watch.png";
import Memories from "../assets/memories.png";
import Events from "../assets/events.png";
import Gaming from "../assets/gaming.png";
import Gallery from "../assets/gallery.png";
import Videos from "../assets/videos.png";
import Messages from "../assets/messages.png";
import Fundraiser from "../assets/fundraiser.png";
import Tutorials from "../assets/tutorials.png";
import Courses from "../assets/courses.png";
import userProfile from "../assets/user_profile.jpg";
import { useQuery } from 'react-query';
import { makeRequest } from '../axios';

export default function Leftbar({post}) {

  const { isDarkMode } = useDarkMode();
  const { currentUser } = useAuth();

  return (
    <div className={`mt-[10px] top-[60px] px-2 ${isDarkMode ? 'dark' : ''}`}>
      <div className='flex flex-col py-2 border-b border-gray-light'>
        <Link to={`/profile/${currentUser.uid}`}>
          <div className='flex items-center p-2'>
            <img className='w-[25px] h-[25px] border-black border-[1px] object-cover rounded-[13px]' src={currentUser.profilepic} alt='userProfilePhoto' />
            <span className='ml-2 text-sm'>{currentUser.username}</span>
          </div>
        </Link>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Friends} alt='friendsPhoto' />
          <span className='ml-2 text-sm'>Friends</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Groups} alt='groupPhoto' />
          <span className='ml-2 text-sm'>Groups</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Marketplace} alt='marketPlacePhoto' />
          <span className='ml-2 text-sm'>Marketplace</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Watch} alt='watchPhoto' />
          <span className='ml-2 text-sm'>Watch</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Memories} alt='memoriesPhoto' />
          <span className='ml-2 text-sm'>Memories</span>
        </div>
      </div>
      <div className='flex flex-col py-2 border-b border-gray-light'>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Events} alt='eventsPhoto' />
          <span className='ml-2 text-sm'>Events</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Gaming} alt='gamingPhoto' />
          <span className='ml-2 text-sm'>Gaming</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Gallery} alt='galleryPhoto' />
          <span className='ml-2 text-sm'>Gallery</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Videos} alt='videosPhoto' />
          <span className='ml-2 text-sm'>Videos</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Messages} alt='messagesPhoto' />
          <span className='ml-2 text-sm'>Messages</span>
        </div>
      </div>
      <div className='flex flex-col py-2'>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Fundraiser} alt='fundraiserPhoto' />
          <span className='ml-2 text-sm'>Fundraiser</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Tutorials} alt='tutorialsPhoto' />
          <span className='ml-2 text-sm'>Tutorials</span>
        </div>
        <div className='flex items-center p-2'>
          <img className='w-[25px] h-[25px]' src={Courses} alt='coursesPhoto' />
          <span className='ml-2 text-sm'>Courses</span>
        </div>
      </div>
    </div>
  )
}
