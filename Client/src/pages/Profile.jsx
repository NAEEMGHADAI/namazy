import { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import jwtDecode from "jwt-decode";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const { auth } = useContent();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const id = decoded?.UserInfo?.id || "";
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`manageuser/${id}`, {
          signal: controller.signal,
        });

        console.log(response.data);
        isMounted && setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, id]);
  return (
    <div class="max-w-4xl flex items-center  flex-wrap mx-auto my-32 lg:my-0">
      <div
        id="profile"
        class=" w-11/12 lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-secondary-dark-bg text-white mx-3 lg:mx-0"
      >
        <div class="p-4 md:p-8 text-center lg:text-left">
          <div
            class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                user.imageUrl
                  ? user.imageUrl
                  : "https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
              })`,
            }}
          ></div>

          <h1 class="text-3xl font-bold pt-8 lg:pt-0">{user.username}</h1>
          <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>
          <p class="pt-4 sm:text-base text-xs sm:font-bold flex items-center justify-center lg:justify-start">
            <svg
              width="21"
              height="21"
              fill="none"
              stroke="#1E40AF"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4"
            >
              <path d="M19.875 4.5H4.125c-1.036 0-1.875.84-1.875 1.875v11.25c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875V6.375c0-1.036-.84-1.875-1.875-1.875Z"></path>
              <path d="M5.25 7.5 12 12.75l6.75-5.25"></path>
            </svg>
            {user.email}
          </p>
          <p class="pt-2  text-xs lg:text-sm flex items-center justify-center lg:justify-start">
            <svg
              width="21"
              height="21"
              fill="none"
              stroke="#454ad3"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4"
            >
              <path d="M21.14 17.53c-.744-.75-2.546-1.844-3.421-2.285-1.139-.574-1.233-.62-2.128.045-.597.444-.994.84-1.693.691-.7-.149-2.218-.99-3.548-2.315-1.33-1.326-2.219-2.889-2.368-3.585-.15-.697.253-1.09.693-1.688.62-.843.573-.984.043-2.123-.413-.886-1.54-2.672-2.292-3.413-.805-.795-.805-.654-1.324-.439a7.508 7.508 0 0 0-1.211.646c-.75.498-1.166.912-1.457 1.534-.292.622-.422 2.08 1.081 4.811s2.558 4.127 4.74 6.304c2.184 2.177 3.862 3.348 6.316 4.724 3.036 1.7 4.2 1.369 4.824 1.078.624-.29 1.04-.703 1.54-1.453a7.43 7.43 0 0 0 .646-1.21c.216-.516.357-.516-.44-1.321Z"></path>
            </svg>
            {user.phonenumber}
          </p>
          <p class="pt-8 text-sm">{user.address}</p>

          <div class="pt-12 pb-8 flex justify-between w-full items-center md:flex-row flex-col">
            <Link
              to="/editprofile"
              class="bg-blue-700 hover:bg-blue-900 md:w-fit sm:w-1/2 w-4/5 text-white font-bold py-2 px-4 rounded-full"
            >
              <button>Edit Profile</button>
            </Link>
            <Link
              to="/edit"
              class="bg-green-700 hover:bg-green-900 md:w-fit sm:w-1/2 w-4/5 mt-4 md:mt-0 text-white font-bold py-2 px-4 rounded-full"
            >
              <button>Edit Mosque Details</button>
            </Link>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-2/5">
        <img
          src={`${
            user.imageUrl
              ? user.imageUrl
              : "https://pixabay.com/get/g84bce345da3f00b57adfa3ec41e647d6f9f98c55034a4fcb23ca0020d1f44e488dcd17902ffc140f5e10d9c632fe6acfb29c2926255f7c3c0fa2961b84a175066cbf3614a2a7cb7fa29ed40d22bccd74_640.png"
          }`}
          alt=""
          class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Profile;