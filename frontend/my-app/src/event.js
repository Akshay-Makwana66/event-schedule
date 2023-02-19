import React, { useState } from 'react'
import '../src/css/signup.css';
export default function Event(){
    const [name, setName] = useState('');
    const [description,setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dayOfTheWeek, setDayOfTheWeek] = useState('');


    const postData = () =>{
   
        fetch('http://localhost:3000/eventCreate/:userId',{
       method: 'POST',
       mode: 'cors',
       headers:{
         "Content-Type" : "application/json",
       },
       body: JSON.stringify({ 
         name:name,
         description:description,
         startTime:startTime,
         endTime:endTime,
         dayOfTheWeek:dayOfTheWeek
       })
      })
      .then(response => response.json())
      .then((data) => {   
       console.log(data)
       // 👇️ redirects to an external URL
      window.location.replace('http://localhost:3001/getScheduleEvent');
  
     })  
     setName("")
     setDescription("")
     setStartTime("")
     setEndTime("")
     setDayOfTheWeek("")
      } 

      return (
        <div className='backgroundImage'>
            <div className='text'>
          <h3>Name : <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/></h3>
          <h3>Description  : <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/></h3>
          <h3>StartTime : <input type="text" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/></h3>
          <h3>EndTime  : <input type="text" value={endTime} onChange={(e)=>setEndTime(e.target.value)}/></h3>
          <h3>DayOfTheWeek  : <input type="text" value={dayOfTheWeek} onChange={(e)=>setDayOfTheWeek(e.target.value)}/></h3>
          <button onClick={()=>postData()}>Submit</button>  
            </div>
        </div>
      )
}