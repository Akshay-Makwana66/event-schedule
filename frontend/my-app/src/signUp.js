import React, { useState } from 'react'
import '../src/css/signup.css'
export default function SignUp(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const postData = () =>{
   
    fetch('http://localhost:3000/userRegistration',{
   method: 'POST',
   mode: 'cors',
   headers:{
     "Content-Type" : "application/json",
   },
   body: JSON.stringify({ 
     firstName:firstName,
     lastName: lastName, 
     email:email,
     password:password
   })
  })
  .then(response => response.json())
  .then((data) => {   
   console.log(data)
  
      // 👇️ redirects to an external URL
      window.location.replace('http://localhost:3001/Login');
  
 })  
//  setFirstName("")
//  setLastName("")
//  setEmail("")
//  setPassword("");
  } 
    
  return (
    <div className='backgroundImage'>
      <div className='text'>
      <h3 >Firstname : <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></h3>
      <h3>Lastname  : <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></h3>
      <h3>Email id  : <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/></h3>
      <h3>Password  : <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></h3>
      <button  onClick={()=>postData()}>SignUp</button>    
      </div>
    </div>
  )
}