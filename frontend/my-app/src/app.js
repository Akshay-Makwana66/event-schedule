import React from 'react';
import SignUp from './signUp';
import Login from './login';
import Event from './event';
import GetEvent from './getEvent';
// import Header from './header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<SignUp/>} />
          <Route exact path='/Login' element={<Login/>} />
          <Route exact path='/eventCreate/:userId' element={<Event/>} />
          <Route exact path='/getScheduleEvent' element={<GetEvent/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;