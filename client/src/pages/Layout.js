import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import "../styles/App.css";
import "../index.css"
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Rightbar from "../components/Rightbar";

export default function Layout() {

  const navigate = useNavigate();
  const isCookie = JSON.parse(localStorage.getItem('users'));
  console.log("Iscookie : ", isCookie)
  if ( !isCookie ) {
    navigate("/login")
  }

  const { isDarkMode } = useDarkMode();

  return (
      <div className={`w-full h-full flex`}>
        <Navbar />
        <div className={`w-full h-full overflow-y-scroll overflow-x-hidden scrollbar ${isDarkMode ? 'light_dark' : ' bg-gray-lightest'}`}>
          {/* <div className={`w-[18%] fixed overflow-y-scroll left-0 top-[60px] bottom-0 scrollbar bg-white ${isDarkMode ? 'dark' : ''}`}>
            <Leftbar />
          </div> */}
          <div className={`w-[100%] md:w-[85%] h-full top-[60px] overflow-y-scroll flex lg:left-[2%] xl:left-[3%] scrollbar p-5 relative ${isDarkMode ? 'light_dark' : ' bg-gray-lightest'}`}>
            <Outlet />
            <Rightbar />
          </div>
        </div>
      </div>
  )
}
