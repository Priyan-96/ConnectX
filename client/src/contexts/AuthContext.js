import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('users')) || null);

    const login = async ({ username, password }) => {
        try {
            const url = 'http://localhost:5000/api/auths/login';

            const res = await axios.post(
                url,
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            // const data = await res.json();
            const data = res.data;
            setCurrentUser(data);
        } catch (error) {
            alert(error);
        }
    }

    const updateProfile = async (updatedUser) => {
        try {
            const updatedUserData = await makeRequest.put("/users", updatedUser);

            console.log(updatedUserData.data);
            setCurrentUser(updatedUserData.data);
        }
        catch (error) {
            alert(error);
        }
    }
    
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(currentUser));
    }, [currentUser]);

    const contextValues = {
        currentUser,
        login,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}