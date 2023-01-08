import { createContext, useState } from "react";

const StateContext = createContext({});
export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  return (
    <StateContext.Provider
      value={{
        auth,
        setAuth,
        darkMode,
        setDarkMode,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
