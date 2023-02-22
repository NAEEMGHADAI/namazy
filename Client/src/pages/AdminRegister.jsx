import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useContent from "../hooks/useContent";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
const NUMBER_REGEX = /^[0-9]{10}$/;
const ADDRESS_REGEX = /^[a-zA-Z0-9.,#\-/\s]+$/;
const REGITSER_URL = "/manageuser/adminregister";

const AdminRegister = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { darkMode } = useContent();
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [numberFocus, setNumberFocus] = useState(false);

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

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
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = NUMBER_REGEX.test(number);
    console.log(result);
    console.log(number);
    setValidNumber(result);
  }, [number]);

  useEffect(() => {
    const result = ADDRESS_REGEX.test(address);
    console.log(result);
    console.log(address);
    setValidAddress(result);
  }, [address]);

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
  }, [user, pwd, matchPwd, email, number, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = NUMBER_REGEX.test(number);
    const v5 = ADDRESS_REGEX.test(address);
    const match = pwd === matchPwd;
    console.log(v1, v2);
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !match) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        REGITSER_URL,
        JSON.stringify({ user, pwd, email, phonenumber: number, address })
      );
      console.log(response);
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
        <section className="flex flex-col flex-wrap content-center justify-center w-full h-screen">
          <div className="bg-gray-800 rounded-md p-4 text-green-500">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">New User Created!</span>
            </div>

            <div className="flex justify-center">
              <Link
                to="/adminregister"
                className="mt-4 text-gray-400 hover:text-gray-300 text-sm underline"
              >
                Back to Registration
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-col flex-wrap content-center justify-center w-full">
          <form
            onSubmit={handleSubmit}
            className={`bg-secondary-dark-bg h-fit xl:w-1/2 lg:w-9/12 md:w-5/6 w-11/12 rounded-2xl pr-4 pl-4 pt-6 pb-6 ${
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
              <h1 className="text-3xl font-bold mb-4 text-center">
                Add New User
              </h1>
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
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  Email:
                  <span
                    className={validEmail ? "text-green-600 ml-1" : "hidden"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validEmail || !email ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {/*write message for invalid email */}
                  Please enter a valid email address.
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="tel" className="block text-sm font-bold mb-2">
                  Phone Number:
                  <span
                    className={validNumber ? "text-green-600 ml-1" : "hidden"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validNumber || !number ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="tel"
                  id="tel"
                  onChange={(e) => setNumber(e.target.value)}
                  autoComplete="off"
                  required
                  aria-invalid={validNumber ? "false" : "true"}
                  aria-describedby="telnote"
                  onFocus={() => setNumberFocus(true)}
                  onBlur={() => setNumberFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="telnote"
                  className={
                    numberFocus && number && !validNumber
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {/*write message for invalid number */}
                  Please enter a valid phone number.
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-bold mb-2"
                >
                  Address:
                  <span
                    className={validAddress ? "text-green-600 ml-1" : "hidden"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validAddress || !address ? "hidden" : "text-red-600 ml-1"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <textarea
                  type="text"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="off"
                  required
                  aria-invalid={validAddress ? "false" : "true"}
                  aria-describedby="addressnote"
                  onFocus={() => setAddressFocus(true)}
                  onBlur={() => setAddressFocus(false)}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                />
                <p
                  id="addressnote"
                  className={
                    addressFocus && address && !validAddress
                      ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-3"
                      : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {/*write message for invalid address */}
                  Please enter a valid address.
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
                    !validName ||
                    !validPwd ||
                    !validMatch | !validEmail ||
                    !validNumber ||
                    !validAddress
                      ? true
                      : false
                  }
                  className={`${
                    !validName ||
                    !validPwd ||
                    !validMatch | !validEmail ||
                    !validNumber ||
                    !validAddress
                      ? "bg-blue-300"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 w-52 rounded focus:outline-none focus:shadow-outline`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default AdminRegister;
