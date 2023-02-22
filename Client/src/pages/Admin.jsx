import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Pagination from "../components/Pagination";
import DeleteUserModal from "../components/modals/DeleteUserModal";
import useContent from "../hooks/useContent";
import timeSince from "../helper/timeSince";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const { changed } = useContent();
  const [search, setSearch] = useState("");
  const userPerPage = 4;
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });

        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, changed]);

  useEffect(() => {
    let timer;
    if (search && users) {
      timer = setTimeout(() => {
        setFilteredData(
          users.filter((item) =>
            item.username.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, 500);
    } else {
      setFilteredData(undefined);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [users, search]);

  let lastPostIndex = currentPage * userPerPage;
  let firstPostIndex = lastPostIndex - userPerPage;

  let currentUsers;
  if (!filteredData) {
    currentUsers = users.slice(firstPostIndex, lastPostIndex);
  } else {
    currentUsers = filteredData.slice(firstPostIndex, lastPostIndex);
  }
  console.log(currentUsers.length);

  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
              <div className="p-4">
                <label for="table-search" className="sr-only">
                  Search
                </label>
                <div className="flex justify-start mt-1">
                  <input
                    type="text"
                    id="table-search"
                    className=" border text-sm rounded-lg block w-72  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for items"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-700">
                <thead className=" bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <button className="flex items-center gap-x-2">
                          <span>Username</span>
                        </button>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      Roles
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      Email
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-secondary-dark-bg">
                  {currentUsers?.length ? (
                    currentUsers.map((user, i) => (
                      <tr key={user._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{user.username}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {!user.createdAt ? "" : timeSince(user.createdAt)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
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
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {user.isApproved === "Pending" && (
                            <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-800">
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

                              <h2 className="text-sm font-normal">Pending</h2>
                            </div>
                          )}
                          {user.isApproved === "Approved" && (
                            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
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

                              <h2 class="text-sm font-normal">Accepted</h2>
                            </div>
                          )}
                          {user.isApproved === "Rejected" && (
                            <div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
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

                              <h2 class="text-sm font-normal">Rejected</h2>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4 text-sm  text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <p className="text-sm font-normal text-gray-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button className="text-blue-600 flex transition-colors duration-200 hover:text-blue-500 focus:outline-none gap-2">
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
                            <DeleteUserModal username={user.username} />
                            <button className=" text-blue-400 flex transition-colors duration-200 hover:text-blue-500 focus:outline-none gap-2">
                              <svg
                                width="17"
                                height="17"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                                <path d="M12 8h.01"></path>
                                <path d="M11 12h1v4h1"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-white">
                      <td colSpan={5} className="text-center py-4">
                        <p>No Users to display</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {console.log(filteredData, users)}
      <Pagination
        totalPosts={filteredData ? filteredData.length : users.length}
        postsPerPage={userPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Admin;
