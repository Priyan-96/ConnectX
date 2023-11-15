import React, { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../axios';
import SearchUser from "../components/SearchUser";
import LogoutIcon from '@mui/icons-material/Logout';
import { useMobileView } from "../contexts/MobileViewContext";

export default function Navbar() {

  const { isDarkMode, toggleMode } = useDarkMode();
  const { currentUser } = useAuth();

  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  }

  const navigate = useNavigate();

  const { isMobileView } = useMobileView();

  const handleMobileSearch = () => {
    setIsMobileSearch(!isMobileSearch);
    setIsMenu(!isMenu);
  }

  const handleMobileClose = () => {
    setIsMobileSearch(!isMobileSearch); 
  }

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
    localStorage.removeItem('users');
    navigate("/login");
  }

  return (
    <div className={`w-full h-[60px] border-b fixed top-0 border-gray-light flex justify-between z-[100] ${isDarkMode ? 'dark' : 'bg-white'}`}>
      {isMobileView ? (<div className='w-full flex items-center justify-between'>
        <div className='w-auto flex items-center'>
          <span className='ml-[20px] text-lg font-bold'>ConnectX</span>
          {/* <div className='flex flex-col relative ml-[30px] w-[300px]'>
            <div className='w-full flex border border-gray-light p-1'>
              <SearchOutlinedIcon />
              <input onClick={handleSearch} name="searchQuery" value={searchQuery} onChange={handleUserSearch} className={`w-full ml-2 outline-none flex-grow ${isDarkMode ? 'dark' : ''}`} type='text' placeholder='Search' />
              {(isSearch && searchQuery.length) ? <CloseIcon onClick={handleSearch} /> : <></>}
            </div>
            {(isSearch && searchQuery.length) ? (sData ? (<div className='w-full absolute top-[35px] dark px-[10px] border-[1px] border-white'>
              {sData.map(data => (
                <SearchUser data={data} closeSearch={handleSearch} />
              ))}
            </div>) : <></>) : <></>}
          </div> */}
        </div>
        {isMobileSearch ? (<div className='flex flex-col relative'>
          <div className='w-[200px] mr-[30px] flex border border-gray-light p-1'>
            <SearchOutlinedIcon />
            <input onClick={handleSearch} name="searchQuery" value={searchQuery} onChange={handleUserSearch} className={`w-full ml-2 outline-none flex-grow ${isDarkMode ? 'dark' : ''}`} type='text' placeholder='Search' />
            <CloseIcon onClick={handleMobileClose} />
          </div>
          {(isSearch && searchQuery.length) ? (sData ? (<div className='absolute top-[35px] dark w-full px-[10px] border-[1px] border-white'>
            {sData.map(data => (
              <SearchUser data={data} closeSearch={handleSearch} />
            ))}
          </div>) : <></>) : <></>}
        </div>) : (<div onClick={handleMenu} className='px-[20px]'>
          <MenuIcon />
        </div>)}
        {isMenu ? (<div className={`absolute w-auto h-auto right-[1px] top-[60px] flex flex-col border border-gray-light ${isDarkMode ? 'dark' : 'bg-white'}`}>
          <Link to="/">
            <div className='flex items-center p-[4px] pr-[30px] pl-[15px]'>
              <div className='mr-[5px]'>
                <HomeOutlinedIcon />
              </div>
              <span className='p-[4px]'>Home</span>
            </div>
          </Link>
          <Link to={`/profile/${currentUser.uid}`}>
            <div className='flex items-center justify-center p-[4px] pr-[30px] pl-[15px]'>
              <div className='mr-[5px]'>
                <PersonOutlineOutlinedIcon />
              </div>
              <span className='p-[4px]'>Profile</span>
            </div>
          </Link>
          <div onClick={toggleMode} className='flex cursor-pointer items-center justify-center p-[4px] pr-[30px] pl-[15px]'>
            <div className='mr-[5px]'>
              {(isDarkMode) ? (<LightModeIcon />) : (<DarkModeOutlinedIcon />)}
            </div>
            <span className='p-[4px]'>Theme</span>
          </div>
          <div onClick={handleMobileSearch} className='flex items-center cursor-pointer justify-center p-[4px] pr-[30px] pl-[15px]'>
            <div className='mr-[5px]'>
              <SearchOutlinedIcon />
            </div>
            <span className='p-[4px]'>Search</span>
          </div>
          <div onClick={handleLogout} className='flex items-center justify-center p-[4px] pr-[30px] pl-[15px]'>
            <div className='flex items-center justify-center cursor-pointer'>
              <div className='mr-[5px]'>
                <LogoutIcon />
              </div>
              <span className='p-[4px]'>Logout</span>
            </div>
          </div>
        </div>) : <></>}
      </div>) :
        (<>
          <div className='opacity-0 w-[0px] sm:opacity-100 sm:w-[440px] md:w-[500px] lg:w-[700px] h-full pl-4 flex items-center justify-between'>
            <Link to="/"><span className='font-bold lg:text-lg'>ConnectX</span></Link>
            <Link to="/"><HomeOutlinedIcon /></Link>
            <div onClick={toggleMode}>
              {(isDarkMode) ? (<LightModeIcon />) : (<DarkModeOutlinedIcon />)}
            </div>
            <GridViewOutlinedIcon />
            <div className='flex flex-col relative'>
              <div className='sm:w-[200px] md:w-[260px] lg:w-[450px] flex border border-gray-light p-1'>
                <SearchOutlinedIcon />
                <input onClick={handleSearch} name="searchQuery" value={searchQuery} onChange={handleUserSearch} className={`w-full ml-2 outline-none flex-grow ${isDarkMode ? 'dark' : ''}`} type='text' placeholder='Search' />
                {(isSearch && searchQuery.length) ? <CloseIcon onClick={handleSearch} /> : <></>}
              </div>
              {(isSearch && searchQuery.length) ? (sData ? (<div className='absolute top-[35px] dark w-full px-[10px] border-[1px] border-white'>
                {sData.map(data => (
                  <SearchUser data={data} closeSearch={handleSearch} />
                ))}
              </div>) : <></>) : <></>}
            </div>
          </div>
          <div className='opacity-0 w-[0px] sm:opacity-100 sm:w-[180px] md:w-[200px] lg:w-auto h-full flex items-center justify-between pr-[20px]'>
            <Link to={`/profile/${currentUser.uid}`}>
              <PersonOutlineOutlinedIcon />
            </Link>
            <div className='cursor-pointer sm:mx-[25px] md:mx-[30px]' onClick={handleLogout}>
              <LogoutIcon />
            </div>
            <div className='w-auto flex items-center justify-center'>
              <img className='w-[30px] h-[30px] border-black border-[1px] rounded-[15px] object-cover' src={currentUser.profilepic} alt='userProfilePhoto' />
              <span className='ml-[10px]'>{currentUser.username}</span>
            </div>
          </div>
        </>)}
    </div>
  )
}
