import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import jwtDecode from "jwt-decode";
import useContent from "../hooks/useContent";
import { useNavigate } from "react-router-dom";
const NEW_ENTRY_URL = "/mosque";

const EditNamazTime = () => {
  const [errMsg, setErrMsg] = useState("");
  const [namazTime, setNamazTime] = useState();
  const [mosqueName, setMosqueName] = useState("");
  const [fajr, setFajr] = useState("");
  const [zuhr, setZuhr] = useState("");
  const [asr, setAsr] = useState("");
  const [magrib, setMagrib] = useState("");
  const [isha, setIsha] = useState("");
  const [jummah, setJummah] = useState("");
  const [success, setSuccess] = useState("");

  const errRef = useRef();
  const successRef = useRef();

  const { auth } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
    setSuccess("");
  }, [fajr, zuhr, asr, magrib, isha, jummah]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const username = decoded?.UserInfo?.username || "";
    const userId = decoded?.UserInfo?.id || "";
    console.log("EditNamaz Time", decoded, username);

    const getNamazTime = async () => {
      try {
        const response = await axiosPrivate.get(`/mosque/${userId}`, {
          signal: controller.signal,
        });
        console.log(response);

        isMounted && setNamazTime(response.data);
        setMosqueName(response.data.mosqueName);
        setFajr(response.data.fajr);
        setZuhr(response.data.zuhr);
        setAsr(response.data.asr);
        setMagrib(response.data.magrib);
        setIsha(response.data.isha);
        setJummah(response.data.juma);
      } catch (err) {
        console.error(err);
      }
    };
    getNamazTime();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, auth.accessToken, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const username = decoded?.UserInfo?.username || "";
    const userId = decoded?.UserInfo?.id || "";
    const data = {
      fajr,
      zuhr,
      asr,
      magrib,
      isha,
      username,
      userId,
      juma: jummah,
      lastModified: new Date(),
    };
    try {
      if (!namazTime) {
        const response = await axiosPrivate.post(
          NEW_ENTRY_URL,
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSuccess("Successfully Added");
        console.log(JSON.stringify(response?.data));
      } else {
        const response = await axiosPrivate.put(
          NEW_ENTRY_URL,
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSuccess("Successfully Updated");
        console.log(JSON.stringify(response?.data));
      }
      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        console.log(err.response);
        setErrMsg("All Fields are Required");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="flex flex-col flex-wrap content-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className={`bg-secondary-dark-bg h-fit w-5/6 rounded-2xl py-6 text-white`}
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
        <p
          ref={successRef}
          className={
            success
              ? "bg-green-500 text-white rounded-lg p-2 mb-2 font-bold"
              : "absolute -left-full"
          }
          aria-live="assertive"
        >
          {success}
        </p>
        <div className="mx-5">
          <h1 className="sm:text-3xl font-bold mb-4 text-center">
            {!namazTime
              ? "Add New Entry"
              : `Upadate Values here: ${mosqueName}`}
          </h1>

          <div className="flex flex-col flex-wrap content-center justify-center w-full h-fit">
            <div className="grid sm:grid-cols-2 sm:w-11/12 gap-x-16">
              <div className="">
                <label
                  htmlFor="fajrTime"
                  className="block text-sm font-bold mb-2"
                >
                  Fajr:
                </label>
                <input
                  type="text"
                  id="fajrTime"
                  onChange={(e) => setFajr(e.target.value)}
                  name="fajr"
                  value={fajr || ""}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="zuhrTime"
                  className="block text-sm font-bold mb-2"
                >
                  zuhr:
                </label>
                <input
                  type="text"
                  id="zuhrTime"
                  onChange={(e) => setZuhr(e.target.value)}
                  value={zuhr || ""}
                  name="zuhr"
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="asrTime"
                  className="block text-sm font-bold mb-2"
                >
                  Asr:
                </label>
                <input
                  type="text"
                  id="asrTime"
                  onChange={(e) => setAsr(e.target.value)}
                  name="asr"
                  value={asr || ""}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="magribTime"
                  className="block text-sm font-bold mb-2"
                >
                  maghrib:
                </label>
                <input
                  type="text"
                  id="magribTime"
                  onChange={(e) => setMagrib(e.target.value)}
                  name="magrib"
                  value={magrib || ""}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="ishaTime"
                  className="block text-sm font-bold mb-2"
                >
                  Isha:
                </label>
                <input
                  type="text"
                  id="ishaTime"
                  onChange={(e) => setIsha(e.target.value)}
                  name="isha"
                  value={isha || ""}
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="jummaTime"
                  className="block text-sm font-bold mb-2"
                >
                  Jumma:
                </label>
                <input
                  type="text"
                  id="jummaTime"
                  onChange={(e) => setJummah(e.target.value)}
                  value={jummah || ""}
                  name="juma"
                  className="shadow appearance-none text-white rounded-2xl w-full py-2 px-3 focus:outline-none bg-active-link-bg focus:shadow-outline"
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center mb-6 mt-6">
            <button
              className={`${
                !fajr || !zuhr || !asr || !magrib || !isha || !jummah
                  ? "bg-blue-300"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 w-52 rounded focus:outline-none focus:shadow-outline`}
              disabled={
                !fajr || !zuhr || !asr || !magrib || !isha || !jummah
                  ? true
                  : false
              }
            >
              {!namazTime ? "Submit" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditNamazTime;
