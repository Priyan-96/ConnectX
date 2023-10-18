import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMobileView } from "../contexts/MobileViewContext";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isMobileView } = useMobileView();

  // const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // useEffect(() => {

  //   const handleResize = () => {
  //     const newScreenWidth = window.innerWidth;
  //     setScreenWidth(newScreenWidth);
  //     setIsMobileView(newScreenWidth <= 640);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   }

  // }, [])

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill all the details!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auths/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Signup Failed!")
      }

      const data = await response.json();
      console.log(data);

      navigate("/login");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-purple-light">
      {isMobileView ? (<div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col p-[65px] pb-[25px]">
          <h1 className="text-3xl font-bold">ConnectX.</h1>
          <input className="h-[40px] p-[12px] mb-[15px] outline-none border-b border-gray-light mt-[25px]" type="text" placeholder="Username" name="username" onChange={(e) => { setUserName(e.target.value) }} />
          <input className="h-[40px] p-[12px] mb-[15px] outline-none border-b border-gray-light" type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
          <button onClick={handleSignup} className="h-[35px] bg-[#a195e8] text-white font-medium">
            Register
          </button>
        </div>
        <div className="w-full flex items-center justify-center">
          <span className="sm:mb-2 mt-[1px] lg:mb-3">Already a User?</span>
          <Link to="/login">
            <button className="px-[10px] py-[3px] ml-[10px] sm:h-[30px] md:h-[35px] lg:h-[38px] flex items-center justify-center bg-white text-black font-medium">
              Login
            </button>
          </Link>
        </div>
      </div>) : (<div className="sm:w-[550px] sm:h-[300px] md:w-[650px] md:h-[350px] lg:w-[800px] lg:h-[450px] flex bg-white rounded-sm overflow-hidden">
        <div className="w-1/2 h-full flex flex-col sm:p-8 md:p-10 lg:p-12">
          <h1 className="sm:text-3xl md:text-4xl lg:text-4xl font-bold sm:mb-4 md:mb-5 lg:mb-10">Signup</h1>
          <input
            className="sm:h-[30px] md:h-[40px] lg:h-[50px] sm:text-md md:text-lg sm:p-2 md:p-3 sm:mb-5 mb-4 outline-none border-b border-gray-light"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <input
            className="sm:h-[30px] md:h-[40px] lg:h-[50px] sm:text-md sm:p-2 md:p-3 mb-4 outline-none border-b border-gray-light"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <input
            className="sm:h-[30px] md:h-[40px] lg:h-[50px] sm:text-md sm:p-2 md:p-3 sm:mb-5 md:mb-5 lg:mb-10 outline-none border-b border-gray-light"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
          <button onClick={handleSignup} className="w-1/2 sm:h-[30px] md:h-[35px] lg:h-[38px] bg-[#a195e8] text-white font-medium">
            Register
          </button>
        </div>
        <div className="w-1/2 h-full flex flex-col text-white p-10 pt-5 bg-[linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)),url('https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center bg-cover">
          <span className="sm:mt-[185px] md:mt-[230px] lg:mt-[310px] sm:mb-2  lg:mb-3">Already have an Account?</span>
          <Link to="/login">
            <button className="w-1/2 sm:h-[30px] md:h-[35px] lg:h-[38px] flex items-center justify-center bg-white text-black font-medium">
              Login
            </button>
          </Link>
        </div>
      </div>)}
    </div>
  );
}
