import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  console.log(currentPage, postsPerPage);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-4/5 w-full  flex items-center justify-between border-t border-gray-200">
          <div
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
            onClick={() => {
              if (currentPage === 1) {
                return;
              }
              setCurrentPage(currentPage - 1);
            }}
          >
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
          </div>
          <div className="sm:flex hidden">
            {pages.map((page, i) => (
              <>
                <p
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage
                      ? "text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2"
                      : "text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
                  }
                >
                  {page}
                </p>
              </>
            ))}
          </div>
          <div
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
            onClick={() => {
              if (currentPage === pages.length) {
                return;
              }
              setCurrentPage(currentPage + 1);
            }}
          >
            <p className="text-sm font-medium leading-none mr-3">Next</p>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
