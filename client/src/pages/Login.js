import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            await login({username,password});
            navigate("/");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center bg-purple-light">
            <div className="w-[800px] h-[450px] flex bg-white rounded-sm overflow-hidden">
                <div className="w-1/2 h-full flex flex-col text-white p-10 pt-5 bg-[linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)),url('https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center bg-cover">
                    <h1 className="text-[65px] font-bold mb-[78px]">ConnectX.</h1>
                    <span className="text-[15px] leading-1 mb-[140px]"></span>
                    <span className="mb-3">Don't you have an Account?</span>
                    <Link to="/signup"><button className="w-1/2 h-[38px] flex items-center justify-center bg-white text-black font-medium">Register</button></Link>
                </div>
                <div className="w-1/2 h-full flex flex-col p-12">
                    <h1 className="text-4xl font-bold mb-10">Login</h1>
                    <input className="h-[50px] text-lg p-3 mb-8 outline-none border-b border-gray-light" type="text" placeholder="Username" name="username" onChange={(e) => { setUserName(e.target.value) }} />
                    <input className="h-[50px] p-3 mb-12 outline-none border-b border-gray-light" type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={handleLogin} className="w-1/2 h-[38px] bg-[#a195e8] text-white font-medium">Login</button>
                </div>
            </div>
        </div>
    )
}