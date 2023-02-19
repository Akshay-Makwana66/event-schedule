import React, { useState } from 'react';
import '../src/css/signup.css'

export default function GetEvent(){

    const [data, setData] = useState();

    const FetchData = async() =>{
   
       await fetch('https://localhost:3000/getScheduleEvent',{
       method: 'GET',
      //  mode: 'cors',
      // //  headers:{
      // //    "Content-Type" : "application/json",
      // //  },
       
      })
      .then(response => response.json())
      .then((data) => {   
       console.log(data)
     })  
      } 
      return (
        <div className='backgroundImage'>
            <div className='text'>
            <h3>View Your Schedule Event</h3>
            <button  onClick={()=>FetchData()}>Get</button> 
            </div>         
        </div>
      )
}