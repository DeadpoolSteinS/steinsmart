import React from "react";
import logo from "../images/steins.png";

function Header() {
  return (
    <nav className="flex items-center justify-between p-4 bg-[#F9A825] shadow-md">
      <div className="container mx-auto flex justify-between">
        <img
          src={logo}
          alt="Logo Tokopedia"
          className="h-8 rounded bg-white px-4 py-2"
        />
        <div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow gap-4 lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a
                href="/home"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Home
              </a>
              <a
                href="/products"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Products
              </a>
              <a
                href="/about"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                About
              </a>
            </div>
            <div>
              <a
                href="/log-out"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
