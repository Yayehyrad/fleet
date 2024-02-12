"use client"
import React from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link';

interface Activity{
    description:string;
      timestamps:Date;
        
      user_name:string
      Ip:string
      }
  
  
  
  
  const x:Activity[] = []

const Activity = ()=>{

    const [Data,setData] = React.useState(x)

    const fetchData = async()=>{
        try {
            const response = await fetch("http://localhost:5000/activity/all")
            const Data = await response.json()
            console.log(Data)
            setData(Data)
            
            
          } catch (error) {
      
            console.log(error)
            
          }




    }
    React.useEffect(()=>{
        fetchData()
      },[])

    return(
        <div>
             <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <Link href="/Admin">
            Home
          </Link>

          <Link href="/Admin/Add">
            Add
          </Link>

          <Link href="/Admin/Activity">
            Activities
          </Link>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">Admin Panel</a>
  </div>
  <div className="navbar-end">
  
  </div>
</div>
               <h1 className="text-center text-cyan-700 text-4xl m-7 ">Activities</h1>
               <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>username</th>
        <th>description</th>
        <th>time</th>
        <th>Ip</th>
       
        
      </tr>
      {
       Data.map((value, index) => {
        return(
          <tr key={index}>
          <th></th>
          <th>{value.user_name}</th>
          <th>{value.description}</th>
          <th>{value.timestamps.toLocaleString()}</th>
          <th>{value.Ip}</th>
        
      
          
        </tr>

        )
      })
    
         
    
      }
    </thead>
    <tbody>
      {/* row 1 */}
     
      {/* row 2 */}
      
     
     
    </tbody>
  </table>
</div>

        </div>

    )


}

export default Activity