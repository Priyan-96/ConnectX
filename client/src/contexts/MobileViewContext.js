import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export const MobileViewContext = createContext();

export const useMobileView = () => {
    return useContext(MobileViewContext);
}

export const MobileViewProvider = ({ children }) => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            const newScreenWidth = window.innerWidth;
            setScreenWidth(newScreenWidth);
            setIsMobileView(newScreenWidth <= 640);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }

    }, [])


    const contextValue = {
        isMobileView,
    }

    return (
        <MobileViewContext.Provider value={contextValue}>
            {children}
        </MobileViewContext.Provider>
    )
}