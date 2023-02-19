import React, { useState } from 'react';
import '../src/css/signup.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const postData = () =>{
     let token =''  //cookies.get('token')
    fetch('http://localhost:3000/userLogin',{
   method: 'POST',
   mode: 'cors',
   headers:{
     "Content-Type" : "application/json",
     'x-api-key': token
   },
   body: JSON.stringify({   
     email:email,
     password:password
   })
  })
  .then(response => response.json())
  .then((data) => {
   token = data.data
   cookies.set('token',token)
   window.location.replace(`http://localhost:3001/eventCreate/${data.userId}`);
   console.log(token)
 })  
 setEmail("")
 setPassword("");
  } 
  
  
  return (
    <div className='backgroundImage'>
      <div className='text'>
      <h3>Email: <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/></h3>
      <h3>Password: <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></h3>
      <button onClick={()=>postData()}>Login</button> 
      </div>
    </div>
  )
};