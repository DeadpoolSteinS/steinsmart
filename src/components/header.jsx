import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/steins.png";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const accountCookie = Cookies.get("account");
  const [account, setAccount] = useState({});
  const [totalProductInCart, setTotalProductInCart] = useState(0);

  useEffect(() => {
    if (accountCookie === undefined) {
      return navigate("/login");
    }

    const accountTmp = JSON.parse(accountCookie);
    setAccount(JSON.parse(accountCookie));

    fetchProductOnCart(accountTmp._id);
  }, [navigate, accountCookie]);

  function handleLogout() {
    Cookies.remove("account");
    navigate("/login");
  }

  function fetchProductOnCart(accountId) {
    // Fetch data produk dari API
    fetch(`http://localhost:3000/api/account_cart/${accountId}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalProductInCart(data.data.product.length);
      });
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-[#F9A825] shadow-md">
      <div className="container items-center mx-auto flex justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Logo SteinS"
            className="h-8 rounded bg-white px-4 py-2"
          />
        </Link>{" "}
        <div className="flex gap-5 align-bottom">
          <div className="cart-button flex items-center">
            <Link
              to="/cart"
              className="relative text-white hover:text-gray-200 "
            >
              <FaShoppingCart className="text-3xl " />
              <sup className="absolute -top-2 -right-2 flex justify-center items-center text-xs bg-red-500 rounded-full w-5 h-5 text-white font-semibold">
                {totalProductInCart}
              </sup>
            </Link>
          </div>

          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-[#F9A825] hover:bg-white">
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
          <div className="w-full hidden flex-grow gap-4 lg:flex lg:items-center lg:w-auto">
            {/* <div className="text-sm lg:flex-grow">
              <a href="/home" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Home
              </a>
              <a href="/products" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Products
              </a>
              <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                About
              </a>
            </div> */}

            {/* harusnya ini dropdown tapi ga bisa  */}
            <button id="dropdownDefault" data-dropdown-toggle="dropdown">
              <img
                className="h-10 w-10 rounded-full"
                src={account.image}
                alt="Profile Gambar"
              />
            </button>
            <button
              onClick={handleLogout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent  hover:text-[#F9A825] hover:bg-white mt-4 lg:mt-0"
            >
              Logout{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
