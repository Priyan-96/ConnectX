import React, { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import userProfile from "../assets/user_profile.jpg";
import { useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import SearchUser from "../components/SearchUser";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {

  const { isDarkMode, toggleMode } = useDarkMode();
  const { currentUser } = useAuth();

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearch(!isSearch);
    setSearchQuery("");
  }

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading: sIsLoading, error: sError, data: sData } = useQuery(['searchUsers', searchQuery], async () => {
    return await makeRequest.get(`/searches?searchQuery=` + searchQuery).then(async (res) => {
      return await res.data;
    });
  });

  const queryClient = useQueryClient();

  const handleUserSearch = (event) => {
    setSearchQuery(event.target.value);
    queryClient.invalidateQueries('searchUsers');
  }

  const handleLogout = () => {
    const res = makeRequest.post("/auths/logout").then((res) => {
      return res.data;
    })

    navigate("/login");
  }

  return (
    <div className={`w-full h-[60px] border-b fixed top-0 border-gray-light flex justify-between z-[100] ${isDarkMode ? 'dark' : 'bg-white'}`}>
      <div className='w-[700px] h-full pl-4 flex items-center justify-between'>
        <Link to="/"><span className='font-bold text-lg'>ConnectX</span></Link>
        <Link to="/"><HomeOutlinedIcon /></Link>
        <div onClick={toggleMode}>
          {(isDarkMode) ? (<LightModeIcon />) : (<DarkModeOutlinedIcon />)}
        </div>
        <GridViewOutlinedIcon />
        <div className='flex flex-col relative'>
          <div className='w-[450px] flex border border-gray-light p-1'>
            <SearchOutlinedIcon />
            <input onClick={handleSearch} name="searchQuery" value={searchQuery} onChange={handleUserSearch} className={`ml-2 outline-none flex-grow ${isDarkMode ? 'dark' : ''}`} type='text' placeholder='Search' />
            {(isSearch && searchQuery.length) ? <CloseIcon onClick={handleSearch} /> : <></>}
          </div>
          {(isSearch && searchQuery.length) ? (sData ? (<div className='absolute top-[35px] dark w-full px-[10px] border-[1px] border-white'>
            {sData.map(data => (
              <SearchUser data={data} closeSearch={handleSearch} />
            ))}
          </div>) : <></>) : <></>}
        </div>
      </div>
      <div className='w-auto h-full flex items-center justify-between pr-[20px]'>
        <Link to={`/profile/${currentUser.uid}`}>
          <PersonOutlineOutlinedIcon />
        </Link>
        <div className='cursor-pointer mx-[30px]' onClick={handleLogout}>
          <LogoutIcon />
        </div>
        <div className='w-auto flex items-center justify-center'>
          <img className='w-[30px] h-[30px] border-black border-[1px] rounded-[15px] object-cover' src={currentUser.profilepic} alt='userProfilePhoto' />
          <span className='ml-[10px]'>{currentUser.username}</span>
        </div>
      </div>
    </div>
  )
}
