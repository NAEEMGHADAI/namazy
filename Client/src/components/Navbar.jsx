import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo2 from "../data/logo-2.PNG";
import useContent from "../hooks/useContent";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const {
    auth,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    // pageName
  } = useContent();

  const navigate = useNavigate();
  const logout = useLogout();
  const signout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);
  useEffect(() => {
    console.log(screenSize);
    if (screenSize <= 1000) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);
  return !activeMenu ? (
    <div className="flex justify-between text-white pt-4 pb-4 sm:pt-10 pl-5 pr-5 sm:pb-5 md:ml-6 md:mr-6 relative">
      <img src={logo2} alt="" width="50" height="50" />

      {auth?.user ? (
        <>
          <>
            <button
              className="bg-blue-600 text-white rounded-xl hover:bg-blue-800 w-full mr-8 ml-8 md:w-36 md:pt-3 md:pb-3 relative"
              onClick={signout}
            >
              Log Out
            </button>
          </>
        </>
      ) : (
        <button
          className="bg-blue-600 text-white rounded-xl hover:bg-blue-800 w-full mr-8 ml-8 md:w-36 md:pt-3 md:pb-3 relative"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

      <button
        onClick={() =>
          setActiveMenu((prev) => {
            console.log(prev);
            return !prev;
          })
        }
      >
        <span className="absolute inline-flex rounded-full h-5 w-5 right-2" />
        <AiOutlineMenu size={35} />
      </button>
    </div>
  ) : (
    screenSize >= 1000 && (
      <>
        <div className="flex justify-between text-white pt-4 pb-4 sm:pt-10 pl-5 pr-5 sm:pb-5 md:ml-6 md:mr-6 relative">
          <h1 className="text-2xl capitalize">Dashboard</h1>
          {console.log(auth)}
          {auth?.user ? (
            <>
              <button
                className="bg-blue-600 text-white rounded-xl hover:bg-blue-800 w-full mr-8 ml-8 md:w-36 md:pt-3 md:pb-3 relative"
                onClick={signout}
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white rounded-xl hover:bg-blue-800 w-full mr-8 ml-8 md:w-36 md:pt-3 md:pb-3 relative"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </>
    )
  );
};

export default Navbar;
