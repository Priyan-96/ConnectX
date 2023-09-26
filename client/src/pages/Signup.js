import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <div className="w-[800px] h-[450px] flex bg-white rounded-sm overflow-hidden">
        <div className="w-1/2 h-full flex flex-col p-12">
          <h1 className="text-4xl font-bold mb-10">Signup</h1>
          <input
            className="h-[50px] text-lg p-3 mb-5 outline-none border-b border-gray-light"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <input
            className="h-[50px] p-3 mb-5 outline-none border-b border-gray-light"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <input
            className="h-[50px] p-3 mb-10 outline-none border-b border-gray-light"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
          <button onClick={handleSignup} className="w-1/2 h-[38px] bg-[#a195e8] text-white font-medium">
            Register
          </button>
        </div>
        <div className="w-1/2 h-full flex flex-col text-white p-10 pt-5 bg-[linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)),url('https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-center bg-cover">
          <span className="mt-[310px] mb-3">Already have an Account?</span>
          <Link to="/login">
            <button className="w-1/2 h-[38px] flex items-center justify-center bg-white text-black font-medium">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
