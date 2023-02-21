import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const StateContext = createContext({});
export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [bookmark, setBookmark] = useLocalStorage("bookmark", []);
  const [changed, setChanged] = useState("");
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
        bookmark,
        setBookmark,
        changed,
        setChanged,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
