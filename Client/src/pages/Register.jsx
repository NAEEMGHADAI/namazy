import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useContent from "../hooks/useContent";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGITSER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { darkMode } = useContent();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const match = pwd === matchPwd;
    console.log(v1, v2);
    if (!v1 || !v2 || !match) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGITSER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="flex flex-col flex-wrap content-center justify-center w-full">
          <div
            className={`bg-secondary-dark-bg h-fit grid place-content-center xl:w-1/4 lg:w-1/2 md:w-4/6 w-11/12 mt-12 rounded-2xl pr-4 pl-4 pt-6 pb-6 ${
              darkMode ? "text-white" : ""
            }  `}
          >
            <div className="flex flex-row">
              <h1 className=" text-2xl mt-2 mr-2">Success!</h1>
              <img
                src="https://img.icons8.com/color/48/null/ok--v1.png"
                alt="success icon"
              />
            </div>

            <p className=" text-2xl mt-2 ml-4 text-slate-400">
              <Link to="/login">Sign In</Link>
            </p>
          </div>
        </section>
      ) : (
        <section className="flex flex-col flex-wrap content-center justify-center w-full">
          <form
            onSubmit={handleSubmit}
            className={`bg-secondary-dark-bg h-fit xl:w-1/4 lg:w-1/2 md:w-4/6 w-11/12 mt-12 rounded-2xl pr-4 pl-4 pt-6 pb-6 ${
              darkMode ? "text-white" : ""
            }  `}
          >
            <p
              ref={errRef}
              className={
                errMsg
                  ? "bg-pink-400 text-red-600 rounded-lg p-2 mb-2 font-bold"
                  : "absolute -left-full"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="mx-5">
              <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold mb-2"
                >
                  Username:
                  <span
                    className={validName ? "text-green-600 ml-1" : "hidden"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validName || !user ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters. <br /> Must begin with a letter. <br />{" "}
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold mb-2"
                >
                  Password:
                  <span className={validPwd ? "text-green-600 ml-1" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validPwd || !pwd ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters. <br /> Must include uppercase and
                  lowercase letters, a number and a special characters:{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="percent">%</span>
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm_pwd"
                  className="block text-sm font-bold mb-2"
                >
                  Confirm Password:
                  <span
                    className={
                      validMatch && matchPwd ? "text-green-600 ml-1" : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validMatch || !matchPwd ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validPwd
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "absolute -left-full"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must Match the first password input field.
                </p>
              </div>
              <div className="text-center mb-6">
                <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                  className={`${
                    !validName || !validPwd || !validMatch
                      ? "bg-blue-300"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 w-52 rounded focus:outline-none focus:shadow-outline`}
                >
                  Sign Up
                </button>
              </div>
              <p>
                Already registered?
                <span className="line ml-2 text-slate-400">
                  <Link to="/login">Sign In</Link>
                </span>
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
