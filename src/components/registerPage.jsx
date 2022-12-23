import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./formInput";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim data register ke API
    fetch("http://localhost:3000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json()) // parse body menjadi object JavaScript
      .then((data) => {
        setErrorMessage(data.message); // tampilkan pesan error
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        {errorMessage && (
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
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
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
            Register
          </button>
        </div>
        <div>
          <br />
          <Link to="/login">Already have an account? Click here to login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
