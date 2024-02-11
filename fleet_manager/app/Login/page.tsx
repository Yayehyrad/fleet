"use client";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

//const jwt = require('jsonwebtoken')
//import { useJwt } from 'react-jwt';
const handleOneTimePassword = async (e: any, email: string) => {
  console.log("clicked");
  try {
    const response = await axios.post("http://localhost:5000/user/verifyotp", {
      email,
    });
    console.log(response.data);
    redirect("/Otp");
  } catch (error) {
    console.error(error);
  }
};
const handleSublmit = async (e: any, email: string, password: string) => {
  console.log("clicked");
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      email: email,
      password: password,
    });
    console.log(response.data.token);
    Cookies.set("token", "Bearer " + response.data.token);
  } catch (error) {
    console.error(error);
  }
};
const Login = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-[100%] sm:mb-6 md:mb-6 ">
      <h1 className="text-blue-900 text-5xl mt-16 pt-5 font-bold italic">
        Transportation Management
      </h1>
      <Image
        src="/tr.jpg"
        alt="hello"
        width={700}
        height={630}
        style={{ borderRadius: 10 }}
        className="mt-8"
      />
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => handleSublmit(e, email, password)}
      >
        <input
          className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
          placeholder="Username"
          type="text"
          name="user"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2 w-25"
          type="submit"
        >
          LOG IN
        </button>
        <hr className="border-gray-300 w-80 my-4 h-[4px]" />

        <p
          style={{ textAlign: "center", color: "white", marginTop: "5px" }}
        ></p>
      </form>
      <button onClick={(e) => handleOneTimePassword(e, email)}>
        Use one time password
      </button>
    </div>
  );
};

export default Login;
//export {auth}
