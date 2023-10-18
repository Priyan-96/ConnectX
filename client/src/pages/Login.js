import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMobileView } from "../contexts/MobileViewContext";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { isMobileView } = useMobileView();

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({ username, password });
            navigate("/");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={`w-full h-full flex items-center justify-center bg-purple-light`}>
            {isMobileView ? (<div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col p-[65px] pb-[25px]">
                    <h1 className="text-3xl font-bold">ConnectX.</h1>
                    <input className="h-[40px] p-[12px] mb-[15px] outline-none border-b border-gray-light mt-[25px]" type="text" placeholder="Username" name="username" onChange={(e) => { setUserName(e.target.value) }} />
                    <input className="h-[40px] p-[12px] mb-[15px] outline-none border-b border-gray-light" type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={handleLogin} className="w-full h-[40px] bg-[#a195e8] text-white font-medium">Login</button>
                </div>
                <div className="w-full flex items-center justify-center">
                    <span className="sm:mb-2 mt-[1px] lg:mb-3">New User?</span>
                    <Link to="/signup"><button className="px-[11px] ml-[15px] py-[2px] bg-white text-black font-medium">Register</button></Link>
                </div>
            </div>) : (<div className="sm:w-[550px] sm:h-[300px] md:w-[650px] md:h-[350px] lg:w-[800px] lg:h-[450px] flex bg-white rounded-sm overflow-hidden">
                <div className="w-1/2 h-full flex flex-col text-white sm:p-8 sm:pt-5 md:p-10 md:pt-5 lg:pt-5 bg-[linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)),url('https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center bg-cover">
                    <h1 className="sm:text-[35px] md:text-[50px] lg:text-[65px] font-bold sm:mb-[50px] md:mb-[70px] lg:mb-[78px]">ConnectX.</h1>
                    <span className="lg:text-[15px] leading-1 sm:mb-[80px] md:mb-[85px] lg:mb-[120px] lg:mb-[140px]"></span>
                    <span className="sm:mb-2  lg:mb-3">Don't you have an Account?</span>
                    <Link to="/signup"><button className="w-1/2 sm:h-[30px] md:h-[35px] lg:h-[38px] flex items-center justify-center bg-white text-black font-medium">Register</button></Link>
                </div>
                <div className="w-1/2 h-full flex flex-col sm:p-8 md:p-10 lg:p-12">
                    <h1 className="sm:text-3xl md:text-4xl lg:text-4xl font-bold sm:mb-6 md:mb-8 lg:mb-10">Login</h1>
                    <input className="sm:h-[35px] md:h-[40px] lg:h-[50px] sm:text-md md:text-lg sm:p-2 md:p-3 sm:mb-5 md:mb-8 outline-none border-b border-gray-light" type="text" placeholder="Username" name="username" onChange={(e) => { setUserName(e.target.value) }} />
                    <input className="sm:h-[35px] md:h-[40px] lg:h-[50px] sm:text-md sm:p-2 md:p-3 sm:mb-10 md:mb-12 outline-none border-b border-gray-light" type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={handleLogin} className="w-1/2 sm:h-[30px] md:h-[38px] bg-[#a195e8] text-white font-medium">Login</button>
                </div>
            </div>)}
        </div>
    )
}