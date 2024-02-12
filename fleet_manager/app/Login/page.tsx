"use client";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Recapcha from "react-google-recaptcha";

//const jwt = require('jsonwebtoken')
//import { useJwt } from 'react-jwt';
const handleOneTimePassword = async (e: any, email: string, router) => {
  console.log("clicked");
  try {
    const response = await axios.post("http://localhost:5000/user/verifyotp", {
      email,
    });
    console.log(response.data, response.data.data.otpVerification._id);
    Cookies.set("otp_id", response.data.data.otpVerification._id);
    router.push("/opt");
  } catch (error) {
    console.error(error);
  }
};
const handleSublmit = async (
  e: any,
  email: string,
  password: string,
  token,
  router
) => {
  console.log("clicked");
  e.preventDefault();
  // if (!token) {
  //   alert("Please verify the captcha");
  //   return;
  // }
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      email: email,
      password: password,
    });
    console.log(response.data);
    Cookies.set("token", "Bearer " + response.data.token);
    Cookies.set("Role", response.data.user.role);
    router.push(`/${response.data.user.role}`);
  } catch (error) {
    console.error(error);
  }
};
const Login = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const reRef = React.useRef();
  const [token, setToken] = useState("");
  const handleRecaptchaChange = (value: string) => {
    setToken(value);
  };
  console.log();

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
        onSubmit={(e) => handleSublmit(e, email, password, token, router)}
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
        {/* <Recapcha
          sitekey={process.env.NEXT_PUBLIC_API_KEY}
          onChange={handleRecaptchaChange}
          className=" m-auto"
        /> */}
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
      <button onClick={(e) => handleOneTimePassword(e, email, router)}>
        Use one time password
      </button>
    </div>
  );
};

export default Login;
//export {auth}
