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
          navigate("/home"); // arahkan ke halaman home
        } else {
          setErrorMessage(data.message); // tampilkan pesan error
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        {errorMessage && ( // jika ada pesan error, tampilkan pesan tersebut
          <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/reset-password"
          >
            Forgot Password?
          </a>
        </div>
        <div>
          <br />
          <Link to="/register">
            Don't have an account? Click here to register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
