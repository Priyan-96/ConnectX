import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
}

export const DarkModeProvider = ({children}) => {
    const [isDarkMode,setIsDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(()=>{
        localStorage.setItem("darkMode",isDarkMode)
    },[isDarkMode]);

    const contextValue = {
        isDarkMode,
        toggleMode,
    };

    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
}