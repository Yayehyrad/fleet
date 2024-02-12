"use client"
import isAdmin from "../Components/Auth"
import React from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link';

interface User{
  _id:string;
  name:string;
  user_name:string;
  email:string;
  role:string;
  status:string;
  attempts:string;


}

const x:User[] = []

const Manager = ()=>
{
  const router = useRouter()
  const [Data,setData] = React.useState(x)
  const [clicked,setCliked] = React.useState(true)

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/user/${id}`, {
          method: 'Delete',
          
      
        });
  
        if (response.ok && response.status === 200) {
          const data = await response.json();
          console.log(data);
          alert('User deleted successfully! Refresh the page to see the changes');
        } else {
          alert('Error Deleting User.');
        }
      } catch (error) {
        alert('Error deleting User.');
      }
    }
  };

  const fetchData = async() =>{
    try {
      const response = await fetch("http://localhost:5000/users/all")
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
        <div className="bg-white-500 h-screen">
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
        
     
               <h1 className="text-center text-cyan-700 text-4xl m-7 ">Add Driver</h1>

               <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Username</th>
        <th>Role</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
        
      </tr>
      {
       Data.map((value, index) => {
        if(value.role === "Driver")
        {

        return(
          <tr key={value._id}>
          <th></th>
          <th>{value.name}</th>
          <th>{value.email}</th>
          <th>{value.user_name}</th>
          <th>{value.role}</th>
         
          <th>{value.status}</th>
          <td><button className="btn btn-outline btn-info" onClick={()=>{router.push("/Admin/Edit?id="+ value._id)}} >Edit</button></td>
        <td><button className="btn btn-outline btn-error" onClick={()=>{handleDelete(value._id)}}>Delete</button></td>
          
        </tr>

        )
       }
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

//export default isAdmin(Admin)
export default Manager

