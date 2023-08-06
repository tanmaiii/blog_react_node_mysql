import { createContext, useContext, useEffect, useState } from "react";

export const ModeContext = createContext();

export function useMode() {
  return useContext(ModeContext);
}

export const ModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const [openSidebar, setOpenSidebar] = useState(
    JSON.parse(localStorage.getItem("openSidbar")) || false
  );

  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);

  const toggleSidebarMobile = () => {
    console.log(openSidebarMobile);
    setOpenSidebarMobile(!openSidebarMobile);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("openSidbar", openSidebar);
  }, [darkMode, openSidebar, openSidebarMobile]);

  return (
    <ModeContext.Provider
      value={{ darkMode, toggle, openSidebar, toggleSidebar, openSidebarMobile, toggleSidebarMobile }}
    >
      {children}
    </ModeContext.Provider>
  );
};
