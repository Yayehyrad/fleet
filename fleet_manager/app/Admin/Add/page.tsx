"use client"
import React from "react"
import { useRouter } from 'next/navigation'
interface User{
   
    name:string;
    user_name:string;
    email:string;
    role:string;
    status:string;
    attempts:number;
    password:string
  
  
  }

  const x:User = {
   
    "name": "",
    "user_name":"",
    "email":"",
    "role":"",
    "status":"Pending",
    "attempts":0,
    "password":""

  }
  
const Add = ()=>{

    const [Data,setData] = React.useState(x)
    const handleClick = async()=>{
        try {
          const params = new URLSearchParams();
params.append('name', Data.name);
params.append('username', Data.user_name);
params.append('email', Data.email);
params.append('role', Data.role);
params.append('status', Data.status);

params.append('password', Data.password);
         // alert(Data.name)
         const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

            if (response.ok && response.status === 201) {
                const data = await response.json();
                console.log(data);
                alert('User created successfully! ');
              } else {
                alert(response.statusText);
              }

            
        } catch (error) {

            console.log(error)
            
        }


    }
    return(
        <div className="bg-white-500 h-screen">
        <h1 className="text-center text-cyan-700 text-4xl m-7 ">Add New User</h1>
        <div className="flex flex-col items-center">
  <input type="text" value={Data.name}  onChange={(e) => {
    setData((prevData) => ({ ...prevData, name: e.target.value }));
  }}placeholder="Name" className="input input-bordered input-info w-full max-w-xs " /><br/>

  <input type="text" value={Data.user_name}  onChange={(e) => {
    setData((prevData) => ({ ...prevData, user_name: e.target.value }));
  }} placeholder="Username" className="input input-bordered input-info w-full max-w-xs" /><br/>

  <input type="email" value={Data.email}  onChange={(e) => {
    setData((prevData) => ({ ...prevData, email: e.target.value }));
  }} placeholder="Email" className="input input-bordered input-info w-full max-w-xs" /><br/>

  <input type="text" value={Data.password}
   onChange={(e) => {
    setData((prevData) => ({ ...prevData, password: e.target.value }));
  }} placeholder="Password" className="input input-bordered input-info w-full max-w-xs" /><br/>
  <select className="select select-info w-full max-w-xs" title="Role"  onChange={(e) => {
    setData((prevData) => ({ ...prevData, role: e.target.value }));
  }}>

  <option disabled selected value={Data.role} >Select Role</option>
  <option value={"Manager"}>Manager</option>
  <option value={"Driver"}>Driver</option>


  
</select>
<button className="btn btn-outline btn-success m-10 w-200 h-50" onClick={()=>handleClick()}>Add User</button>

</div>
            
        </div>
     
    )


}

export default Add