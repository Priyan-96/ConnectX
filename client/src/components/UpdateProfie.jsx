import React, { useState } from 'react';
import Cloudinary from "../assets/cloudinary.png";
import { useDarkMode } from '../contexts/DarkModeContext';
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../axios";
import userProfile from "../assets/user_profile.jpg";
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfie({ setOpenUpdate, user }) {

  // {uid: 20, username: 'rohit', profilepic: '/uploads/1695358603954rohit_dp.jpeg', userbio: 'Stay Woke!'}

  const [file, setFile] = useState(null);
  const [username, setUserName] = useState(user.username);
  const [userbio, setUserBio] = useState(user.userbio);

  const { currentUser, updateProfile } = useAuth();

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/uploads", formData);
      return res.data;
    } catch (error) {
      alert(error);
    }
  }

  const { isDarkMode } = useDarkMode();

  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (user) => {
  //     return makeRequest.put("/users", user);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["users"]);
  //     }
  //   }
  // );

  const handleUpdate = async () => {
    var profileURL = (file) ? await upload(file) : user.profilepic;
    var imageURL = (profileURL === user.profilepic) ? (user.profilepic) : '/uploads/' + profileURL;

    const updatedUser = {
      username,
      userbio,
      profilepic: imageURL,
    }

    await updateProfile(updatedUser);
    // mutation.mutate({ username, userbio, profilepic: imageURL });
    setOpenUpdate(false);
  }

  return (
    <div className='bg-white z-10 py-[30px] px-[40px]'>
      <div className='flex w-full items-center justify-between mb-[40px]'>
        <span className='text-[22px] sm:text-3xl text-gray-light font-bold'>Update Your Profile</span>
        <button className='w-[30px] h-[30px] px-[10px] text-white bg-red-light font-bold' onClick={() => setOpenUpdate(false)}>X</button>
      </div>
      <div className='flex flex-col my-[20px]'>
        <span className='mb-[10px]'>Profile Picture</span>
        <div className='relative w-[150px] h-[150px] flex items-center justify-center'>
          <img className='w-full h-full object-cover' src={(file) ? URL.createObjectURL(file) : ((user.profilepic) ? (user.profilepic) : (userProfile))} alt='' />
          <img className='absolute' src={Cloudinary} alt='' />
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} className="w-full h-full absolute left-0 top-0 opacity-0" />
        </div>
      </div>
      <div className='flex flex-col mb-[40px]'>
        <span className='mb-[2px]'>Username</span>
        <input className='focus:outline-none border-b border-gray-light mb-[15px] h-[40px]' onChange={(e) => setUserName(e.target.value)} name='username' value={username} type='text' />
        <span className='mb-[2px]'>UserBio</span>
        <input className='focus:outline-none mb-[15px] border-b border-gray-light h-[40px]' onChange={(e) => setUserBio(e.target.value)} name='userbio' value={userbio} type='text' />
      </div>
      <button onClick={handleUpdate} className='w-full bg-blue-light text-white p-[10px]'>Update</button>
    </div>
  )
}
