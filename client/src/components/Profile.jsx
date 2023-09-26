import React, { useState } from 'react';
import Posts from "../components/Posts";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from '../contexts/DarkModeContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import { useLocation } from 'react-router';
import UpdateProfie from './UpdateProfie';
import userProfile from "../assets/user_profile.jpg";

export default function Profile() {
  const [openUpdate,setOpenUpdate] = useState(false);
  const { isDarkMode } = useDarkMode();
  const { currentUser } = useAuth();

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(['users'], async () => {
    return await makeRequest.get("/users?userId=" + userId).then(async (res) => {
      return await res.data;
    });
  });

  const { isLoading: rIsLoading, error: rError, data: rData } = useQuery(['relationships', userId], async () => {
    return await makeRequest.get("/relationships?followedid=" + userId).then(async (res) => {
      return res.data;
    });
  });

  var relationshipStatus;

  if (Array.isArray(rData)) {
    relationshipStatus = rData.includes(currentUser.uid);
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (relationshipStatus) => {
      if (relationshipStatus) return makeRequest.delete("/relationships?followedid=" + userId);
      return makeRequest.post("/relationships?followedid=" + userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('relationships');
      }
    }
  )

  const handleFollow = () => {
    if (relationshipStatus) mutation.mutate(true);
    else mutation.mutate(false);
  }

  return (
    <div className='w-[63%] relative z-0'>
      {isLoading ? "Loading!" : error ? "Something went wrong!" : <div className={`flex p-[15px] mb-[10px] ${isDarkMode ? 'dark' : 'bg-white'} rounded-md shadow-lg`}>
        <img className='w-[100px] h-[100px] flex-shrink-0 rounded-[50%] object-cover block' src={(data.profilepic) ? (data.profilepic) : (userProfile)} alt='' />
        <div className='flex flex-grow items-center ml-[20px] justify-between'>
          <div className='flex flex-col'>
            <span className='text-lg font-bold'>{data.username}</span>
            <span>{data.userbio}</span>
          </div>
          {rIsLoading ? "Loading!" : rError ? "Something went wrong!" : userId === currentUser.uid ? <button onClick={()=>setOpenUpdate(true)} className='px-[15px] py-[7px] bg-blue-light text-white mr-[60px]'>Update</button> : <button className='px-[15px] py-[7px] bg-blue-light text-white mr-[60px]' onClick={handleFollow}>{relationshipStatus ? "Following" : "Follow"}</button>}
        </div>
      </div>}
      <div className='mt-[10px]'>
        <Posts userId={userId}/>
      </div>
      {openUpdate && <UpdateProfie setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}
