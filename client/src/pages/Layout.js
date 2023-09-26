import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import "../styles/App.css";
import "../index.css"
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Leftbar from '../components/Leftbar';
import Rightbar from "../components/Rightbar";

export default function Layout() {

  const { isDarkMode } = useDarkMode();


  const queryClient = new QueryClient()

  return (
    // <QueryClientProvider client={queryClient}>
      <div className={`w-full h-full flex`}>
        <Navbar />
        <div className={`w-full h-full overflow-y-scroll overflow-x-hidden scrollbar`}>
          <div className={`w-[18%] fixed overflow-y-scroll left-0 top-[60px] bottom-0 scrollbar bg-white ${isDarkMode ? 'dark' : ''}`}>
            <Leftbar />
          </div>
          <div className={`w-[85%] h-full top-[60px] overflow-y-scroll flex left-[18%] p-5 relative ${isDarkMode ? 'light_dark' : ' bg-gray-lightest'}`}>
            <Outlet />
            <Rightbar />
          </div>
        </div>
      </div>
    // </QueryClientProvider>

  )
}
