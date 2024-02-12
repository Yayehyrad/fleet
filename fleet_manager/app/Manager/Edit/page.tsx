"use client"
import React from "react"
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation"
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
  
const Edit = ()=>{
    const router = useRouter();
    const search:any = useSearchParams()
 
    const value = search.get('id')


    const [Data,setData] = React.useState(x)

    const fetchData = async() =>{
      try {
        const response = await fetch(`http://localhost:5000/users/${value}`)
        if (response.ok && response.status === 200) {
          const data = await response.json();
          setData(data)
          console.log(data);
          //alert('User Edited successfully! ');
        } else {
          alert(response.statusText);
        }


        
      } catch (error) {
        console.log(error)
        
      }
        //alert(value)

       




    }

    const handleClick = async()=>{
      alert("clicked")
      try {
        const params = new URLSearchParams();
params.append('name', Data.name);
params.append('username', Data.user_name);
params.append('email', Data.email);
params.append('role', Data.role);
params.append('status', Data.status);

params.append('password', Data.password);
       // alert(Data.name)
       const response = await fetch(`http://localhost:5000/user/update/`, {
        method: 'Patch',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

          if (response.ok && response.status === 200) {
              const data = await response.json();
              console.log(data);
              alert('User Edited successfully! ');
            } else {
              alert(response.statusText);
            }

          
      } catch (error) {

          console.log(error)
          
      }


  }

    React.useEffect(()=>{
        fetchData()
    },[])
    
    return(
        <div className="bg-white-500 h-screen">
        <h1 className="text-center text-cyan-700 text-4xl m-7 ">Edit User</h1>
        <div className="flex flex-col items-center">
  <input type="text" disabled value={Data.name}  onChange={(e) => {
    setData((prevData) => ({ ...prevData, name: e.target.value }));
  }}placeholder="Name" className="input input-bordered input-info w-full max-w-xs " /><br/>

  <input type="text" disabled value={Data.user_name}  onChange={(e) => {
    setData((prevData) => ({ ...prevData, user_name: e.target.value }));
  }} placeholder="Username" className="input input-bordered input-info w-full max-w-xs" /><br/>

  <input type="email" disabled value={Data.email}  onChange={(e) => {
    setData((prevData) => ({ ...prevData, email: e.target.value }));
  }} placeholder="Email" className="input input-bordered input-info w-full max-w-xs" /><br/>

 
  <select className="select select-info w-full max-w-xs" title="Role"  onChange={(e) => {
    setData((prevData) => ({ ...prevData, role: e.target.value }));
  }}>

  <option disabled selected value={Data.role} >Select Role</option>
  <option value={"Manager"}>Manager</option>
  <option value={"Driver"}>Driver</option>


  
</select><br/>

<select className="select select-info w-full max-w-xs" title="status"  onChange={(e) => {
    setData((prevData) => ({ ...prevData, status: e.target.value }));
  }}>

  <option disabled selected value={Data.status} >Select Status</option>
  <option value={"Active"}>Active</option>
  <option value={"Inactive"}>Inactive</option>


  
</select>
<button className="btn btn-outline btn-success m-10 w-200 h-50" onClick={()=>handleClick()}>Edit User</button>

</div>
            
        </div>
     
    )


}

export default Edit