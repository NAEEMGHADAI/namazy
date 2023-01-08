import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth, darkMode } = useContent();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttributes] = useInput("user", ""); //useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      setAuth({ user, accessToken });

      // setUser("");
      resetUser();
      setPwd("");
      // setSuccess(true);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, [persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form
        onSubmit={handleSubmit}
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
          darkMode ? "text-white bg-gray-800" : ""
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
        <h2 className="text-lg font-medium mb-4">
          Sign in to continue to your account
        </h2>
        <label htmlFor="username" className="block text-sm font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          {...userAttributes}
          className="shadow appearance-none border text-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <label htmlFor="password" className="block text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          className="shadow appearance-none border text-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
        <div className="mb-6">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
            className="ml-2 leading-tight"
          />
          <label htmlFor="persist" className="block text-sm font-bold mb-2">
            Trust This Device
          </label>
        </div>
      </form>
      <p>
        Need an Account? <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
