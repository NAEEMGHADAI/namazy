import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

              {/* <button
                class="flex-shrink-0 border-transparent border-4 text-white hover:text-blue-500 text-sm py-1 px-2 rounded"
                type="button"
              >
                Search
              </button> */}
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
                    <table class="w-full text-sm text-left border-separate border-spacing-2 border border-slate-500 text-gray-400">
                      <tbody>
                        <tr class=" border-b bg-secondary-dark-bg border-gray-700">
                          <td
                            class="px-6 py-4 text-white text-center"
                            colSpan={2}
                          >
                            <h2>{ele.mosqueName}</h2>
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
