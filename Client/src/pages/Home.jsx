import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    const reqApi = async () => {
      let response = await axios("/namaztime");
      console.log(response.data);
      setData(response.data);
    };
    reqApi();
  }, []);

  useEffect(() => {
    let timer;
    if (search && data) {
      timer = setTimeout(() => {
        setFilteredData(
          data.filter((item) =>
            item.mosqueName.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, 500);
    } else {
      setFilteredData(undefined);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [data, search]);

  let lastPostIndex = currentPage * postsPerPage;
  let firstPostIndex = lastPostIndex - postsPerPage;
  console.log(data, filteredData);
  let currentPosts;
  if (!filteredData) {
    currentPosts = data.slice(firstPostIndex, lastPostIndex);
  } else {
    currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);
  }

  return (
    <section>
      {!currentPosts ? (
        <>
          <div className="grid h-screen place-items-center">
            <Loading />
          </div>
        </>
      ) : (
        <section className="text-white">
          <div className="flex justify-end mr-10 mb-4">
            <div class="flex border-b w-4/5 sm:w-auto border-white py-2">
              <input
                class="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Mosque name..."
                aria-label="Full name"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {currentPosts.length === 0 ? (
            <h1 className="text-center">No Mosque found</h1>
          ) : (
            <section>
              <section className=" grid sm:grid-cols-2 gap-3 content-center">
                {currentPosts.map((ele) => (
                  <section
                    key={ele._id}
                    className="sm:mx-10 mx-5 overflow-x-auto shadow-md rounded-lg"
                  >
                    <table class="w-full text-sm text-left border-separate border-spacing-2 border border-slate-500 text-gray-400 overflow-hidden">
                      <tbody>
                        <tr class=" border-b bg-secondary-dark-bg border-gray-700">
                          <td
                            class="px-6 py-4 text-white text-center"
                            colSpan={2}
                          >
                            <div className="flex justify-between">
                              <h2 className="pt-2">{ele.mosqueName}</h2>

                              <div class="group relative inline-block">
                                {/* <button class="inline-flex rounded bg-black py-2 px-[18px] text-base font-semibold text-white"> */}
                                <img
                                  src="https://img.icons8.com/dotty/35/ffffff/add-bookmark.png"
                                  alt="bookmark"
                                  className=" cursor-pointer"
                                  data-tooltip-target="tooltip-default"
                                />
                                {/* </button> */}
                                <div class="bg-blue-500 absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
                                  <span class="bg-blue-500 absolute top-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm"></span>
                                  Bookmark
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr class="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Fajr
                          </th>
                          <td class="px-6 py-4">{ele.fajr}</td>
                        </tr>
                        <tr class="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Zuhr
                          </th>
                          <td class="px-6 py-4">{ele.zuhr}</td>
                        </tr>

                        <tr class="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Asr
                          </th>
                          <td class="px-6 py-4">{ele.asr}</td>
                        </tr>
                        <tr class="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Magrib
                          </th>
                          <td class="px-6 py-4">{ele.magrib}</td>
                        </tr>
                        <tr class="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Isha
                          </th>
                          <td class="px-6 py-4">{ele.isha}</td>
                        </tr>
                        <tr class="border-b bg-secondary-dark-bg border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                          >
                            Juma
                          </th>
                          <td class="px-6 py-4">{ele.juma}</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                ))}
              </section>
              <Pagination
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default Home;
