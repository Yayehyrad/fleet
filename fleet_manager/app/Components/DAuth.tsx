"use client";
//import { auth } from "../login/page";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from 'js-cookie';




//var auth:any;


export default   function isDriver(Component: any) {
  return  function IsAuth(props: any) {

    const auth = Cookies.get("Role")
  
   
    
    


    useEffect(() => {
     
      if (auth !== "Driver") {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}