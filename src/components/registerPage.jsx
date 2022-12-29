import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./formInput";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

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

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim data register ke API
    fetch("http://localhost:3000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, image }),
    })
      .then((response) => response.json()) // parse body menjadi object JavaScript
      .then((data) => {
        setErrorMessage(data.message); // tampilkan pesan error
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9A825]">
      <form className=" bg-white p-8 mx-80 rounded-3xl shadow-xl" onSubmit={handleSubmit}>
        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
        <p className="mb-3 text-2xl text-[#F9A825] font-bold font-serif p-5">Welcome to Steinsmart, Fellas!</p>
        <FormInput label="Username" id="username" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required className="mb-4 " />

        <FormInput label="Email" id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} required className="mb-4" />

        <FormInput label="Password" id="password" type="password" placeholder="**********" value={password} onChange={handlePasswordChange} required className="mb-4" />

        <FormInput label="Link Image" id="image" type="text" placeholder="https://avatars.githubusercontent.com/u/75278889?v=4" value={image} onChange={handleImageChange} required className="mb-4" />

        <div className="flex justify-center">
          <button className="bg-[#F9A825] hover:bg-[#FF7000] text-white font-semibold py-2 px-4 rounded-lg mt-3 focus:outline-none focus:shadow-outline" type="submit">
            Register
          </button>
        </div>
        <div className="flex mt-5  text-xs justify-center">
          <br />
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-[#F9A825] hover:text-[#FF7000] font-bold">
              Click here to login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
