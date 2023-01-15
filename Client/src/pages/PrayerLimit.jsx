import axios from "axios";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import { city, country, method, school } from "../data/dummy";

const PrayerLimit = () => {
  const [cityName, setCityName] = useState(city[0]);
  const [countryName, setCountry] = useState(country[0]);
  const [methodName, setMethodName] = useState(method[0]);
  const [schoolName, setSchoolName] = useState(school[0]);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    console.log(cityName, countryName, methodName, schoolName);
    const apiCall = async () => {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${cityName.name}&country=${countryName.name}&method=${methodName.id}&school=${schoolName.id}`
      );
      console.log(response.data);
      setData(response.data);
    };
    apiCall();
  }, [cityName, countryName, methodName, schoolName]);

  return (
    <>
      {!data ? (
        <div className="grid h-screen place-items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <section>
          <section className="mx-3 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <Dropdown
              placeholder="country"
              data={country}
              settingFunction={setCountry}
            />
            <Dropdown
              placeholder="city"
              data={city}
              settingFunction={setCityName}
            />
            <Dropdown
              placeholder="Method"
              data={method}
              settingFunction={setMethodName}
            />
            <Dropdown
              placeholder="school"
              data={school}
              settingFunction={setSchoolName}
            />
          </section>
          <h2 className="text-lg mx-4 my-5 text-white">Info:</h2>
          <section className="mx-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 mt-2 lg:gap-4 text-white">
            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                Gregorian Date:{" "}
                <span className=" text-slate-100 sm:text-lg">
                  {data.data.date.readable}
                </span>{" "}
              </h3>
            </div>
            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                Hijri Date:{" "}
                <span className=" text-slate-100 sm:text-lg">
                  {`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`}
                </span>
              </h3>
            </div>

            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                Method:{" "}
                <span className=" text-slate-100 sm:text-lg">
                  {data.data.meta.method.name}
                </span>
              </h3>
            </div>
            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                School:{" "}
                <span className=" text-slate-100 sm:text-lg">{`${data.data.meta.school}`}</span>
              </h3>
            </div>
          </section>
          <section>
            <h2 className="text-lg mx-4 my-5 text-white">Namaz Timing:</h2>
            <div className="mx-4 my-5 overflow-x-auto shadow-md rounded-lg">
              <table class="w-full text-sm text-left text-gray-400">
                <tbody>
                  <tr class=" border-b bg-secondary-dark-bg  border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      Sahr (Imsak)
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Imsak}</td>
                  </tr>
                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Fajr Start
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Fajr}</td>
                  </tr>
                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Fajr End (Sunrise)
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Sunrise}</td>
                  </tr>

                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Zuhr Start
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Dhuhr}</td>
                  </tr>
                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Asr Start
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Asr}</td>
                  </tr>
                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Asr End (Sunset)
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Sunset}</td>
                  </tr>
                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Maghrib Start
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Maghrib}</td>
                  </tr>
                  <tr class="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Maghrib End & Isha Start
                    </th>
                    <td class="px-6 py-4">{data.data.timings.Isha}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default PrayerLimit;
