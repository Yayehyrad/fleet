"use client";
import axios from "axios";
import Cookies from "js-cookie";
export default function Driver() {
  const check = async () => {
    const response = await axios.get("http://localhost:5000/users/me", {
      headers: {
        Authorization: Cookies.get("token"),
      },
    });

    if (response.status === 200) {
      const user = response.data;
      console.log(user);
    }
  };
  return (
    <div>
      <h1>Driver</h1>
      <button onClick={check}>hwer</button>
    </div>
  );
}
