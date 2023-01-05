import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import FormInput from "./formInput";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim data login ke API
    fetch("http://localhost:3000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json()) // parse body menjadi object JavaScript
      .then((data) => {
        if (data.status === "sukses") {
          Cookies.set("account", JSON.stringify(data.data), { expires: 7 });
          navigate("/"); // arahkan ke halaman home
        } else {
          setErrorMessage(data.message); // tampilkan pesan error
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9A825]">
      <form
        className=" bg-white p-8 mx-80 rounded-3xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <p className="mb-3 text-2xl text-[#F9A825] font-bold font-serif p-5">
          Welcome to Steinsmart, Fellas!
        </p>

        {errorMessage && ( // jika ada pesan error, tampilkan pesan tersebut
          <div className="flex justify-center">
            <p className="text-red-500 text-sm italic just">{errorMessage}</p>
          </div>
        )}

        <FormInput
          label="Username"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          required
          className="mb-4"
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={handlePasswordChange}
          required
          className="mb-6"
        />

        <div className="flex items-center justify-center">
          <button
            className="bg-[#F9A825] hover:bg-[#FF7000] text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline "
            type="submit"
          >
            Sign In
          </button>
          {/* <a className="inline-block align-baseline font-bold text-sm text-[#F9A825] hover:text-[#FF7000]" href="/reset-password">
            Forgot Password?
          </a> */}
        </div>
        <div className="flex mt-5 text-xs justify-center">
          <br />
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#F9A825] hover:text-[#FF7000] font-bold"
            >
              Click here to register!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
