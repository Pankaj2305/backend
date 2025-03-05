import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './login';
import Home from './home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Home' element ={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
