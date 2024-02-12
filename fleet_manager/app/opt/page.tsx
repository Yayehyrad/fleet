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
const handleSubmit = async (e, data) => {
  console.log("clicked");
  const opt_id = Cookies.get("otp_id");
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:5000/user/verifyotp/${opt_id}`,
      {
        code: data,
      }
    );
    console.log(response.data);
    Cookies.set("token", "Bearer " + response.data.token);
    // redirect("/Otp");
  } catch (error) {
    console.error(error);
  }
};

const Otp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

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
        onSubmit={(e) => handleSubmit(e, otp)}
      >
        <input
          className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
          placeholder="Otp"
          type="text"
          name="text"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          // required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2 w-25"
          type="submit"
        >
          LOG IN
        </button>

        <p
          style={{ textAlign: "center", color: "white", marginTop: "5px" }}
        ></p>
      </form>
    </div>
  );
};

export default Otp;
//export {auth}
