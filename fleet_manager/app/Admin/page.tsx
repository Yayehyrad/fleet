"use client"
import isAdmin from "../Components/Auth"
import React from "react"
import { useRouter } from 'next/navigation'

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

const Admin = ()=>
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
        
     
               <h1 className="text-center text-cyan-700 text-4xl m-7 ">Admin Panel</h1>

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
        return(
          <tr key={value._id}>
          <th></th>
          <th>{value.name}</th>
          <th>{value.email}</th>
          <th>{value.user_name}</th>
          <th>{value.role}</th>
         
          <th>{value.status}</th>
          <td><button className="btn btn-outline btn-info">Edit</button></td>
        <td><button className="btn btn-outline btn-error" onClick={()=>{handleDelete(value._id)}}>Delete</button></td>
          
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
<button className="btn btn-outline btn-success m-5 text-center" onClick={()=>{router.push("/Admin/Add")}}>Add New User</button>

        </div>
     
    )
}

//export default isAdmin(Admin)
export default Admin

