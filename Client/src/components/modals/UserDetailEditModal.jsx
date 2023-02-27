import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import { PaperClipIcon } from "@heroicons/react/20/solid";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import timeSince from "../../helper/timeSince";
import { Accordion, AccordionBody } from "@material-tailwind/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ImageModal from "./ImageModal";
import useContent from "../../hooks/useContent";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
const NUMBER_REGEX = /^[0-9]{10}$/;
const ADDRESS_REGEX = /^[a-zA-Z0-9.,#\-/\s]+$/;

export default function UserDetailEditModal({ user }) {
  const [open, setOpen] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [namazTime, setNamazTime] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { setChanged } = useContent();
  const UPDATE_URL = `/manageuser/${user._id}`;

  console.log(user);
  const userRef = useRef();
  const errRef = useRef();

  const [isApproved, setIsApproved] = useState(false);
  const [username, setUserName] = useState(user.username);
  const [validName, setValidName] = useState(false);

  const [name, setName] = useState(user.name);
  const [validOgName, setValidOgName] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [validEmail, setValidEmail] = useState(false);

  const [number, setNumber] = useState(user.phonenumber);
  const [validNumber, setValidNumber] = useState(false);

  const [address, setAddress] = useState(user.address);
  const [validAddress, setValidAddress] = useState(false);

  const [file, setFile] = useState(user.imageUrl);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidOgName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = NUMBER_REGEX.test(number);
    setValidNumber(result);
  }, [number]);

  useEffect(() => {
    const result = ADDRESS_REGEX.test(address);
    setValidAddress(result);
  }, [address]);

  useEffect(() => {
    setErrMsg("");
  }, [user, name, email, number, address, file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = NUMBER_REGEX.test(number);
    const v4 = ADDRESS_REGEX.test(address);
    const v5 = NAME_REGEX.test(name);

    console.log(v1, v2, v3, v4);
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !file) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const form = new FormData();
      form.append("user", username);
      form.append("name", name);
      form.append("phonenumber", number);
      form.append("email", email);
      form.append("address", address);
      if (isApproved) {
        form.append("isApproved", "Approved");
      }
      form.append("file", file);

      const response = await axiosPrivate.put(UPDATE_URL, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      console.log(JSON.stringify(response));
      setChanged(response);
      setOpen(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Form Submission Failed");
      }
      errRef.current.focus();
    }
  };

  const handleOpen = (value) => {
    setAccordion(accordion === value ? 0 : value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const getNamazTime = async () => {
      try {
        const response = await axiosPrivate.get(`/mosque/${user.username}`, {
          signal: controller.signal,
        });
        console.log(response);
        for (const key in response.data) {
          setNamazTime((prev) => {
            if (
              key !== "username" &&
              key !== "mosqueName" &&
              key !== "_id" &&
              key !== "__v"
            ) {
              return [...prev, [key, response.data[key]]];
            } else {
              return prev;
            }
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getNamazTime();
  }, [axiosPrivate, user]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 flex transition-colors duration-200 hover:text-blue-500 focus:outline-none gap-2"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"></path>
          <path d="M9 14.996h3l8.5-8.5a2.121 2.121 0 0 0-3-3l-8.5 8.5v3Z"></path>
          <path d="m16 5 3 3"></path>
        </svg>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 flex justify-between">
                          User Details
                          {user.newUser ? (
                            <span class=" text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-red-600 ">
                              New
                            </span>
                          ) : null}
                        </Dialog.Title>
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

                        <ImageModal file={file} />
                        <br />
                        <div className="flex justify-center">
                          <label class="block">
                            <span class="sr-only">Choose File</span>
                            <input
                              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="file"
                              //   value={file}
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              aria-describedby="filenote"
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                          </label>
                        </div>
                        <div className="flex justify-between mt-3"></div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}

                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div
                            className="h-full border-2 border-dashed border-gray-200"
                            aria-hidden="true"
                          >
                            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                              <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                  Applicant Information
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  Personal details and application.
                                </p>
                              </div>
                              <div className="border-t border-gray-200">
                                <dl>
                                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Username{" "}
                                      <span
                                        className={
                                          validName
                                            ? "text-green-600 ml-1"
                                            : "hidden"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                      </span>
                                      <span
                                        className={
                                          validName || !username
                                            ? "hidden"
                                            : "text-red-600 ml-1"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTimes} />
                                      </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <div className="flex items-center justify-between">
                                        <input
                                          type="text"
                                          id="username"
                                          ref={userRef}
                                          value={username}
                                          autoComplete="off"
                                          onChange={(e) =>
                                            setUserName(e.target.value)
                                          }
                                          required
                                          aria-invalid={
                                            validName ? "false" : "true"
                                          }
                                          aria-describedby="uidnote"
                                          className="shadow appearance-none text-black rounded-2xl w-full py-2 px-3 focus:outline-none bg-gray-200 focus:shadow-outline"
                                        />

                                        {user.roles["Admin"] === 5150 ? (
                                          <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Admin
                                          </p>
                                        ) : (
                                          <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            User
                                          </p>
                                        )}
                                      </div>
                                    </dd>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Full name{" "}
                                      <span
                                        className={
                                          validOgName
                                            ? "text-green-600 ml-1"
                                            : "hidden"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                      </span>
                                      <span
                                        className={
                                          validOgName || !name
                                            ? "hidden"
                                            : "text-red-600 ml-1"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTimes} />
                                      </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <div className="flex items-center justify-between">
                                        <input
                                          type="text"
                                          id="name"
                                          value={name}
                                          autoComplete="off"
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          required
                                          aria-invalid={
                                            validOgName ? "false" : "true"
                                          }
                                          className="shadow appearance-none text-black rounded-2xl w-full py-2 px-3 focus:outline-none bg-gray-200 focus:shadow-outline"
                                        />
                                      </div>
                                    </dd>
                                  </div>
                                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Application status
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      {user.isApproved === "Approved" && (
                                        <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                          <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M10 3L4.5 8.5L2 6"
                                              stroke="currentColor"
                                              stroke-width="1.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>

                                          <h2 class="text-sm font-normal">
                                            Accepted
                                          </h2>
                                        </div>
                                      )}{" "}
                                      {user.isApproved === "Pending" && (
                                        <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-emerald-100/60 ">
                                          {/*svg for pending */}
                                          <svg
                                            width="12"
                                            height="12"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M6.5 7h11"></path>
                                            <path d="M6.5 17h11"></path>
                                            <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z"></path>
                                            <path d="M6 4v2a6 6 0 1 0 12 0V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v0Z"></path>
                                          </svg>

                                          <h2 className="text-sm font-normal">
                                            Pending
                                          </h2>
                                        </div>
                                      )}
                                      {user.isApproved === "Rejected" && (
                                        <>
                                          <div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2  bg-emerald-100/60 ">
                                            <svg
                                              width="12"
                                              height="12"
                                              viewBox="0 0 12 12"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M9 3L3 9M3 3L9 9"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              />
                                            </svg>

                                            <h2 class="text-sm font-normal">
                                              Rejected
                                            </h2>
                                          </div>
                                          <div className="flex mt-1">
                                            <h3 className=" text-sm">
                                              Do you want to accept this user?
                                            </h3>
                                            <input
                                              type="checkbox"
                                              value={isApproved}
                                              onChange={() =>
                                                setIsApproved(!isApproved)
                                              }
                                            />
                                          </div>
                                        </>
                                      )}
                                    </dd>
                                  </div>
                                  <div className=" bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Email address{" "}
                                      <span
                                        className={
                                          validEmail
                                            ? "text-green-600 ml-1"
                                            : "hidden"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                      </span>
                                      <span
                                        className={
                                          validEmail || !email
                                            ? "hidden"
                                            : "text-red-600 ml-1"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTimes} />
                                      </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <input
                                        type="email"
                                        id="email"
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        value={email}
                                        autoComplete="off"
                                        required
                                        aria-invalid={
                                          validEmail ? "false" : "true"
                                        }
                                        aria-describedby="emailnote"
                                        className="shadow appearance-none text-black rounded-2xl w-full py-2 px-3 focus:outline-none bg-gray-200 focus:shadow-outline"
                                      />
                                    </dd>
                                  </div>
                                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Phone Number
                                      <span
                                        className={
                                          validNumber
                                            ? "text-green-600 ml-1"
                                            : "hidden"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                      </span>
                                      <span
                                        className={
                                          validNumber || !number
                                            ? "hidden"
                                            : "text-red-600 ml-1"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTimes} />
                                      </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <input
                                        type="tel"
                                        id="tel"
                                        value={number}
                                        onChange={(e) =>
                                          setNumber(e.target.value)
                                        }
                                        autoComplete="off"
                                        required
                                        aria-invalid={
                                          validNumber ? "false" : "true"
                                        }
                                        aria-describedby="telnote"
                                        className="shadow appearance-none text-black rounded-2xl w-full py-2 px-3 focus:outline-none bg-gray-200 focus:shadow-outline"
                                      />
                                    </dd>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
                                    <Fragment>
                                      <Accordion open={accordion === 1}>
                                        <h1
                                          onClick={() => handleOpen(1)}
                                          className="flex justify-between cursor-pointer text-sm font-medium text-gray-500"
                                        >
                                          Namaz Timings
                                          {accordion === 1 ? (
                                            <svg
                                              width="21"
                                              height="21"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path d="M5 12h14"></path>
                                            </svg>
                                          ) : (
                                            <svg
                                              width="21"
                                              height="21"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path d="M12 5v14"></path>
                                              <path d="M5 12h14"></path>
                                            </svg>
                                          )}
                                        </h1>
                                        <AccordionBody>
                                          {namazTime.length > 0 ? (
                                            namazTime.map((time, i) => (
                                              <div
                                                className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                                key={i}
                                              >
                                                <dt className="text-sm font-medium text-gray-500">
                                                  {time[0]}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                  {time[0] === "lastModified"
                                                    ? timeSince(time[1])
                                                    : time[1]}
                                                </dd>
                                              </div>
                                            ))
                                          ) : (
                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                              <dt className="text-sm font-medium text-gray-500">
                                                No timings added
                                              </dt>
                                            </div>
                                          )}
                                        </AccordionBody>
                                      </Accordion>
                                    </Fragment>
                                  </div>

                                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Address{" "}
                                      <span
                                        className={
                                          validAddress
                                            ? "text-green-600 ml-1"
                                            : "hidden"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faCheck} />
                                      </span>
                                      <span
                                        className={
                                          validAddress || !address
                                            ? "hidden"
                                            : "text-red-600 ml-1"
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTimes} />
                                      </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <textarea
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) =>
                                          setAddress(e.target.value)
                                        }
                                        autoComplete="off"
                                        required
                                        aria-invalid={
                                          validAddress ? "false" : "true"
                                        }
                                        aria-describedby="addressnote"
                                        className="shadow appearance-none text-black rounded-2xl w-full py-2 px-3 focus:outline-none bg-gray-200 focus:shadow-outline"
                                      />
                                    </dd>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Applied on
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2  border border-gray-500">
                                        <svg
                                          aria-hidden="true"
                                          class="w-3 h-3 mr-1"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                        {timeSince(user.createdAt)}
                                      </span>
                                    </dd>
                                  </div>

                                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                      Last updated
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                      <span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  border border-blue-400">
                                        <svg
                                          aria-hidden="true"
                                          class="w-3 h-3 mr-1"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                        {timeSince(user.updatedAt)}
                                      </span>
                                    </dd>
                                  </div>
                                  <div className="text-center px-4 py-5">
                                    <button
                                      type="submit"
                                      onClick={handleSubmit}
                                      disabled={
                                        !validName ||
                                        !validOgName ||
                                        !validEmail ||
                                        !validNumber ||
                                        !validAddress ||
                                        !file
                                          ? true
                                          : false
                                      }
                                      className={`${
                                        !validName ||
                                        !validOgName ||
                                        !validEmail ||
                                        !validNumber ||
                                        !validAddress ||
                                        !file
                                          ? "bg-blue-300"
                                          : "bg-blue-500 hover:bg-blue-700"
                                      } text-white font-bold py-2 w-52 rounded focus:outline-none focus:shadow-outline`}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}