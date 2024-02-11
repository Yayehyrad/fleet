'use client'
import Image from 'next/image';
import React from 'react';

import { useRouter } from 'next/navigation'

//const jwt = require('jsonwebtoken')
//import { useJwt } from 'react-jwt';













const Login = () => {
  const router = useRouter()



  
 

  return (
    <div className="flex flex-col items-center justify-center h-screen sm:mb-6 md:mb-6 ">
      <h1 className="text-blue-900 text-5xl mt-16 pt-5 font-bold italic">
        Transportation Management
      </h1>
      <Image src="/tr.jpg" alt="hello" width={900} height={830} style={{borderRadius:10}} className="mt-8" />
      <form  className="flex flex-col items-center" >
      <input
  className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
  placeholder="Username"
  type="text"
  name="user"
  
  required
/>

<input
  className="border-2 border-blue-500 w-80 h-12 my-4 rounded px-4 text-blue-500"
  placeholder="Password"
  type="password"
  name="password"

  required
/>

      
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-8 w-25"
          type="submit"
          
       
        >
          LOG IN
        </button>

        <p style={{textAlign:"center", color:"white",marginTop:"5px"}}></p>
      </form>
    </div>

    

)}

  

export default Login;
//export {auth}